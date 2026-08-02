import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Package,
  Sparkles,
  PaintBucket,
  Users,
  Clock,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const values = [
  {
    icon: ShieldCheck,
    title: '1.6 Year Service Warranty',
    text: 'Peace of mind with service warranty coverage on completed painting work.',
  },
  {
    icon: Package,
    title: 'Packing & Masking',
    text: 'Careful packing and masking so furniture and floors stay protected.',
  },
  {
    icon: Sparkles,
    title: 'Post-Painting Cleaning',
    text: 'We clean up after the job so your home is ready to enjoy.',
  },
  {
    icon: PaintBucket,
    title: 'Genuine Paints',
    text: 'Only genuine branded paints — quality you can trust.',
  },
  {
    icon: Users,
    title: 'Trained Partners',
    text: 'Professionally trained painting partners for a neat, lasting finish.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    text: 'Clear timelines and on-time project completion you can plan around.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-brand-offwhite font-sans antialiased selection:bg-brand-gold/20">
      <Navigation />

      <main className="pt-[5.75rem]">
        {/* Hero */}
        <section className="relative overflow-hidden min-h-[420px] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=2400"
            alt="BrushUpHomes team at work"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-2xl"
            >
              <p className="text-white/80 text-sm uppercase tracking-[0.25em] font-semibold mb-4">
                About Company
              </p>
              <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-4">
                BrushUp<span className="text-sky-200">Homes</span>
              </h1>
              <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
                Professional painting and waterproofing services across Delhi NCR —
                built on trust, trained partners, and on-time delivery.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Who we are */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-brand-offwhite tracking-tight mb-4">
                  Who We Are
                </h2>
                <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed mb-4">
                  BrushUpHomes is a home services company focused on quality painting and
                  waterproofing. We help homeowners and property managers refresh spaces with
                  genuine paints, careful site protection, and professionally trained partners.
                </p>
                <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed mb-6">
                  From interior and exterior painting to texture, polishing, rental painting, and
                  waterproofing surveys — we keep the process simple: book a free survey, get a
                  clear quotation, and enjoy a clean handover.
                </p>
                <p className="inline-flex items-center gap-2 text-sm text-brand-gold font-medium">
                  <MapPin className="w-4 h-4" />
                  Serving Delhi, Noida, Gurugram, Faridabad & Greater Noida
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
              >
                <img
                  src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=1200"
                  alt="Painting work in progress"
                  className="w-full h-72 md:h-80 object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 bg-[#F7F8FA]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-offwhite tracking-tight mb-4">
              Our Mission
            </h2>
            <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed">
              To make home painting and waterproofing reliable, transparent, and stress-free —
              with free surveys, clear quotes, genuine materials, and work you can trust for years.
            </p>
          </div>
        </section>

        {/* Why choose us */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-brand-offwhite tracking-tight mb-3">
                Why Choose BrushUpHomes
              </h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                The promises we stand by on every project.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-xl border border-slate-100 bg-[#F7F8FA] hover:border-brand-gold/30 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold mb-4">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-brand-offwhite mb-2">{item.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-brand-gold">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
              Ready to refresh your home?
            </h2>
            <p className="text-sm text-white/85 mb-8">
              Book a free survey and get a clear quotation for painting or waterproofing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-white text-brand-gold text-sm font-semibold uppercase tracking-wider hover:bg-slate-50 transition-colors"
              >
                View Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg border border-white/40 text-white text-sm font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
