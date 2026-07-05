import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CAMERA_PATH, poseCamera } from './scene/path';
import { createStars } from './scene/stars';
import { createGalaxy } from './scene/galaxy';
import { createNebulae } from './scene/nebula';
import { createIslands } from './scene/islands';
import { createCreatures } from './scene/creatures';
import { createBeacon } from './scene/beacon';

// The living world behind the journey. Fixed full-screen WebGL canvas whose
// camera is scrubbed along CAMERA_PATH by page scroll — the page itself only
// provides scroll distance and the HTML story overlay.
export function WorldCanvas({ onFail }) {
  const mountRef = useRef(null);
  const onFailRef = useRef(onFail);
  onFailRef.current = onFail;

  useEffect(() => {
    const mount = mountRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      onFailRef.current?.();
      return;
    }

    const quality = window.innerWidth < 768 ? 0.5 : 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x06070d);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070d, 0.003);
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 800);

    scene.add(new THREE.AmbientLight(0x8890b8, 0.5));
    const sun = new THREE.DirectionalLight(0xf59e0b, 1.1);
    sun.position.set(-60, 80, 20);
    scene.add(sun);

    // Travelling fill light so islands are always readable as we pass them.
    const lantern = new THREE.PointLight(0x22d3ee, 90, 90, 1.6);
    scene.add(lantern);

    const state = { target: 0, smooth: 0, mouseX: 0, mouseY: 0, mx: 0, my: 0 };
    const attractor = new THREE.Vector3();
    const getAttractor = () => CAMERA_PATH.getPointAt(Math.min(state.smooth + 0.035, 1), attractor);

    const actors = [
      createStars(quality),
      createNebulae(),
      createIslands(),
      createGalaxy({
        count: Math.floor(15000 * quality),
        radius: 60,
        position: new THREE.Vector3(-95, 34, -150),
        tilt: new THREE.Euler(0.9, 0.2, 0.5),
      }),
      createGalaxy({
        count: Math.floor(8000 * quality),
        radius: 38,
        branches: 3,
        innerHex: 0x22d3ee,
        outerHex: 0xec4899,
        position: new THREE.Vector3(75, -38, -320),
        tilt: new THREE.Euler(1.2, -0.3, 0.2),
        rotationSpeed: -0.02,
      }),
      createCreatures(quality, getAttractor),
      createBeacon(),
    ];
    actors.forEach(a => scene.add(a.group));

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function readScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      state.target = max > 0 ? window.scrollY / max : 0;
    }
    function onMouse(e) {
      state.mx = (e.clientX / window.innerWidth - 0.5) * 2;
      state.my = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('pointermove', onMouse, { passive: true });
    window.addEventListener('resize', onResize);
    readScroll();

    const clock = new THREE.Clock();
    let time = 0;
    let raf = 0;

    function frame() {
      raf = requestAnimationFrame(frame);
      const delta = Math.min(clock.getDelta(), 0.05);

      if (reduceMotion) {
        state.smooth = state.target;
      } else {
        time += delta;
        // Critically-damped-ish chase: cinematic glide instead of 1:1 scrub.
        state.smooth += (state.target - state.smooth) * Math.min(1, delta * 3.2);
        state.mouseX += (state.mx - state.mouseX) * Math.min(1, delta * 2.5);
        state.mouseY += (state.my - state.mouseY) * Math.min(1, delta * 2.5);
      }

      poseCamera(camera, state.smooth, state.mouseX, -state.mouseY);
      lantern.position.copy(camera.position);
      const motion = reduceMotion ? 0 : delta;
      actors.forEach(a => a.update(time, motion));
      renderer.render(scene, camera);
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        clock.getDelta(); // swallow the hidden interval
        frame();
      }
    }
    document.addEventListener('visibilitychange', onVisibility);
    frame();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('pointermove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      scene.traverse(obj => {
        obj.geometry?.dispose?.();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach(m => {
          m?.map?.dispose?.();
          m?.dispose?.();
        });
      });
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div id="world-canvas" ref={mountRef} aria-hidden="true" />;
}
