import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How do I book a free survey?',
    answer:
      'Go to Services, choose painting or waterproofing, pick a date and time slot, enter your details, and confirm. You can track the booking under My Bookings.',
  },
  {
    question: 'What painting options do you offer?',
    answer:
      'Interior painting, exterior painting, rental painting, texture, and polishing. Waterproofing is available as a separate service with a free survey.',
  },
  {
    question: 'When will I receive a quotation?',
    answer:
      'After the site survey, our team prepares a clear quotation. You can view it anytime under My Bookings using your mobile number.',
  },
  {
    question: 'Is interior renovation available?',
    answer:
      'Interior renovation is coming soon. For now we focus on painting services and waterproofing across Delhi NCR.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="insights" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold text-sm uppercase tracking-[0.25em] mb-4 font-semibold">FAQs</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-brand-offwhite">Common questions.</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="border border-brand-border bg-brand-slate-dark overflow-hidden rounded-2xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <span className="font-serif text-lg text-left text-brand-offwhite pr-8">{faq.question}</span>
                <span className="text-brand-gold flex-shrink-0">
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-6 text-slate-500 leading-relaxed">
                      <div className="pt-4 border-t border-brand-border">{faq.answer}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
