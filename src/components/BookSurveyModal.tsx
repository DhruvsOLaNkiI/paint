import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, Mail, MapPin, Calendar, Clock, CheckCircle2, ChevronLeft } from 'lucide-react';
import { surveyTimeSlots } from '../data/servicesCatalog';

type Step = 'slot' | 'details' | 'confirm' | 'done';
type FormStatus = 'idle' | 'submitting' | 'error';

interface BookSurveyModalProps {
  serviceTitle: string | null;
  onClose: () => void;
}

const emptyDetails = {
  name: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
};

function nextSurveyDates(count = 14): string[] {
  const dates: string[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  // Start from tomorrow so same-day rush is avoided
  for (let i = 1; dates.length < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const day = d.getDay();
    if (day === 0) continue; // skip Sundays
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

function formatDateLabel(iso: string): string {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export default function BookSurveyModal({ serviceTitle, onClose }: BookSurveyModalProps) {
  const open = Boolean(serviceTitle);
  const dates = useMemo(() => nextSurveyDates(14), []);

  const [step, setStep] = useState<Step>('slot');
  const [surveyDate, setSurveyDate] = useState('');
  const [surveyTime, setSurveyTime] = useState('');
  const [details, setDetails] = useState(emptyDetails);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!open) return;

    setStep('slot');
    setSurveyDate('');
    setSurveyTime('');
    setDetails(emptyDetails);
    setStatus('idle');
    setMessage('');

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, serviceTitle, onClose]);

  const updateField = (field: keyof typeof emptyDetails, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const goToDetails = () => {
    if (!surveyDate || !surveyTime) {
      setStatus('error');
      setMessage('Please select a date and time slot.');
      return;
    }
    setStatus('idle');
    setMessage('');
    setStep('details');
  };

  const goToConfirm = (event: FormEvent) => {
    event.preventDefault();
    if (!details.name.trim() || !details.phone.trim() || !details.email.trim() || !details.address.trim()) {
      setStatus('error');
      setMessage('Please fill name, address, email, and mobile number.');
      return;
    }
    setStatus('idle');
    setMessage('');
    setStep('confirm');
  };

  const confirmBooking = async () => {
    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: details.name,
          phone: details.phone,
          email: details.email,
          address: details.address,
          notes: details.notes,
          service: serviceTitle,
          surveyDate,
          surveyTime,
          source: 'book-survey',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Could not confirm booking. Please try again.');
      }

      setStatus('idle');
      setStep('done');
    } catch (error) {
      setStatus('error');
      const isNetwork =
        error instanceof TypeError ||
        (error instanceof Error && /failed to fetch|network|ECONNREFUSED/i.test(error.message));
      setMessage(
        isNetwork
          ? 'Server is not running. Restart with npm run dev and try again.'
          : error instanceof Error
            ? error.message
            : 'Could not confirm booking. Please try again.'
      );
    }
  };

  const stepLabel =
    step === 'slot'
      ? 'Step 1 of 3 — Choose slot'
      : step === 'details'
        ? 'Step 2 of 3 — Your details'
        : step === 'confirm'
          ? 'Step 3 of 3 — Confirm'
          : 'Booking confirmed';

  return (
    <AnimatePresence>
      {open && serviceTitle && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close booking form"
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-survey-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl border border-brand-border bg-brand-slate shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-500 hover:text-brand-offwhite hover:bg-brand-slate-dark transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-brand-gold bg-brand-gold/10 border border-brand-gold/30 px-3 py-1.5 rounded mb-4">
                {stepLabel}
              </span>
              <h2 id="book-survey-title" className="text-2xl sm:text-3xl font-serif text-brand-offwhite mb-2 pr-10">
                Book Survey
              </h2>
              <p className="text-sm text-slate-500 mb-6">{serviceTitle}</p>

              {step === 'slot' && (
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      Select Date *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                      {dates.map((date) => {
                        const selected = surveyDate === date;
                        return (
                          <button
                            key={date}
                            type="button"
                            onClick={() => setSurveyDate(date)}
                            className={`px-3 py-2.5 rounded-xl text-sm border text-left transition-all ${
                              selected
                                ? 'bg-brand-gold text-white border-brand-gold font-medium'
                                : 'bg-brand-slate-dark text-slate-600 border-brand-border hover:border-brand-gold/50'
                            }`}
                          >
                            {formatDateLabel(date)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 mb-3">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" />
                      Select Time Slot *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {surveyTimeSlots.map((slot) => {
                        const selected = surveyTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSurveyTime(slot)}
                            className={`px-3 py-2.5 rounded-xl text-sm border transition-all ${
                              selected
                                ? 'bg-brand-gold text-white border-brand-gold font-medium'
                                : 'bg-brand-slate-dark text-slate-600 border-brand-border hover:border-brand-gold/50'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {message && (
                    <p className="text-sm text-red-600" role="status">
                      {message}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={goToDetails}
                    className="w-full py-4 rounded-xl bg-brand-gold text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-gold-hover transition-colors"
                  >
                    Continue
                  </button>
                </div>
              )}

              {step === 'details' && (
                <form className="space-y-5" onSubmit={goToConfirm}>
                  <button
                    type="button"
                    onClick={() => setStep('slot')}
                    className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-gold transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to slots
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="survey-name" className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                        Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="survey-name"
                          required
                          value={details.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder="Your full name"
                          className="w-full bg-white border border-brand-border text-brand-offwhite rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-gold transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="survey-phone" className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                        Mobile No *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="survey-phone"
                          type="tel"
                          required
                          value={details.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="+91 00000 00000"
                          className="w-full bg-white border border-brand-border text-brand-offwhite rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-gold transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="survey-email" className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="survey-email"
                        type="email"
                        required
                        value={details.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-white border border-brand-border text-brand-offwhite rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="survey-address" className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <textarea
                        id="survey-address"
                        required
                        rows={3}
                        value={details.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        placeholder="Full site address / sector / landmark"
                        className="w-full bg-white border border-brand-border text-brand-offwhite rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-gold transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="survey-notes" className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                      Notes (optional)
                    </label>
                    <textarea
                      id="survey-notes"
                      rows={2}
                      value={details.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      placeholder="Any special instructions..."
                      className="w-full bg-white border border-brand-border text-brand-offwhite rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors resize-none"
                    />
                  </div>

                  {message && (
                    <p className="text-sm text-red-600" role="status">
                      {message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-brand-gold text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-gold-hover transition-colors"
                  >
                    Review Booking
                  </button>
                </form>
              )}

              {step === 'confirm' && (
                <div className="space-y-5">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-gold transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Edit details
                  </button>

                  <div className="rounded-xl border border-brand-border bg-brand-slate-dark p-5 space-y-3 text-sm">
                    <Row label="Service" value={serviceTitle} />
                    <Row label="Date" value={formatDateLabel(surveyDate)} />
                    <Row label="Time" value={surveyTime} />
                    <Row label="Name" value={details.name} />
                    <Row label="Mobile" value={details.phone} />
                    <Row label="Email" value={details.email} />
                    <Row label="Address" value={details.address} />
                    {details.notes && <Row label="Notes" value={details.notes} />}
                  </div>

                  {message && (
                    <p className="text-sm text-red-600" role="status">
                      {message}
                    </p>
                  )}

                  <button
                    type="button"
                    disabled={status === 'submitting'}
                    onClick={confirmBooking}
                    className="w-full py-4 rounded-xl bg-brand-gold text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-gold-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </div>
              )}

              {step === 'done' && (
                <div className="text-center py-6 space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                  <h3 className="text-2xl font-serif text-brand-offwhite">Survey Booked</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                    Your free survey for <span className="text-brand-gold">{serviceTitle}</span> is confirmed for{' '}
                    <span className="text-brand-offwhite">{formatDateLabel(surveyDate)}</span> at{' '}
                    <span className="text-brand-offwhite">{surveyTime}</span>. Our team will contact you shortly.
                  </p>
                  <p className="text-xs text-slate-400">
                    You can track this booking anytime under My Bookings using your mobile number.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 px-8 py-3 rounded-xl bg-brand-gold text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-gold-hover transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-3 border-b border-brand-border pb-2 last:border-0 last:pb-0">
      <span className="text-slate-400 uppercase tracking-wider text-[10px] sm:w-24 shrink-0 pt-0.5">{label}</span>
      <span className="text-brand-offwhite">{value}</span>
    </div>
  );
}
