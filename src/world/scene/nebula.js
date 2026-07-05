import * as THREE from 'three';
import { makeNebulaTexture } from './textures';

// Dreamlike painted clouds scattered along the corridor. Each is a huge
// additively-blended sprite that slowly breathes and rotates.
const CLOUDS = [
  // [x, y, z, scale, colorA, colorB, seed]
  [-70, 30, -40, 190, '#F59E0B', '#F97316', 3],
  [80, -25, -90, 220, '#7C3AED', '#22D3EE', 7],
  [-60, -35, -150, 240, '#22D3EE', '#7C3AED', 11],
  [70, 40, -190, 200, '#F59E0B', '#EC4899', 17],
  [-90, 10, -250, 260, '#7C3AED', '#F59E0B', 23],
  [60, -30, -300, 210, '#22D3EE', '#F97316', 29],
  [-50, 45, -360, 230, '#EC4899', '#7C3AED', 31],
  [40, 20, -430, 250, '#F59E0B', '#22D3EE', 37],
];

export function createNebulae() {
  const group = new THREE.Group();
  const sprites = [];

  for (const [x, y, z, scale, a, b, seed] of CLOUDS) {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeNebulaTexture(a, b, 256, seed),
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        rotation: Math.random() * Math.PI * 2,
      })
    );
    sprite.position.set(x, y, z);
    sprite.scale.setScalar(scale);
    sprite.userData = { base: scale, phase: seed, spin: (seed % 2 ? 1 : -1) * 0.008 };
    group.add(sprite);
    sprites.push(sprite);
  }

  return {
    group,
    update(time, delta) {
      for (const s of sprites) {
        s.material.rotation += s.userData.spin * delta;
        const breathe = 1 + 0.05 * Math.sin(time * 0.08 + s.userData.phase);
        s.scale.setScalar(s.userData.base * breathe);
      }
    },
  };
}
