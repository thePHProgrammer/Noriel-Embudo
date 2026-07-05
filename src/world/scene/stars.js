import * as THREE from 'three';
import { makeGlowTexture } from './textures';

// Two depth layers of stars spanning the full flight corridor. Layer opacity
// pulses out of phase so the sky twinkles without per-star shader work.
export function createStars(quality) {
  const group = new THREE.Group();
  const sprite = makeGlowTexture(64);
  const palette = [0xe8e4dc, 0xf59e0b, 0x22d3ee, 0xffffff, 0xc4b5fd];
  const layers = [];

  for (const [count, size, spread] of [
    [Math.floor(2600 * quality), 1.1, 320],
    [Math.floor(1400 * quality), 2.0, 200],
  ]) {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = 90 - Math.random() * 620;
      c.setHex(palette[(Math.random() * palette.length) | 0]);
      c.toArray(col, i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    group.add(points);
    layers.push(mat);
  }

  return {
    group,
    update(time) {
      layers[0].opacity = 0.65 + 0.3 * Math.sin(time * 0.7);
      layers[1].opacity = 0.65 + 0.3 * Math.sin(time * 0.9 + 2.1);
    },
  };
}
