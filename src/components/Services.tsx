import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Wrench } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Painting Services',
    description:
      'Interior, exterior, rental painting, texture, and polishing — book a free survey and get a clear quote.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=1024',
    href: '/services?category=Painting',
  },
  {
    id: '02',
    title: 'Waterproofing',
    description:
      'Terrace, bathroom, and basement waterproofing with expert inspection and lasting protection.',
    image: '/waterproofing.jpg',
    href: '/services?category=Waterproofing',
  },
  {
    id: '03',
    title: 'Interior Renovation',
    description: 'Full interior renovation and design — coming soon. Stay tuned for turnkey makeovers.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1024',
    href: '/services?category=Interiors',
    comingSoon: true,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-24 bg-[#F7F8FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-14">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-gold/10 text-brand-gold mb-4">
            <Wrench className="w-5 h-5" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-offwhite tracking-tight mb-3">
            Our Services
          </h2>
          <p className="text-sm md:text-[15px] text-slate-500 max-w-md mx-auto leading-relaxed">
            Delivering trusted home solutions right to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <Link
                to={service.href}
                className="group block bg-white rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(15,23,42,0.1)] transition-shadow duration-300 h-full"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="px-5 pt-5 pb-6 text-center">
                  <h3 className="text-[17px] md:text-lg font-semibold text-brand-offwhite mb-2 flex items-center justify-center gap-2">
                    {service.title}
                    {service.comingSoon && (
                      <span className="text-[9px] uppercase tracking-wider text-brand-gold border border-brand-gold/30 px-1.5 py-0.5 rounded font-medium">
                        Soon
                      </span>
                    )}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed max-w-[280px] mx-auto">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
