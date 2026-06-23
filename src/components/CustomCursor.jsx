import React, { useEffect, useRef, useState } from 'react';
import { gsap, heavyFX } from '../lib/gsap';

// A trailing mint cursor: a small solid dot tracks the pointer 1:1 while a larger
// ring eases behind it and swells over interactive elements. Disabled on touch
// and reduced-motion; the system cursor stays hidden only while this is active.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!heavyFX()) return;
    setOn(true);
    document.documentElement.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

    const move = (e) => {
      xDot(e.clientX); yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
    };

    const interactive = 'a, button, [data-cursor], input, textarea, [role="button"]';
    const over = (e) => {
      if (e.target.closest(interactive)) {
        gsap.to(ring, { scale: 1.9, borderColor: 'rgb(var(--mint))', backgroundColor: 'rgb(var(--mint) / 0.08)', duration: 0.3 });
        gsap.to(dot, { scale: 0.4, duration: 0.3 });
      }
    };
    const out = (e) => {
      if (e.target.closest(interactive)) {
        gsap.to(ring, { scale: 1, borderColor: 'rgb(var(--mint) / 0.5)', backgroundColor: 'transparent', duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };
    const down = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
    const up = () => gsap.to(ring, { scale: 1, duration: 0.2 });
    const leave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    const enter = () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerout', out);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
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
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[120] h-8 w-8 -ml-4 -mt-4 rounded-full border border-mint/50"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[120] h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-mint"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
