import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function OfferBanner() {
  return (
    <div className="w-full bg-[#0A1638] border-y border-white/10">
      <Link
        to="/services"
        className="flex items-center justify-center gap-2 px-4 py-1.5 text-center group"
      >
        <Sparkles className="hidden sm:block w-3.5 h-3.5 text-sky-300 shrink-0" />
        <p className="text-[11px] sm:text-xs md:text-sm text-white/85 font-medium tracking-wide">
          Opening Discount —{' '}
          <span className="text-sky-300 font-semibold">Flat 25% OFF</span>
          {' '}on all first-month bookings.{' '}
          <span className="text-white/60">Limited offer —</span>{' '}
          <span className="text-sky-300 underline underline-offset-2 group-hover:text-white transition-colors font-semibold">
            Book Free Inspection
          </span>
        </p>
        <Sparkles className="hidden sm:block w-3.5 h-3.5 text-sky-300 shrink-0" />
      </Link>
    </div>
  );
}
