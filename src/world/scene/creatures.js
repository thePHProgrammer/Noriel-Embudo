import * as THREE from 'three';
import { makeGlowTexture } from './textures';

const TRAIL = 24;

// Wisps: jellyfish-like light creatures. Each is a glowing head plus a
// ribbon trail that replays the head's recent positions, fading to black
// (which under additive blending reads as fading out).
function makeWisp(hex, home, roam, speedSeed) {
  const group = new THREE.Group();

  const head = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeGlowTexture(64),
      color: hex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  head.scale.setScalar(3);
  group.add(head);

  const positions = new Float32Array(TRAIL * 3);
  const colors = new Float32Array(TRAIL * 3);
  const tint = new THREE.Color(hex);
  for (let i = 0; i < TRAIL; i++) {
    const fade = 1 - i / TRAIL;
    colors[i * 3] = tint.r * fade;
    colors[i * 3 + 1] = tint.g * fade;
    colors[i * 3 + 2] = tint.b * fade;
  }
  const trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  trailGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const trail = new THREE.Line(
    trailGeo,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  group.add(trail);

  const history = [];
  const s = speedSeed;

  return {
    group,
    update(time) {
      // Lissajous-style wandering around the wisp's home point.
      head.position.set(
        home.x + Math.sin(time * (0.21 + s * 0.05) + s * 7) * roam,
        home.y + Math.sin(time * (0.33 + s * 0.04) + s * 3) * roam * 0.55,
        home.z + Math.cos(time * (0.17 + s * 0.06) + s * 5) * roam
      );
      head.material.opacity = 0.7 + 0.3 * Math.sin(time * 1.7 + s * 9);

      history.unshift(head.position.clone());
      if (history.length > TRAIL) history.pop();
      const attr = trailGeo.attributes.position;
      for (let i = 0; i < TRAIL; i++) {
        const p = history[Math.min(i, history.length - 1)];
        attr.setXYZ(i, p.x, p.y, p.z);
      }
      attr.needsUpdate = true;
    },
  };
}

const WISPS = [
  [0x22d3ee, [10, 5, -55], 9, 1],
  [0xf59e0b, [-14, -2, -120], 11, 2],
  [0xc4b5fd, [18, 8, -160], 8, 3],
  [0x22d3ee, [-8, 2, -225], 10, 4],
  [0xf97316, [12, -6, -290], 9, 5],
  [0xc4b5fd, [-6, 6, -365], 8, 6],
];

// Motes: a loose flock of tiny lights that swims along the path just ahead
// of the traveller — guide spirits through the world.
function makeMotes(count, getAttractor) {
  const pos = new Float32Array(count * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const points = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 1.5,
      map: makeGlowTexture(32),
      color: 0xffe3a3,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
  );
  const params = Array.from({ length: count }, (_, i) => ({
    r: 2 + Math.random() * 8,
    a: Math.random() * Math.PI * 2,
    va: 0.3 + Math.random() * 0.8,
    vy: Math.random() * Math.PI * 2,
    cur: new THREE.Vector3(0, 0, 40 - i * 0.2),
  }));
  const target = new THREE.Vector3();

  return {
    points,
    update(time, delta) {
      const attractor = getAttractor();
      const attr = geo.attributes.position;
      for (let i = 0; i < count; i++) {
        const p = params[i];
        target.set(
          attractor.x + Math.cos(time * p.va + p.a) * p.r,
          attractor.y + Math.sin(time * p.va * 0.8 + p.vy) * p.r * 0.6,
          attractor.z + Math.sin(time * p.va + p.a) * p.r
        );
        // Lazy pursuit gives the flock its organic, trailing shape.
        p.cur.lerp(target, Math.min(1, delta * (0.8 + p.va)));
        attr.setXYZ(i, p.cur.x, p.cur.y, p.cur.z);
      }
      attr.needsUpdate = true;
    },
  };
}

export function createCreatures(quality, getAttractor) {
  const group = new THREE.Group();
  const wisps = WISPS.slice(0, quality < 0.7 ? 4 : WISPS.length).map(([hex, home, roam, s]) =>
    makeWisp(hex, new THREE.Vector3(...home), roam, s)
  );
  wisps.forEach(w => group.add(w.group));

  const motes = makeMotes(Math.floor(70 * quality), getAttractor);
  group.add(motes.points);

  return {
    group,
    update(time, delta) {
      wisps.forEach(w => w.update(time));
      motes.update(time, delta);
    },
  };
}
