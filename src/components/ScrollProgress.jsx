import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, motionOK } from '../lib/gsap';

// Thin mint progress bar pinned to the top, scaled by overall scroll position.
export default function ScrollProgress() {
  const bar = useRef(null);

  useGSAP(() => {
    if (!motionOK()) return;
    gsap.set(bar.current, { scaleX: 0, transformOrigin: 'left center' });
    gsap.to(bar.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
    });
  }, { scope: bar });

  return (
    <div
      ref={bar}
      className="fixed top-0 left-0 z-[130] h-[2px] w-full bg-mint shadow-[0_0_10px_rgb(var(--mint))]"
      aria-hidden="true"
    />
  );
}
