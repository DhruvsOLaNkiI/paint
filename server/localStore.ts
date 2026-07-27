import { randomUUID } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
const bookingsFile = path.join(dataDir, 'bookings.json');
const auditsFile = path.join(dataDir, 'site_audits.json');

export type StoredBooking = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  surveyDate: string;
  surveyTime: string;
  notes: string;
  quotation: string | null;
  quotationAmount: number | null;
  status: string;
  createdAt: string;
  updatedAt?: string;
  source: string;
};

export type StoredAudit = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  specs: string;
  createdAt: string;
  source: string;
};

function ensureStore(file: string) {
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  if (!existsSync(file)) writeFileSync(file, '[]', 'utf8');
}

function readJson<T>(file: string): T[] {
  ensureStore(file);
  try {
    return JSON.parse(readFileSync(file, 'utf8')) as T[];
  } catch {
    return [];
  }
}

function writeJson<T>(file: string, rows: T[]) {
  ensureStore(file);
  writeFileSync(file, JSON.stringify(rows, null, 2), 'utf8');
}

export function localCreateBooking(
  input: Omit<StoredBooking, 'id' | 'createdAt' | 'quotation' | 'quotationAmount' | 'status'> & {
    quotation?: string | null;
    quotationAmount?: number | null;
    status?: string;
  }
): StoredBooking {
  const rows = readJson<StoredBooking>(bookingsFile);
  const booking: StoredBooking = {
    id: randomUUID(),
    name: input.name,
    phone: input.phone,
    email: input.email,
    address: input.address,
    service: input.service,
    surveyDate: input.surveyDate,
    surveyTime: input.surveyTime,
    notes: input.notes,
    quotation: input.quotation ?? null,
    quotationAmount: input.quotationAmount ?? null,
    status: input.status ?? 'pending',
    createdAt: new Date().toISOString(),
    source: input.source,
  };
  rows.unshift(booking);
  writeJson(bookingsFile, rows);
  return booking;
}

export function localListBookings(): StoredBooking[] {
  return readJson<StoredBooking>(bookingsFile).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function localFindBookingsByPhone(phone: string): StoredBooking[] {
  const digits = phone.replace(/\D/g, '').slice(-10);
  return localListBookings().filter((b) => {
    const bDigits = b.phone.replace(/\D/g, '');
    return b.phone === phone || (digits.length >= 8 && bDigits.endsWith(digits));
  });
}

export function localUpdateBooking(
  id: string,
  patch: Partial<Pick<StoredBooking, 'quotation' | 'quotationAmount' | 'status'>>
): StoredBooking | null {
  const rows = readJson<StoredBooking>(bookingsFile);
  const idx = rows.findIndex((b) => b.id === id);
  if (idx < 0) return null;
  rows[idx] = {
    ...rows[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  writeJson(bookingsFile, rows);
  return rows[idx];
}

export function localCreateAudit(
  input: Omit<StoredAudit, 'id' | 'createdAt'>
): StoredAudit {
  const rows = readJson<StoredAudit>(auditsFile);
  const audit: StoredAudit = {
    id: randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
  };
  rows.unshift(audit);
  writeJson(auditsFile, rows);
  return audit;
}
