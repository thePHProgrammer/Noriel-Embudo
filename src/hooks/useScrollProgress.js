import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [state, setState] = useState({ pct: 0, scrollY: 0 });

  useEffect(() => {
    function onScroll() {
      const sY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? (sY / docH) * 100 : 0;
      setState({ pct, scrollY: sY });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return state;
}
