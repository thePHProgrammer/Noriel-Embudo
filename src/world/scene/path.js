import * as THREE from 'three';

// The spine of the whole journey: scroll progress 0→1 maps onto this curve.
// It weaves left/right and up/down so travel feels like flight, not a zoom.
export const CAMERA_PATH = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 2, 62),
    new THREE.Vector3(0, 1, 4),
    new THREE.Vector3(16, 6, -66),
    new THREE.Vector3(-18, -3, -136),
    new THREE.Vector3(9, 9, -206),
    new THREE.Vector3(-13, -5, -276),
    new THREE.Vector3(0, 4, -348),
    new THREE.Vector3(0, 1, -416),
  ],
  false,
  'centripetal',
  0.5
);

const _pos = new THREE.Vector3();
const _ahead = new THREE.Vector3();

// Places the camera on the curve at progress t and aims it a little further
// along, with a gentle mouse-driven look offset for parallax.
export function poseCamera(camera, t, mouseX = 0, mouseY = 0) {
  // Cap short of 1 so the look-ahead point never collapses onto the camera.
  const p = THREE.MathUtils.clamp(t, 0, 1) * 0.975;
  CAMERA_PATH.getPointAt(p, _pos);
  CAMERA_PATH.getPointAt(Math.min(p + 0.02, 1), _ahead);
  camera.position.copy(_pos);
  _ahead.x += mouseX * 6;
  _ahead.y += mouseY * 4;
  camera.lookAt(_ahead);
}
