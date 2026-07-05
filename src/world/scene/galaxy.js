import * as THREE from 'three';
import { makeGlowTexture } from './textures';

// Stylized spiral galaxy built from tinted point sprites — gold core fading
// to the rim color through the arms, like a digital painting of a galaxy.
export function createGalaxy({
  count = 14000,
  radius = 55,
  branches = 4,
  spin = 1.2,
  innerHex = 0xf59e0b,
  outerHex = 0x7c3aed,
  position = new THREE.Vector3(),
  tilt = new THREE.Euler(),
  rotationSpeed = 0.012,
} = {}) {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const inner = new THREE.Color(innerHex);
  const outer = new THREE.Color(outerHex);
  const c = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const r = Math.pow(Math.random(), 1.6) * radius;
    const branch = ((i % branches) / branches) * Math.PI * 2;
    const angle = branch + r * spin * 0.1;
    // Random scatter shrinking toward the rim keeps arms readable.
    const sx = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (radius - r) * 0.12;
    const sy = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * radius * 0.035;
    const sz = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (radius - r) * 0.12;

    pos[i * 3] = Math.cos(angle) * r + sx;
    pos[i * 3 + 1] = sy;
    pos[i * 3 + 2] = Math.sin(angle) * r + sz;

    c.copy(inner).lerp(outer, r / radius);
    c.toArray(col, i * 3);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

  const points = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 1.4,
      map: makeGlowTexture(64),
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
  );

  // Bright painted core.
  const core = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeGlowTexture(128, 'rgba(255,214,150,1)'),
      color: innerHex,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  core.scale.setScalar(radius * 0.5);

  const group = new THREE.Group();
  group.add(points, core);
  group.position.copy(position);
  group.rotation.copy(tilt);

  return {
    group,
    update(_, delta) {
      points.rotation.y += rotationSpeed * delta;
    },
  };
}
