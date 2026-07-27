import { useState } from 'react';
import { motion } from 'motion/react';
import { SlidersHorizontal } from 'lucide-react';

export default function BeforeAfter() {
  const [activeTab, setActiveTab] = useState<'interior' | 'exterior' | 'painting'>('painting');

  const tabs = [
    { id: 'painting', label: 'Painting' },
    { id: 'exterior', label: 'Exterior' },
    { id: 'interior', label: 'Interior' },
  ] as const;

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
          <div>
            <h2 className="text-brand-gold text-sm uppercase tracking-[0.25em] mb-4 font-semibold">Our Work</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-brand-offwhite">Before & After.</h3>
          </div>

          <div className="flex space-x-4 border-b border-brand-border pb-1 w-full lg:w-auto overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm uppercase tracking-wider whitespace-nowrap transition-colors duration-300 relative font-medium ${
                  activeTab === tab.id ? 'text-brand-gold' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="relative aspect-video bg-brand-slate-dark border border-brand-border overflow-hidden flex items-center justify-center rounded-2xl"
        >
          <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1024')] bg-cover bg-center grayscale opacity-70 relative">
              <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 text-xs uppercase tracking-widest text-brand-offwhite border border-brand-border rounded font-medium">
                Before
              </div>
            </div>
            <div className="w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=1024')] bg-cover bg-center relative">
              <div className="absolute top-6 right-6 px-3 py-1 bg-brand-gold text-white font-medium text-xs uppercase tracking-widest rounded">
                After
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white shadow z-10 flex flex-col justify-center items-center -translate-x-1/2">
            <div className="w-10 h-10 rounded-full bg-white text-brand-gold flex items-center justify-center shadow-lg border border-brand-border">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        <p className="text-center text-sm text-slate-400 mt-6 uppercase tracking-widest">
          Compare unfinished space with the final finish
        </p>
      </div>
    </section>
  );
}
