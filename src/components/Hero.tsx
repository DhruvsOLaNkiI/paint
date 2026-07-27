import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';

const heroSlides = [
  {
    image:
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=2400',
    eyebrow: 'Interior Finish',
    title: 'Interior Painting',
    subtitle: 'Smooth walls, accent colors, dust-controlled finish for every room.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=2400',
    eyebrow: 'Exterior Shield',
    title: 'Exterior Painting',
    subtitle: 'Weather-resistant coats that protect and refresh your building facade.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2400',
    eyebrow: 'Leak Protection',
    title: 'Waterproofing',
    subtitle: 'Terrace, bathroom, and basement waterproofing with expert survey.',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const slide = heroSlides[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Clear full-bleed background — no white wash */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={slide.image}
            src={slide.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            alt={slide.title}
          />
        </AnimatePresence>

        {/* Dark overlay only for text readability — photo stays clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
            >
              <h2 className="text-white/80 text-sm uppercase tracking-[0.25em] mb-4 flex items-center font-semibold">
                <span className="w-10 h-[2px] bg-white mr-3" />
                {slide.eyebrow}
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.12] mb-3">
                BrushUp<span className="text-sky-200">Homes</span>
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-5">
                {slide.title}
              </p>
              <p className="text-base md:text-lg text-white/85 mb-10 max-w-lg leading-relaxed">
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/services')}
              className="group flex items-center justify-center px-8 py-4 bg-brand-gold text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-gold-hover transition-all duration-300 rounded-lg shadow-lg"
            >
              <Calendar className="mr-3 w-4 h-4" />
              Book Free Survey
            </button>
            <button
              onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-center px-8 py-4 border border-white/40 text-white text-sm uppercase tracking-widest font-semibold hover:bg-white/10 transition-all duration-300 rounded-lg backdrop-blur-sm"
            >
              Why Choose Us
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 flex gap-2 z-30">
        {heroSlides.map((item, idx) => (
          <button
            key={item.title}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === current ? 'bg-white w-10' : 'bg-white/40 hover:bg-white/70 w-4'
            }`}
            aria-label={`Show ${item.title}`}
          />
        ))}
      </div>
    </section>
  );
}
