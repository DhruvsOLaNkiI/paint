import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Logo size="md" variant="onLight" className="mb-6" />
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Painting services and waterproofing across Delhi NCR. Interior renovation coming soon.
            </p>
          </div>

          <div>
            <h4 className="text-brand-offwhite font-serif text-lg mb-6">Sitemap</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-slate-500 hover:text-brand-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-slate-500 hover:text-brand-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-slate-500 hover:text-brand-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-sm text-slate-500 hover:text-brand-gold transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-slate-500 hover:text-brand-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-offwhite font-serif text-lg mb-6">Service Scope</h4>
            <ul className="space-y-3">
              {['Interior Painting', 'Exterior Painting', 'Waterproofing', 'Texture & Polishing'].map((item) => (
                <li key={item}>
                  <Link to="/services" className="text-sm text-slate-500 hover:text-brand-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-brand-offwhite font-serif text-lg mb-6">Headquarters</h4>
            <address className="not-italic text-sm text-slate-500 space-y-3">
              <p className="flex items-start">
                <span className="text-brand-gold mr-2 mt-0.5">•</span>
                200 Cassia Estate, Pocket A<br />
                Greater Noida, Uttar Pradesh — 201310
              </p>
              <p className="flex items-center">
                <span className="text-brand-gold mr-2">•</span>
                <a href="tel:+917827710110" className="hover:text-brand-gold transition-colors">
                  +91 78277 10110
                </a>
              </p>
              <p className="flex items-center">
                <span className="text-brand-gold mr-2">•</span>
                contact@brushuphomes.com
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-brand-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 uppercase tracking-widest">
            &copy; 2026 BrushUpHomes. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-slate-400 uppercase tracking-widest hover:text-brand-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-slate-400 uppercase tracking-widest hover:text-brand-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
