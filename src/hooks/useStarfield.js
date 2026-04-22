import { useEffect } from 'react';

export function useStarfield(canvasRef) {
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, stars = [], frame = 0, rafId;

    function resize() {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
    }

    function init() {
      stars = [];
      const tH = document.body.scrollHeight;
      for (let i = 0; i < 500; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * tH,
          r: Math.random() < 0.06 ? 1.5 : Math.random() < 0.25 ? 0.9 : 0.45,
          a: 0.4 + Math.random() * 0.6,
          ts: 0.005 + Math.random() * 0.02,
          to: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;
      const sY = window.scrollY;
      stars.forEach(s => {
        const sy = s.y - sY * 0.3;
        if (sy < -5 || sy > H + 5) return;
        const t = Math.sin(frame * s.ts + s.to) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, sy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,240,232,${s.a * t})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    }

    function onResize() { resize(); init(); }

    resize();
    init();
    draw();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);
}
