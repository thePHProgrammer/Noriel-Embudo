import * as THREE from 'three';

// Floating low-poly islands with glowing crystals — the "land" of the world.
// Clusters sit just off the camera path at each chapter so travellers pass
// alongside them instead of through them.
const CLUSTERS = [
  // Signal shrine — chapter I
  { center: [20, -6, -70], count: 4, spread: 14, crystal: 0x22d3ee },
  // The Forge — chapter II
  { center: [-26, 2, -138], count: 6, spread: 18, crystal: 0xf59e0b },
  // Voyage gates — chapter III
  { center: [16, 4, -208], count: 5, spread: 16, crystal: 0x7c3aed },
  // Archive — chapter IV
  { center: [-20, -8, -278], count: 4, spread: 14, crystal: 0x22d3ee },
  // Outskirts of the beacon — chapter V
  { center: [14, -4, -350], count: 3, spread: 12, crystal: 0xf59e0b },
];

function makeIsland(crystalHex, rng) {
  const island = new THREE.Group();
  const size = 2.5 + rng() * 4;

  const rock = new THREE.Mesh(
    new THREE.IcosahedronGeometry(size, 0),
    new THREE.MeshStandardMaterial({
      color: 0x1b1e2e,
      flatShading: true,
      roughness: 0.9,
      metalness: 0.15,
      emissive: 0x0d0f1a,
    })
  );
  rock.scale.y = 0.55 + rng() * 0.3;
  rock.rotation.set(rng() * Math.PI, rng() * Math.PI, rng() * Math.PI);
  island.add(rock);

  const crystals = (1 + rng() * 3) | 0;
  for (let i = 0; i < crystals; i++) {
    const h = 0.8 + rng() * size * 0.8;
    const crystal = new THREE.Mesh(
      new THREE.ConeGeometry(h * 0.22, h, 5),
      new THREE.MeshStandardMaterial({
        color: crystalHex,
        emissive: crystalHex,
        emissiveIntensity: 1.4,
        flatShading: true,
        roughness: 0.3,
      })
    );
    crystal.position.set((rng() - 0.5) * size, size * 0.35, (rng() - 0.5) * size);
    crystal.rotation.z = (rng() - 0.5) * 0.7;
    island.add(crystal);
  }
  return island;
}

export function createIslands() {
  const group = new THREE.Group();
  const floaters = [];
  let seed = 42;
  const rng = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  for (const { center, count, spread, crystal } of CLUSTERS) {
    for (let i = 0; i < count; i++) {
      const island = makeIsland(crystal, rng);
      island.position.set(
        center[0] + (rng() - 0.5) * spread * 2,
        center[1] + (rng() - 0.5) * spread,
        center[2] + (rng() - 0.5) * spread * 2
      );
      island.userData = {
        baseY: island.position.y,
        phase: rng() * Math.PI * 2,
        bob: 0.6 + rng() * 1.2,
        spin: (rng() - 0.5) * 0.1,
      };
      group.add(island);
      floaters.push(island);
    }
  }

  return {
    group,
    update(time) {
      for (const f of floaters) {
        f.position.y = f.userData.baseY + Math.sin(time * 0.4 + f.userData.phase) * f.userData.bob;
        f.rotation.y = time * f.userData.spin;
      }
    },
  };
}
