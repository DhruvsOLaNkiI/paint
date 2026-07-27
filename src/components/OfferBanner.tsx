import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function OfferBanner() {
  return (
    <div className="w-full bg-brand-gold-light border-y border-brand-gold/15">
      <Link
        to="/services"
        className="flex items-center justify-center gap-2 px-4 py-2.5 text-center group"
      >
        <Sparkles className="hidden sm:block w-3.5 h-3.5 text-brand-gold shrink-0" />
        <p className="text-[11px] sm:text-xs md:text-sm text-slate-700 font-medium tracking-wide">
          Opening Discount —{' '}
          <span className="text-brand-gold font-semibold">Flat 25% OFF</span>
          {' '}on all first-month bookings.{' '}
          <span className="text-slate-500">Limited offer —</span>{' '}
          <span className="text-brand-gold underline underline-offset-2 group-hover:text-brand-gold-hover transition-colors font-semibold">
            Book Free Inspection
          </span>
        </p>
        <Sparkles className="hidden sm:block w-3.5 h-3.5 text-brand-gold shrink-0" />
      </Link>
    </div>
  );
}
