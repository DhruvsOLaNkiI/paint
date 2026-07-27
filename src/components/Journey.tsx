import { motion } from 'motion/react';

const steps = [
  { num: '01', title: 'Book Free Survey', desc: 'Pick a date and time slot online for a free site inspection.' },
  { num: '02', title: 'Site Inspection', desc: 'Our trained partner visits, measures, and understands your needs.' },
  { num: '03', title: 'Quotation', desc: 'Clear quote with genuine paint options — view it under My Bookings.' },
  { num: '04', title: 'Masked & Protected', desc: 'Furniture packing and masking before work begins.' },
  { num: '05', title: 'Professional Finish', desc: 'On-time painting or waterproofing by trained partners.' },
  { num: '06', title: 'Clean Handover', desc: 'Post-service cleaning and 1.6 year service warranty.' },
];

export default function Journey() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold text-sm uppercase tracking-[0.25em] mb-4 font-semibold">How It Works</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-brand-offwhite">From survey to handover.</h3>
        </div>

        <div className="relative">
          <div className="absolute top-8 left-0 w-full h-px bg-brand-border hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-16 h-16 rounded-full bg-white border-2 border-brand-gold flex items-center justify-center mb-5 shadow-sm">
                  <span className="text-brand-gold font-serif text-xl">{step.num}</span>
                </div>
                <h4 className="text-brand-offwhite font-serif text-lg mb-2 leading-snug">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed px-1">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
