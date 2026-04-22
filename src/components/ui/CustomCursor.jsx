import { useRef } from 'react';
import { useCustomCursor } from '../../hooks/useCustomCursor';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useCustomCursor(dotRef, ringRef);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
