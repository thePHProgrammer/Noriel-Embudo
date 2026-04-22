import { useEffect } from 'react';

export function useCustomCursor(dotRef, ringRef) {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0, rafId;

    function onMouseMove(e) {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top = my + 'px';
      }
    }

    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      rafId = requestAnimationFrame(animRing);
    }

    document.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animRing);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}
