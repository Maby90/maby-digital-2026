import React, { useEffect, useRef, useState } from 'react';
import { gsap, heavyFX } from '../lib/gsap';

// A mint ring that eases behind the native cursor and swells over interactive
// elements. Additive: the system cursor stays visible. Off on touch/reduced-motion.
export default function CustomCursor() {
  const ringRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!heavyFX()) return;
    setOn(true);

    const ring = ringRef.current;
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

    const move = (e) => { xRing(e.clientX); yRing(e.clientY); };

    const interactive = 'a, button, [data-cursor], input, textarea, [role="button"]';
    const over = (e) => {
      if (e.target.closest(interactive)) {
        gsap.to(ring, { scale: 2.4, borderColor: 'rgb(var(--mint))', backgroundColor: 'rgb(var(--mint) / 0.10)', duration: 0.3 });
      }
    };
    const out = (e) => {
      if (e.target.closest(interactive)) {
        gsap.to(ring, { scale: 1, borderColor: 'rgb(var(--mint) / 0.5)', backgroundColor: 'transparent', duration: 0.3 });
      }
    };
    const down = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
    const up = () => gsap.to(ring, { scale: 1, duration: 0.2 });
    const leave = () => gsap.to(ring, { autoAlpha: 0, duration: 0.2 });
    const enter = () => gsap.to(ring, { autoAlpha: 1, duration: 0.2 });

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerout', out);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerout', out);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, []);

  if (!on) return null;

  return (
    <div
      ref={ringRef}
      className="pointer-events-none fixed top-0 left-0 z-[120] h-9 w-9 -ml-[18px] -mt-[18px] rounded-full border border-mint/50 mix-blend-difference"
      style={{ willChange: 'transform' }}
    />
  );
}
