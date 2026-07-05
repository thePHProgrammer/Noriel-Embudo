import * as THREE from 'three';

// All glow/nebula art is generated at runtime on 2D canvases so the world
// ships zero image assets and every color stays in the site palette.

export function makeGlowTexture(size = 128, inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.25, inner.replace(/[\d.]+\)$/, '0.6)'));
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Soft irregular cloud: several offset radial blobs blended together, then
// tinted. Reads as a painted nebula once scaled up and additively blended.
export function makeNebulaTexture(hexA, hexB, size = 256, seed = 1) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);

  for (let i = 0; i < 9; i++) {
    const x = size * (0.3 + rand() * 0.4);
    const y = size * (0.3 + rand() * 0.4);
    const r = size * (0.12 + rand() * 0.3);
    const col = rand() > 0.5 ? hexA : hexB;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `${col}55`);
    g.addColorStop(1, `${col}00`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  // Fade the edges so sprite borders never show as hard squares.
  const edge = ctx.createRadialGradient(size / 2, size / 2, size * 0.25, size / 2, size / 2, size / 2);
  edge.addColorStop(0, 'rgba(0,0,0,0)');
  edge.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = edge;
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'source-over';

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
