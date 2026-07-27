import { useEffect, useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, RefreshCw, Save } from 'lucide-react';

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

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('brushup_admin_key') || '');
  const [unlocked, setUnlocked] = useState(() => Boolean(sessionStorage.getItem('brushup_admin_key')));
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [drafts, setDrafts] = useState<Record<string, { quotation: string; quotationAmount: string; status: string }>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const key = sessionStorage.getItem('brushup_admin_key');
    if (key) {
      void loadBookings(key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBookings = async (key: string) => {
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/admin/bookings', {
        headers: { 'x-admin-key': key },
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || 'Unauthorized');
      }
      const list: Booking[] = data.bookings || [];
      setBookings(list);
      const nextDrafts: typeof drafts = {};
      for (const b of list) {
        nextDrafts[b.id] = {
          quotation: b.quotation || '',
          quotationAmount: b.quotationAmount != null ? String(b.quotationAmount) : '',
          status: b.status || 'pending',
        };
      }
      setDrafts(nextDrafts);
      setStatus('idle');
    } catch (error) {
      setStatus('error');
      setUnlocked(false);
      sessionStorage.removeItem('brushup_admin_key');
      setMessage(error instanceof Error ? error.message : 'Could not load bookings.');
    }
  };

  const handleUnlock = async (event: FormEvent) => {
    event.preventDefault();
    sessionStorage.setItem('brushup_admin_key', adminKey.trim());
    setUnlocked(true);
    await loadBookings(adminKey.trim());
  };

  const saveQuotation = async (id: string) => {
    const draft = drafts[id];
    if (!draft) return;
    setSavingId(id);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey.trim(),
        },
        body: JSON.stringify({
          quotation: draft.quotation,
          quotationAmount: draft.quotationAmount === '' ? null : Number(draft.quotationAmount),
          status: draft.status,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Update failed');
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...data.booking } : b)));
      setMessage('Quotation saved.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save.');
    } finally {
      setSavingId(null);
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-brand-slate-dark text-brand-offwhite flex items-center justify-center p-4">
        <form
          onSubmit={handleUnlock}
          className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-slate p-8 space-y-5"
        >
          <div className="flex items-center gap-3 text-brand-gold">
            <Lock className="w-5 h-5" />
            <h1 className="text-2xl font-serif text-brand-offwhite">Admin Bookings</h1>
          </div>
          <p className="text-sm text-slate-500">Enter admin key to view customer survey bookings.</p>
          <input
            type="password"
            required
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Admin key"
            className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold"
          />
          {message && <p className="text-sm text-red-600">{message}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand-gold text-white text-sm uppercase tracking-widest font-semibold"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-slate-dark text-brand-offwhite font-sans antialiased p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif text-brand-offwhite">Survey Bookings</h1>
            <p className="text-sm text-slate-500 mt-1">{bookings.length} bookings</p>
          </div>
          <button
            type="button"
            onClick={() => loadBookings(adminKey.trim())}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-border text-sm text-slate-600 hover:border-brand-gold hover:text-brand-gold"
          >
            <RefreshCw className={`w-4 h-4 ${status === 'loading' ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {message && (
          <p className={`text-sm mb-4 ${status === 'error' ? 'text-red-600' : 'text-emerald-600'}`}>
            {message}
          </p>
        )}

        <div className="space-y-5">
          {bookings.map((booking) => {
            const draft = drafts[booking.id] || {
              quotation: '',
              quotationAmount: '',
              status: 'pending',
            };
            return (
              <motion.article
                key={booking.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-brand-border bg-brand-slate p-5 sm:p-6"
              >
                <div className="flex flex-wrap justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-xl font-serif text-brand-gold">{booking.service}</h2>
                    <p className="text-brand-offwhite mt-1">{booking.name}</p>
                    <p className="text-sm text-slate-500">
                      {booking.phone} · {booking.email}
                    </p>
                  </div>
                  <div className="text-sm text-slate-600 text-right">
                    <p>{formatDateLabel(booking.surveyDate)}</p>
                    <p>{booking.surveyTime}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 mb-4">
                  <span className="text-slate-400">Address:</span> {booking.address}
                </p>
                {booking.notes && (
                  <p className="text-sm text-slate-500 mb-4">
                    <span className="text-slate-400">Notes:</span> {booking.notes}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">Status</label>
                    <select
                      value={draft.status}
                      onChange={(e) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [booking.id]: { ...draft, status: e.target.value },
                        }))
                      }
                      className="w-full bg-white border border-brand-border rounded-xl px-3 py-2.5 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="surveyed">Surveyed</option>
                      <option value="quoted">Quoted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">
                      Quotation Amount (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={draft.quotationAmount}
                      onChange={(e) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [booking.id]: { ...draft, quotationAmount: e.target.value },
                        }))
                      }
                      className="w-full bg-white border border-brand-border rounded-xl px-3 py-2.5 text-sm"
                      placeholder="e.g. 25000"
                    />
                  </div>
                  <div className="sm:col-span-1 flex items-end">
                    <button
                      type="button"
                      onClick={() => saveQuotation(booking.id)}
                      disabled={savingId === booking.id}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-gold text-white text-xs uppercase tracking-widest font-semibold disabled:opacity-60"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {savingId === booking.id ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>

                <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">
                  Quotation Details
                </label>
                <textarea
                  rows={3}
                  value={draft.quotation}
                  onChange={(e) =>
                    setDrafts((prev) => ({
                      ...prev,
                      [booking.id]: { ...draft, quotation: e.target.value },
                    }))
                  }
                  placeholder="Itemized quote / notes for customer..."
                  className="w-full bg-white border border-brand-border rounded-xl px-3 py-2.5 text-sm resize-none"
                />
              </motion.article>
            );
          })}

          {!bookings.length && status !== 'loading' && (
            <p className="text-center text-slate-400 py-16">No bookings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
