import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import OfferBanner from './OfferBanner';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: 'Home', href: '/#home', section: 'Home' },
    { name: 'About', href: '/about', section: 'About' },
    { name: 'Services', href: '/services', section: 'Services' },
    { name: 'My Bookings', href: '/my-bookings', section: 'My Bookings' },
    { name: 'Contact', href: '/contact', section: 'Contact' },
  ];

  useEffect(() => {
    if (location.pathname === '/services') {
      setActiveSection('Services');
      return;
    }
    if (location.pathname === '/about') {
      setActiveSection('About');
      return;
    }
    if (location.pathname === '/contact') {
      setActiveSection('Contact');
      return;
    }
    if (location.pathname === '/my-bookings') {
      setActiveSection('My Bookings');
      return;
    }

    const handleScroll = () => {
      if (window.scrollY < 500) {
        setActiveSection('Home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const goToServices = () => {
    setIsOpen(false);
    navigate('/services');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-border">
      <div className="pt-3 pb-2">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 relative">
            <div className="flex-shrink-0 z-20">
              <Link to="/" className="font-sans text-xl sm:text-2xl tracking-tight uppercase">
                <span className="text-brand-offwhite font-bold">BrushUp</span>
                <span className="text-brand-gold font-bold">Homes</span>
              </Link>
            </div>

            <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20">
              <ul className="flex items-center bg-brand-slate-dark border border-brand-border rounded-full p-1.5">
                {links.map((link, idx) => {
                  const isActive = activeSection === link.section;
                  return (
                    <li key={link.name} className="flex items-center">
                      <Link
                        to={link.href}
                        onClick={() => setActiveSection(link.section)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-brand-gold text-white shadow-sm'
                            : 'text-slate-600 hover:text-brand-gold hover:bg-white'
                        }`}
                      >
                        {link.name}
                      </Link>
                      {idx < links.length - 1 && (
                        <span className="w-px h-4 bg-brand-border mx-1" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden lg:flex items-center space-x-4 z-20">
              <button
                onClick={goToServices}
                className="px-6 py-2.5 bg-brand-gold text-white text-sm uppercase tracking-widest font-semibold rounded-full hover:bg-brand-gold-hover transition-all duration-300"
              >
                Book Survey
              </button>
            </div>

            <div className="lg:hidden z-20">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full border border-brand-border text-brand-offwhite hover:text-brand-gold hover:border-brand-gold/40 transition-colors bg-white"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <OfferBanner />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-[5.25rem] left-4 right-4 mt-2 bg-white border border-brand-border rounded-2xl shadow-lg overflow-hidden"
          >
            <ul className="px-4 py-6 space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => {
                      setActiveSection(link.section);
                      setIsOpen(false);
                    }}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      activeSection === link.section
                        ? 'bg-brand-gold text-white'
                        : 'text-slate-700 hover:text-brand-gold hover:bg-brand-slate-dark'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4 px-2">
                <button
                  onClick={goToServices}
                  className="w-full py-4 bg-brand-gold text-white text-sm uppercase tracking-widest font-bold rounded-xl hover:bg-brand-gold-hover transition-colors duration-300"
                >
                  Book Survey
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
