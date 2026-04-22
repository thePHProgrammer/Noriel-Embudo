import { useEffect } from 'react';

export function useHeroParallax(nameRef, titleRef) {
  useEffect(() => {
    function onMouseMove(e) {
      const dx = (e.clientX / window.innerWidth - 0.5) * 20;
      const dy = (e.clientY / window.innerHeight - 0.5) * 10;
      if (nameRef.current) nameRef.current.style.transform = `translate(${dx * 0.4}px, ${dy * 0.4}px)`;
      if (titleRef.current) titleRef.current.style.transform = `translate(${dx * 0.2}px, ${dy * 0.2}px)`;
    }
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [nameRef, titleRef]);
}
