import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to hash targets after client-side navigation (e.g. /#contact). */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.replace('#', '');
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
