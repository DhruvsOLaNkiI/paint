import { useEffect, useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronDown, MapPin, Phone, Mail } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const serviceOptions = [
  'Interior Painting',
  'Exterior Painting',
  'Rental Painting',
  'Texture',
  'Polishing',
  'Waterproofing',
  'Interior Renovation (Coming Soon)',
];

const initialForm = {
  name: '',
  phone: '',
  email: '',
  service: '',
  address: '',
  specs: '',
};

const inputClass =
  'w-full bg-white border border-slate-200 text-brand-offwhite rounded-lg px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:border-brand-gold transition-colors';

export default function ContactForm() {
  const location = useLocation();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const selected = (location.state as { service?: string } | null)?.service;
    if (selected) {
      setForm((prev) => ({ ...prev, service: selected }));
    }
  }, [location.state]);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.service) {
      setStatus('error');
      setMessage('Please choose a service.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/site-audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: location.pathname === '/contact' ? 'contact-page' : 'book-site-audit',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error ||
            (response.status === 500
              ? 'Server error. Make sure the API is running (npm run dev).'
              : 'Something went wrong. Please try again.')
        );
      }

      setStatus('success');
      setMessage('Thank you. Your request has been received. We will contact you shortly.');
      setForm(initialForm);
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Could not submit your request. Please try again.'
      );
    }
  };

  return (
    <section id="contact" className="bg-white border-t border-brand-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
        {/* Form — left */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center px-6 sm:px-10 lg:px-16 xl:px-20 py-14 lg:py-16"
        >
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto lg:mr-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-offwhite mb-8 tracking-tight">
              Send Us a Message
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={inputClass}
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={inputClass}
                  placeholder="000-000-0000"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={inputClass}
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Type Of Service
                </label>
                <div className="relative">
                  <select
                    id="service"
                    required
                    value={form.service}
                    onChange={(e) => updateField('service', e.target.value)}
                    className={`${inputClass} appearance-none pr-10 ${
                      !form.service ? 'text-slate-400' : 'text-brand-offwhite'
                    }`}
                  >
                    <option value="" disabled>
                      Choose service
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className={inputClass}
                  placeholder="Site address / sector"
                />
              </div>

              <div>
                <label htmlFor="specs" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="specs"
                  rows={4}
                  value={form.specs}
                  onChange={(e) => updateField('specs', e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="Write your message here..."
                />
              </div>

              {message && (
                <p
                  className={`text-sm ${
                    status === 'success' ? 'text-emerald-600' : 'text-red-600'
                  }`}
                  role="status"
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 rounded-lg bg-brand-gold text-white text-sm font-semibold uppercase tracking-wider hover:bg-brand-gold-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Image + contact info — right */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative min-h-[420px] lg:min-h-full overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=1600"
            alt="BrushUpHomes painting service"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-white">
            <h3 className="text-xl font-semibold mb-5">Contact Information</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-sky-200" />
                <span>Sector 16, Noida, UP, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-sky-200" />
                <span>+91 (11) 4567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-sky-200" />
                <span>contact@brushuphomes.com</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
