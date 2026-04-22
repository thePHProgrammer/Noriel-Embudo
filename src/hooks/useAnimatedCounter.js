import { useEffect, useRef } from 'react';

export function useAnimatedCounter(elRef, target, suffix = '', duration = 1600) {
  const firedRef = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          obs.disconnect();
          let startTime = null;
          function step(ts) {
            if (!startTime) startTime = ts;
            const prog = Math.min((ts - startTime) / duration, 1);
            el.textContent = Math.floor(prog * target) + suffix;
            if (prog < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
          }
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [elRef, target, suffix, duration]);
}
