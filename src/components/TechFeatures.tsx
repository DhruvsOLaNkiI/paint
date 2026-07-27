import { motion } from 'motion/react';
import { Camera, FileSpreadsheet, UserCheck, ShieldCheck, Activity, Search } from 'lucide-react';

const features = [
  {
    icon: <Search className="w-6 h-6 text-brand-gold" />,
    title: 'Free Site Survey',
    desc: 'Book a free inspection with date and time slots that suit your schedule.',
  },
  {
    icon: <FileSpreadsheet className="w-6 h-6 text-brand-gold" />,
    title: 'Clear Quotation',
    desc: 'Transparent quotes after survey — view them anytime under My Bookings.',
  },
  {
    icon: <UserCheck className="w-6 h-6 text-brand-gold" />,
    title: 'Trained Partners',
    desc: 'Professionally trained painting partners for neat, lasting finishes.',
  },
  {
    icon: <Camera className="w-6 h-6 text-brand-gold" />,
    title: 'Genuine Materials',
    desc: 'Genuine branded paints only — quality you can trust, guaranteed.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-brand-gold" />,
    title: 'Furniture Protection',
    desc: 'Packing and masking so furniture and floors stay protected during work.',
  },
  {
    icon: <Activity className="w-6 h-6 text-brand-gold" />,
    title: 'Clean Handover',
    desc: 'Post-painting cleaning and on-time completion with service warranty.',
  },
];

export default function TechFeatures() {
  return (
    <section className="py-24 bg-brand-slate-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold text-sm uppercase tracking-[0.25em] mb-4 font-semibold">How We Work</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-brand-offwhite">Professional from start to finish.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex items-start space-x-5 p-6 bg-white border border-brand-border rounded-2xl hover:border-brand-gold/40 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="flex-shrink-0 p-3 border border-brand-border bg-brand-gold-light rounded-xl group-hover:border-brand-gold/40 transition-colors duration-300">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-lg font-serif text-brand-offwhite mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
