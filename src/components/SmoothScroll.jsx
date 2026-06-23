import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, motionOK } from '../lib/gsap';

// Lenis smooth scroll wired into GSAP's ticker so ScrollTrigger stays in sync.
// Disabled under reduced-motion. Paused until the intro loader unlocks the page.
export default function SmoothScroll() {
  useEffect(() => {
    if (!motionOK()) return;

    // Avoid native scroll restoration fighting Lenis on reload (causes desync).
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    if (import.meta.env.DEV) window.__lenis = lenis;

    // Smooth anchor jumps (#chi-sono, #servizi, ...) through Lenis.
    const onClick = (e) => {
      const a = e.target.closest('a[href*="#"]');
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      const el = url.hash && document.querySelector(url.hash);
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -72 }); }
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
