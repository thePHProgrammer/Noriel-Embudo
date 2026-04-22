import { useEffect } from 'react';

export function useBigBang(canvasRef, onComplete) {
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const CX = c.width / 2, CY = c.height / 2;

    const P = [];
    for (let i = 0; i < 280; i++) {
      const a = Math.random() * Math.PI * 2, spd = 2 + Math.random() * 7;
      P.push({
        x: CX, y: CY,
        vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
        r: 0.5 + Math.random() * 2.5,
        al: 0.9 + Math.random() * 0.1,
        dec: 0.007 + Math.random() * 0.013,
        col: Math.random() < 0.6
          ? `rgba(245,${150 + Math.floor(Math.random() * 60)},11,`
          : `rgba(249,${70 + Math.floor(Math.random() * 60)},22,`,
      });
    }

    let t = 0, done = false, rafId;

    function tick() {
      if (done) return;
      t++;
      ctx.clearRect(0, 0, c.width, c.height);

      const oa = Math.max(0, 1 - t / 45);
      ctx.fillStyle = `rgba(6,7,13,${oa})`;
      ctx.fillRect(0, 0, c.width, c.height);

      if (t < 30) {
        const ba = t < 14 ? t / 14 : (30 - t) / 16;
        const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, 90 * ba);
        g.addColorStop(0, `rgba(255,230,120,${ba * 0.95})`);
        g.addColorStop(0.4, `rgba(245,158,11,${ba * 0.4})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(CX, CY, 90, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      }

      let allDead = true;
      P.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.97; p.vy *= 0.97;
        p.al -= p.dec;
        if (p.al > 0) {
          allDead = false;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.col + p.al + ')';
          ctx.fill();
        }
      });

      if (t < 70) {
        const rr = t * 9, ra = Math.max(0, 0.6 - t / 70);
        ctx.beginPath(); ctx.arc(CX, CY, rr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245,158,11,${ra})`; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(CX, CY, rr * 0.65, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249,115,22,${ra * 0.5})`; ctx.lineWidth = 1; ctx.stroke();
      }

      if (allDead && t > 70) {
        const fa = Math.max(0, 1 - (t - 85) / 25);
        if (fa <= 0) {
          done = true;
          c.style.display = 'none';
          if (onComplete) onComplete();
          return;
        }
        ctx.fillStyle = `rgba(6,7,13,${1 - fa})`;
        ctx.fillRect(0, 0, c.width, c.height);
      }

      rafId = requestAnimationFrame(tick);
    }

    const timer = setTimeout(tick, 150);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, []);
}
