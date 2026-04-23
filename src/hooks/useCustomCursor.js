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

    function onMouseOver(e) {
      if (!e.target.closest('a, button')) return;
      if (ringRef.current) {
        ringRef.current.style.width = '64px';
        ringRef.current.style.height = '64px';
        ringRef.current.style.borderColor = 'var(--gold)';
        ringRef.current.style.boxShadow = '0 0 20px rgba(245,158,11,0.3)';
      }
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(0.5)';
    }

    function onMouseOut(e) {
      if (!e.target.closest('a, button')) return;
      if (ringRef.current) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.borderColor = 'rgba(245,158,11,0.4)';
        ringRef.current.style.boxShadow = '';
      }
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
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
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafId = requestAnimationFrame(animRing);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);
}
