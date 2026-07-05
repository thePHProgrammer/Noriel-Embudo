import * as THREE from 'three';
import { makeGlowTexture } from './textures';

// The destination: a bright beacon star with orbiting rings at the end of
// the journey, where the contact chapter lands.
export function createBeacon(position = new THREE.Vector3(0, 16, -446)) {
  const group = new THREE.Group();
  group.position.copy(position);

  const core = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeGlowTexture(128, 'rgba(255,236,200,1)'),
      color: 0xf59e0b,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  core.scale.setScalar(26);
  group.add(core);

  const rings = [];
  for (const [radius, hex, tiltX] of [
    [10, 0xf59e0b, Math.PI / 2.4],
    [14, 0x22d3ee, Math.PI / 1.8],
  ]) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.09, 8, 96),
      new THREE.MeshBasicMaterial({
        color: hex,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    ring.rotation.x = tiltX;
    group.add(ring);
    rings.push(ring);
  }

  const light = new THREE.PointLight(0xf59e0b, 220, 140, 1.8);
  group.add(light);

  return {
    group,
    update(time) {
      core.scale.setScalar(26 + Math.sin(time * 1.3) * 2.5);
      rings[0].rotation.z = time * 0.25;
      rings[1].rotation.z = -time * 0.18;
    },
  };
}
