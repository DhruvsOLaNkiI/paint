import { motion } from 'motion/react';
import { Building2, ShieldCheck, Ruler, Users } from 'lucide-react';

const stats = [
  { value: '350+', label: 'Homes Painted', icon: <Building2 className="w-6 h-6 text-brand-gold mb-4" /> },
  { value: '4.9/5.0', label: 'Average Customer Rating', icon: <ShieldCheck className="w-6 h-6 text-brand-gold mb-4" /> },
  { value: '92%', label: 'On-Time Completions', icon: <Ruler className="w-6 h-6 text-brand-gold mb-4" /> },
  { value: '45+', label: 'Trained Painting Partners', icon: <Users className="w-6 h-6 text-brand-gold mb-4" /> },
];

export default function Stats() {
  return (
    <section className="py-16 bg-white border-y border-brand-border relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              {stat.icon}
              <h3 className="text-4xl font-serif text-brand-offwhite mb-2">{stat.value}</h3>
              <p className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
