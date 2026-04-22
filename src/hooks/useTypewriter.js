import { useState, useEffect, useRef } from 'react';

export function useTypewriter(phrases, {
  startDelay = 2500,
  typeSpeed = 60,
  deleteSpeed = 35,
  pauseAfterWord = 1800,
  pauseBeforeNext = 300,
} = {}) {
  const [text, setText] = useState('');
  const state = useRef({ pi: 0, ci: 0, deleting: false });
  const timerRef = useRef(null);

  useEffect(() => {
    function tick() {
      const s = state.current;
      const phrase = phrases[s.pi];
      if (!s.deleting) {
        const next = phrase.slice(0, s.ci + 1);
        setText(next);
        s.ci++;
        if (s.ci === phrase.length) {
          s.deleting = true;
          timerRef.current = setTimeout(tick, pauseAfterWord);
        } else {
          timerRef.current = setTimeout(tick, typeSpeed);
        }
      } else {
        const next = phrase.slice(0, s.ci - 1);
        setText(next);
        s.ci--;
        if (s.ci === 0) {
          s.deleting = false;
          s.pi = (s.pi + 1) % phrases.length;
          timerRef.current = setTimeout(tick, pauseBeforeNext);
        } else {
          timerRef.current = setTimeout(tick, deleteSpeed);
        }
      }
    }
    timerRef.current = setTimeout(tick, startDelay);
    return () => clearTimeout(timerRef.current);
  }, []);

  return text;
}
