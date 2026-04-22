import { useState, useEffect } from 'react';

export function useSectionReveal(ref, options = {}) {
  const [visible, setVisible] = useState(false);
  const threshold = options.threshold ?? 0.12;
  const rootMargin = options.rootMargin ?? '0px';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold, rootMargin]);

  return visible;
}

export function useReveal(ref) {
  return useSectionReveal(ref, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
}
