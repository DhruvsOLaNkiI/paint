import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md';
  /** onDark = white wordmark (navbar); onLight = navy wordmark (footer) */
  variant?: 'onDark' | 'onLight';
}

export default function Logo({ className = '', size = 'sm', variant = 'onDark' }: LogoProps) {
  const height = size === 'md' ? 'h-9 sm:h-10' : 'h-7 sm:h-8';
  const src = variant === 'onLight' ? '/logo-on-light.png' : '/logo-on-dark.png';

  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="BrushUpHomes"
    >
      <img
        src={src}
        alt="BrushUpHomes"
        className={`${height} w-auto max-w-[150px] sm:max-w-[170px] object-contain object-left`}
      />
    </Link>
  );
}
