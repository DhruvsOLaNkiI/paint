import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Wrench,
  Paintbrush,
  Shield,
  Layout,
  X,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BookSurveyModal from '../components/BookSurveyModal';
import {
  catalogServices,
  serviceCategories,
  type CatalogService,
  type ServiceCategory,
} from '../data/servicesCatalog';

const categoryIcons: Partial<Record<ServiceCategory, typeof Paintbrush>> = {
  Painting: Paintbrush,
  Waterproofing: Shield,
  Interiors: Layout,
};

function isServiceCategory(value: string | null): value is ServiceCategory {
  return Boolean(value && serviceCategories.includes(value as ServiceCategory));
}

export default function ServicesPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All Services');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [detailService, setDetailService] = useState<CatalogService | null>(null);

  useEffect(() => {
    const category = searchParams.get('category');
    if (isServiceCategory(category)) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  const closeModal = useCallback(() => setSelectedService(null), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogServices.filter((service) => {
      const matchesCategory =
        activeCategory === 'All Services' || service.category === activeCategory;
      const matchesQuery =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.tag.toLowerCase().includes(q) ||
        service.category.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const openBooking = (service: CatalogService) => {
    if (!service.bookable) return;
    setDetailService(null);
    setSelectedService(service.title);
  };

  const openDetail = (service: CatalogService) => {
    if (service.gallery?.length) {
      setDetailService(service);
      return;
    }
    if (service.bookable) openBooking(service);
  };

  return (
    <div className="min-h-screen bg-brand-slate-dark text-brand-offwhite font-sans antialiased selection:bg-brand-gold/20 selection:text-brand-offwhite">
      <Navigation />

      <main className="pt-40 pb-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(27,79,114,0.06),_transparent_55%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-gold/10 text-brand-gold mb-4">
              <Wrench className="w-5 h-5" />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-brand-offwhite tracking-tight mb-3">
              Our Services
            </h1>
            <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed max-w-md mx-auto">
              Delivering trusted home solutions right to your doorstep.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <label className="relative block">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/70" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search painting, texture, waterproofing..."
                className="w-full bg-brand-slate/80 border border-brand-border text-brand-offwhite placeholder:text-slate-400 rounded-full pl-14 pr-6 py-4 focus:outline-none focus:border-brand-gold/60 transition-colors backdrop-blur-sm"
              />
            </label>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {serviceCategories.map((category) => {
              const Icon = categoryIcons[category];
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-all duration-300 border ${
                    isActive
                      ? 'bg-brand-gold text-white border-brand-gold font-medium shadow-sm'
                      : 'bg-white text-slate-600 border-brand-border hover:border-brand-gold/50 hover:text-brand-gold'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {category}
                </button>
              );
            })}
          </motion.div>

          {activeCategory === 'Painting' && (
            <p className="text-center text-sm text-slate-500 mb-8 -mt-6">
              Choose a painting option below, then book a free survey.
            </p>
          )}

          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-slate-500 py-20"
              >
                No services match your search. Try another category or keyword.
              </motion.p>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((service, index) => (
                  <motion.article
                    key={service.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                    className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)] flex flex-col"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col px-5 pt-5 pb-5 text-center">
                      <h2 className="text-[17px] md:text-lg font-semibold text-brand-offwhite mb-2 leading-snug">
                        {service.title}
                      </h2>

                      <p className="text-[13px] text-slate-500 leading-relaxed mb-5 flex-1">
                        {service.description}
                      </p>

                      {service.bookable ? (
                        <div className="space-y-2">
                          {service.gallery?.length ? (
                            <button
                              type="button"
                              onClick={() => openDetail(service)}
                              className="w-full py-3 rounded-xl border border-brand-gold/40 text-brand-gold text-xs uppercase tracking-[0.18em] font-semibold hover:bg-brand-gold/10 transition-colors"
                            >
                              View Details
                            </button>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => openBooking(service)}
                            className="w-full py-3 rounded-xl bg-brand-gold text-white text-xs uppercase tracking-[0.18em] font-semibold hover:bg-brand-gold-hover transition-colors shadow-sm"
                          >
                            Book Survey
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="w-full py-3 rounded-xl bg-slate-100 text-slate-500 text-xs uppercase tracking-[0.18em] font-semibold cursor-not-allowed"
                        >
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />

      <BookSurveyModal serviceTitle={selectedService} onClose={closeModal} />

      <AnimatePresence>
        {detailService && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              aria-label="Close details"
              onClick={() => setDetailService(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-brand-border bg-brand-slate shadow-2xl p-6 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setDetailService(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:text-brand-offwhite hover:bg-brand-slate-dark"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-3xl font-serif text-brand-offwhite mb-3 pr-10">{detailService.title}</h2>
              <p className="text-slate-500 font-light leading-relaxed mb-6">{detailService.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {detailService.gallery?.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="w-full h-36 sm:h-44 object-cover rounded-xl border border-brand-border"
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => openBooking(detailService)}
                className="w-full py-4 rounded-xl bg-brand-gold text-white text-sm uppercase tracking-widest font-semibold hover:bg-brand-gold-hover transition-colors"
              >
                Book Survey
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
