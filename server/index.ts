import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId, type Db } from 'mongodb';
import { notifyOwnerNewBooking, notifyOwnerNewEnquiry } from './email';
import {
  localCreateAudit,
  localCreateBooking,
  localFindBookingsByPhone,
  localListBookings,
  localUpdateBooking,
} from './localStore';

const PORT = Number(process.env.PORT) || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_KEY = process.env.ADMIN_KEY || 'brushup-admin';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

let db: Db | null = null;

async function connectDb() {
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI missing — using local file storage for bookings.');
    return;
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });
    await client.connect();
    db = client.db(process.env.MONGODB_DB || 'aura_architecture');
    console.log(`Connected to MongoDB database: ${db.databaseName}`);
  } catch (error) {
    db = null;
    console.error('MongoDB connection failed — falling back to local file storage.');
    console.error(error instanceof Error ? error.message : error);
    console.error(
      'Tip: In MongoDB Atlas → Network Access, allow your IP (or 0.0.0.0/0 for testing).'
    );
  }
}

function requireAdmin(req: express.Request, res: express.Response): boolean {
  const key = String(req.headers['x-admin-key'] || req.query.key || '');
  if (key !== ADMIN_KEY) {
    res.status(401).json({ error: 'Unauthorized. Invalid admin key.' });
    return false;
  }
  return true;
}

function mapBooking(b: {
  id?: string;
  _id?: unknown;
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  surveyDate: string;
  surveyTime: string;
  notes?: string;
  quotation?: string | null;
  quotationAmount?: number | null;
  status?: string;
  createdAt: Date | string;
}) {
  return {
    id: b.id || String(b._id),
    name: b.name,
    phone: b.phone,
    email: b.email,
    address: b.address,
    service: b.service,
    surveyDate: b.surveyDate,
    surveyTime: b.surveyTime,
    notes: b.notes || '',
    quotation: b.quotation ?? null,
    quotationAmount: b.quotationAmount ?? null,
    status: b.status || 'pending',
    createdAt: b.createdAt,
  };
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    db: Boolean(db),
    storage: db ? 'mongodb' : 'local',
  });
});

/** Legacy contact / site-audit leads */
app.post('/api/site-audits', async (req, res) => {
  try {
    const { name, phone, email, service, address, specs } = req.body ?? {};

    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return res.status(400).json({
        error: 'Name, phone, and email are required.',
      });
    }

    const doc = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      service: String(service || '').trim(),
      address: String(address || '').trim(),
      specs: String(specs || '').trim(),
      source: String(req.body?.source || 'book-site-audit').trim(),
    };

    let id: string;

    if (db) {
      const result = await db.collection('site_audits').insertOne({
        ...doc,
        createdAt: new Date(),
      });
      id = String(result.insertedId);
    } else {
      const saved = localCreateAudit(doc);
      id = saved.id;
    }

    void notifyOwnerNewEnquiry(doc);

    return res.status(201).json({
      success: true,
      id,
    });
  } catch (error) {
    console.error('Failed to save site audit:', error);
    return res.status(500).json({
      error: 'Could not save your request. Please try again.',
    });
  }
});

/** Book Survey — date/time + customer details */
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, phone, email, address, service, surveyDate, surveyTime, notes } = req.body ?? {};

    if (!name?.trim() || !phone?.trim() || !email?.trim() || !address?.trim()) {
      return res.status(400).json({
        error: 'Name, phone, email, and address are required.',
      });
    }

    if (!surveyDate?.trim() || !surveyTime?.trim()) {
      return res.status(400).json({
        error: 'Please select a survey date and time slot.',
      });
    }

    if (!service?.trim()) {
      return res.status(400).json({
        error: 'Please select a service.',
      });
    }

    const doc = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      address: String(address).trim(),
      service: String(service).trim(),
      surveyDate: String(surveyDate).trim(),
      surveyTime: String(surveyTime).trim(),
      notes: String(notes || '').trim(),
      quotation: null as string | null,
      quotationAmount: null as number | null,
      status: 'pending' as const,
      source: String(req.body?.source || 'book-survey').trim(),
    };

    let booking;

    if (db) {
      const result = await db.collection('bookings').insertOne({
        ...doc,
        createdAt: new Date(),
      });
      booking = mapBooking({ ...doc, _id: result.insertedId, createdAt: new Date() });
    } else {
      booking = mapBooking(localCreateBooking(doc));
    }

    void notifyOwnerNewBooking({
      name: doc.name,
      phone: doc.phone,
      email: doc.email,
      address: doc.address,
      service: doc.service,
      surveyDate: doc.surveyDate,
      surveyTime: doc.surveyTime,
      notes: doc.notes,
    });

    return res.status(201).json({
      success: true,
      id: booking.id,
      booking,
    });
  } catch (error) {
    console.error('Failed to save booking:', error);
    return res.status(500).json({
      error: 'Could not confirm your booking. Please try again.',
    });
  }
});

/** Customer: look up bookings by mobile number */
app.get('/api/bookings', async (req, res) => {
  try {
    const phone = String(req.query.phone || '').trim();
    if (!phone || phone.length < 8) {
      return res.status(400).json({ error: 'Enter a valid mobile number to find bookings.' });
    }

    if (db) {
      const digits = phone.replace(/\D/g, '');
      const bookings = await db
        .collection('bookings')
        .find({
          $or: [{ phone }, { phone: { $regex: digits.slice(-10) + '$' } }],
        })
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();

      return res.json({ bookings: bookings.map((b) => mapBooking(b as never)) });
    }

    return res.json({
      bookings: localFindBookingsByPhone(phone).map((b) => mapBooking(b)),
    });
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return res.status(500).json({ error: 'Could not load bookings. Please try again.' });
  }
});

/** Admin: list all bookings */
app.get('/api/admin/bookings', async (req, res) => {
  if (!requireAdmin(req, res)) return;

  try {
    if (db) {
      const bookings = await db
        .collection('bookings')
        .find({})
        .sort({ createdAt: -1 })
        .limit(200)
        .toArray();
      return res.json({ bookings: bookings.map((b) => mapBooking(b as never)) });
    }

    return res.json({
      bookings: localListBookings().map((b) => mapBooking(b)),
    });
  } catch (error) {
    console.error('Failed to list admin bookings:', error);
    return res.status(500).json({ error: 'Could not load bookings.' });
  }
});

/** Admin: update quotation / status */
app.patch('/api/admin/bookings/:id', async (req, res) => {
  if (!requireAdmin(req, res)) return;

  try {
    const { id } = req.params;
    const { quotation, quotationAmount, status } = req.body ?? {};
    const update: {
      quotation?: string;
      quotationAmount?: number | null;
      status?: string;
    } = {};

    if (quotation !== undefined) update.quotation = String(quotation);
    if (quotationAmount !== undefined) {
      const amount = Number(quotationAmount);
      update.quotationAmount = Number.isFinite(amount) ? amount : null;
    }
    if (status !== undefined) update.status = String(status);

    if (db && ObjectId.isValid(id)) {
      const result = await db.collection('bookings').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...update, updatedAt: new Date() } },
        { returnDocument: 'after' }
      );

      if (!result) {
        return res.status(404).json({ error: 'Booking not found.' });
      }

      return res.json({ success: true, booking: mapBooking(result as never) });
    }

    const local = localUpdateBooking(id, update);
    if (!local) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    return res.json({ success: true, booking: mapBooking(local) });
  } catch (error) {
    console.error('Failed to update booking:', error);
    return res.status(500).json({ error: 'Could not update booking.' });
  }
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
    console.log(`Storage mode: ${db ? 'mongodb' : 'local file (server/data)'}`);
  });
});
