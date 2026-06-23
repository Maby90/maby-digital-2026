import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, EASE, motionOK } from '../lib/gsap';

// Document-wide reveal pass. Elements opt in with [data-reveal] (single) or
// [data-reveal-group] containing [data-reveal-item] children (staggered).
// Content ships fully visible; this only adds an entrance when motion is allowed.
export default function ScrollFX() {
  useGSAP(() => {
    if (!motionOK()) return;

    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0,
        y: 34,
        filter: 'blur(14px)',
        duration: 1.05,
        ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      });
    });

    gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
      const items = gsap.utils.toArray('[data-reveal-item]', group);
      gsap.from(items, {
        autoAlpha: 0,
        y: 28,
        filter: 'blur(10px)',
        duration: 0.9,
        ease: EASE,
        stagger: 0.09,
        scrollTrigger: { trigger: group, start: 'top 84%', once: true },
      });
    });

    // refresh after fonts/layout settle so triggers measure correctly
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  });

  return null;
}
