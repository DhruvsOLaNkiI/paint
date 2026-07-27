import { motion } from 'motion/react';
import { Star, PlayCircle } from 'lucide-react';

export default function SocialProof() {
  return (
    <section className="py-24 bg-brand-slate-dark border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 border border-brand-border bg-white rounded-2xl"
          >
            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-600 italic mb-6 leading-relaxed">
              &ldquo;The painting team was punctual, careful with our furniture, and the finish looks excellent.
              Free survey and clear quotation made the process easy.&rdquo;
            </p>
            <div className="flex items-center justify-between border-t border-brand-border pt-4">
              <div>
                <p className="text-brand-offwhite font-serif">Arjun S.</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Gurugram</p>
              </div>
              <div className="text-xs text-brand-gold font-semibold px-2 py-1 bg-brand-gold-light border border-brand-gold/20 rounded">
                Verified
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative aspect-[4/3] lg:aspect-auto border border-brand-border overflow-hidden bg-white rounded-2xl min-h-[260px]"
          >
            <img
              src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800"
              alt="Project walkthrough"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity duration-500"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25">
              <PlayCircle className="w-14 h-14 text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-white font-serif text-lg">Project Walkthrough</p>
              <p className="text-xs text-white/80 uppercase tracking-widest mt-2">Noida</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
