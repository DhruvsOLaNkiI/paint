import { motion } from 'motion/react';
import { ShieldCheck, Package, Sparkles, PaintBucket, Users, Clock } from 'lucide-react';

const guarantees = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-brand-gold" />,
    title: '1.6 Year Service Warranty',
    description: 'Peace of mind with service warranty coverage on completed painting work.',
  },
  {
    icon: <Package className="w-8 h-8 text-brand-gold" />,
    title: 'Packing & Masking of Furniture',
    description: 'Careful packing and masking so your furniture and floors stay protected during painting.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-brand-gold" />,
    title: 'Post Painting Service Cleaning',
    description: 'We clean up after the job so your home is ready to enjoy — not left with dust and debris.',
  },
  {
    icon: <PaintBucket className="w-8 h-8 text-brand-gold" />,
    title: 'Genuine Paints Guarantee',
    description: 'Only genuine branded paints — quality you can trust, guaranteed.',
  },
  {
    icon: <Users className="w-8 h-8 text-brand-gold" />,
    title: 'Professionally Trained Partners',
    description: 'Skilled, professionally trained painting partners for a neat and lasting finish.',
  },
  {
    icon: <Clock className="w-8 h-8 text-brand-gold" />,
    title: 'On-Time Completion Guaranteed',
    description: 'Clear timelines and on-time project completion you can plan around.',
  },
];

export default function Guarantees() {
  return (
    <section id="why-us" className="py-24 bg-brand-slate-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold text-sm uppercase tracking-[0.25em] mb-4 font-semibold">Why BrushUpHomes</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-brand-offwhite">Our Service Promise.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guarantees.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="p-8 border border-brand-border bg-white hover:border-brand-gold/40 hover:shadow-md transition-all duration-300 group rounded-2xl"
            >
              <div className="mb-6 p-4 rounded-full bg-brand-gold-light inline-block group-hover:scale-105 transition-transform duration-300">
                {item.icon}
              </div>
              <h4 className="text-xl font-serif text-brand-offwhite mb-3">{item.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
