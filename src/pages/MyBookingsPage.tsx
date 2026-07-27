import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, FileText, Search, IndianRupee } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface Booking {
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
}

function formatDateLabel(iso: string): string {
  const d = new Date(iso.includes('T') ? iso : iso + 'T12:00:00');
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function MyBookingsPage() {
  const [phone, setPhone] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    setBookings([]);

    try {
      const response = await fetch(`/api/bookings?phone=${encodeURIComponent(phone.trim())}`);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Could not load bookings.');
      }

      setBookings(data.bookings || []);
      setStatus('done');
      if (!(data.bookings || []).length) {
        setMessage('No bookings found for this mobile number.');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Could not load bookings.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-slate-dark text-brand-offwhite font-sans antialiased selection:bg-brand-gold/20 selection:text-brand-offwhite">
      <Navigation />

      <main className="pt-40 pb-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(27,79,114,0.06),_transparent_55%)]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p className="text-brand-gold text-sm uppercase tracking-[0.3em] mb-4">Customer Portal</p>
            <h1 className="text-4xl md:text-5xl font-serif text-brand-offwhite mb-4">My Bookings</h1>
            <p className="text-slate-500 font-light">
              Enter your mobile number to view survey bookings and quotations.
            </p>
          </motion.div>

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile number used while booking"
              className="flex-1 bg-brand-slate border border-brand-border text-brand-offwhite rounded-xl px-5 py-3.5 focus:outline-none focus:border-brand-gold"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-gold text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-gold-hover disabled:opacity-60"
            >
              <Search className="w-4 h-4" />
              {status === 'loading' ? 'Searching...' : 'Find Bookings'}
            </button>
          </form>

          {message && (
            <p
              className={`text-center text-sm mb-8 ${status === 'error' ? 'text-red-600' : 'text-slate-500'}`}
              role="status"
            >
              {message}
            </p>
          )}

          <div className="space-y-5">
            {bookings.map((booking) => (
              <motion.article
                key={booking.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-brand-border bg-brand-slate p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-xl font-serif text-brand-gold">{booking.service}</h2>
                    <p className="text-sm text-slate-500 mt-1">{booking.name}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-brand-gold/30 text-brand-gold bg-brand-gold/10">
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 mb-4">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
                    {formatDateLabel(booking.surveyDate)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                    {booking.surveyTime}
                  </p>
                  <p className="flex items-start gap-2 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    {booking.address}
                  </p>
                </div>

                <div className="rounded-xl border border-brand-border bg-brand-slate-dark p-4">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold mb-2">
                    <FileText className="w-3.5 h-3.5" />
                    Quotation
                  </p>
                  {booking.quotation || booking.quotationAmount != null ? (
                    <div className="space-y-2">
                      {booking.quotationAmount != null && (
                        <p className="flex items-center gap-1 text-brand-offwhite font-serif text-lg">
                          <IndianRupee className="w-4 h-4 text-brand-gold" />
                          {Number(booking.quotationAmount).toLocaleString('en-IN')}
                        </p>
                      )}
                      {booking.quotation && (
                        <p className="text-sm text-slate-600 whitespace-pre-wrap">{booking.quotation}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">
                      Quotation not available yet. Our team will update it after the survey.
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
