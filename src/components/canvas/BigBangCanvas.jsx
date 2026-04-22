import { useRef } from 'react';
import { useBigBang } from '../../hooks/useBigBang';

export function BigBangCanvas({ onComplete }) {
  const canvasRef = useRef(null);
  useBigBang(canvasRef, onComplete);
  return <canvas id="bigbang-canvas" ref={canvasRef} />;
}
