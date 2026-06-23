import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, heavyFX } from '../lib/gsap';

// Wraps a child so it drifts toward the pointer while hovered, then springs back.
// No-op under reduced-motion / touch. Renders a plain inline-flex span so it can
// wrap buttons and links without changing layout.
export default function Magnetic({ children, strength = 0.4, className = '' }) {
  const ref = useRef(null);

  useGSAP(() => {
    if (!heavyFX()) return;
    const el = ref.current;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.5)' });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const reset = () => { xTo(0); yTo(0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset); };
  }, { scope: ref });

  return (
    <span ref={ref} className={`inline-flex ${className}`} style={{ willChange: 'transform' }}>
      {children}
    </span>
  );
}
