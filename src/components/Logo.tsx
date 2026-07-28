import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md';
  /** onDark = white wordmark (navbar); onLight = navy wordmark (footer) */
  variant?: 'onDark' | 'onLight';
}

export default function Logo({ className = '', size = 'sm', variant = 'onDark' }: LogoProps) {
  const height =
    size === 'md'
      ? 'h-14'
      : 'h-12 sm:h-14';
  const src = variant === 'onLight' ? '/logo-on-light.png' : '/logo-on-dark.png';

  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="BrushUp Home"
    >
      <img
        src={src}
        alt="BrushUp Home"
        className={`${height} w-auto max-w-[200px] sm:max-w-[240px] object-contain object-left`}
      />
    </Link>
  );
}
