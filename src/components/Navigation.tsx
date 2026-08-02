import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import OfferBanner from './OfferBanner';
import Logo from './Logo';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050D26]/95 backdrop-blur-md border-b border-white/10">
      <div className="py-1">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11 relative">
            <div className="flex-shrink-0 z-20">
              <Logo variant="onDark" />
            </div>

            <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20">
              <ul className="flex items-center bg-white/5 border border-white/15 rounded-full p-1">
                {links.map((link, idx) => {
                  const isActive = activeSection === link.section;
                  return (
                    <li key={link.name} className="flex items-center">
                      <Link
                        to={link.href}
                        onClick={() => setActiveSection(link.section)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-white text-[#050D26] shadow-sm'
                            : 'text-white/75 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {link.name}
                      </Link>
                      {idx < links.length - 1 && (
                        <span className="w-px h-3 bg-white/20 mx-0.5" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden lg:flex items-center space-x-4 z-20">
              <button
                onClick={goToServices}
                className="px-4 py-1.5 bg-white text-[#050D26] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-sky-100 transition-all duration-300"
              >
                Book Survey
              </button>
            </div>

            <div className="lg:hidden z-20">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
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
            className="lg:hidden absolute top-[3.75rem] left-4 right-4 mt-2 bg-[#050D26] border border-white/15 rounded-2xl shadow-lg overflow-hidden"
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
                        ? 'bg-white text-[#050D26]'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4 px-2">
                <button
                  onClick={goToServices}
                  className="w-full py-4 bg-white text-[#050D26] text-sm uppercase tracking-widest font-bold rounded-xl hover:bg-sky-100 transition-colors duration-300"
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
