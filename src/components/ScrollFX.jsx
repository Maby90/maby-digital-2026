import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, SplitText, EASE, motionOK } from '../lib/gsap';

// Reveal system built on IntersectionObserver (not ScrollTrigger once-callbacks),
// so it fires for elements already in view on load, for sections reached via
// anchor jumps, and while scrolling — no blank blocks, ever. Content ships
// visible in CSS; we only hide right before we own the reveal.
//
// Opt in with data-reveal="<variant>", a [data-reveal-group] of [data-reveal-item],
// data-split (heading word reveal), or data-parallax (scrubbed drift).
const FROM = {
  up:    { y: 60, autoAlpha: 0, filter: 'blur(14px)' },
  left:  { x: -80, autoAlpha: 0, filter: 'blur(12px)' },
  right: { x: 80, autoAlpha: 0, filter: 'blur(12px)' },
  scale: { scale: 0.85, autoAlpha: 0, filter: 'blur(16px)' },
  clip:  { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', y: 30 },
  rotate:{ y: 70, rotateX: -55, autoAlpha: 0, filter: 'blur(14px)', transformPerspective: 900 },
};
const TO = { x: 0, y: 0, scale: 1, rotateX: 0, autoAlpha: 1, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)' };

export default function ScrollFX() {
  useGSAP(() => {
    if (!motionOK()) return;

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        obs.unobserve(el);
        const tween = el._fxTween;
        if (tween) tween();
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

    const register = (el, run) => { el._fxTween = run; io.observe(el); };

    // Single elements
    gsap.utils.toArray('[data-reveal]:not([data-reveal-group])').forEach((el) => {
      const v = el.dataset.reveal || 'up';
      gsap.set(el, FROM[v] || FROM.up);
      register(el, () => gsap.to(el, { ...TO, duration: 1.05, ease: EASE, delay: parseFloat(el.dataset.revealDelay || '0') }));
    });

    // Staggered groups
    gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
      const v = group.dataset.reveal || 'up';
      const items = gsap.utils.toArray('[data-reveal-item]', group);
      items.forEach((el) => gsap.set(el, FROM[v] || FROM.up));
      register(group, () => gsap.to(items, { ...TO, duration: 0.95, ease: EASE, stagger: 0.1 }));
    });

    // Split headings: words tip up in 3D
    const splits = [];
    gsap.utils.toArray('[data-split]').forEach((el) => {
      const split = new SplitText(el, { type: 'lines, words', wordsClass: 'fx-word', linesClass: 'fx-line' });
      splits.push(split);
      gsap.set(split.words, { autoAlpha: 0, yPercent: 120, rotateX: -80, transformPerspective: 1000, transformOrigin: 'top center' });
      register(el, () => gsap.to(split.words, { autoAlpha: 1, yPercent: 0, rotateX: 0, duration: 1, ease: EASE, stagger: 0.06 }));
    });

    // Scrubbed parallax (ScrollTrigger is right for continuous scrub)
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || '0.2');
      gsap.fromTo(el, { yPercent: -speed * 100 }, {
        yPercent: speed * 100, ease: 'none',
        scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refresh, 350);
    window.addEventListener('load', refresh);
    window.addEventListener('intro-done', refresh);

    // Safety net: if IO/layout misbehaves (headless, odd viewport), nothing stays
    // hidden. Force-reveal anything still invisible shortly after load.
    const vh = () => window.innerHeight || document.documentElement.clientHeight || 800;
    const inView = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < vh() * 0.95; };
    const sweep = () => {
      const all = [
        ...gsap.utils.toArray('[data-reveal], [data-reveal-item]'),
        ...gsap.utils.toArray('.fx-word'),
      ];
      all.forEach((el) => {
        if (parseFloat(getComputedStyle(el).opacity) < 0.05 && inView(el)) {
          gsap.to(el, { ...TO, yPercent: 0, duration: 0.5, ease: EASE });
        }
      });
    };
    // Safety net: reveal anything in view that IO missed (headless/odd viewport),
    // without pre-revealing below-fold content (keeps the scroll choreography).
    const safety = setTimeout(sweep, 1800);
    window.addEventListener('scroll', sweep, { passive: true });

    return () => {
      clearTimeout(t1); clearTimeout(safety);
      io.disconnect();
      splits.forEach((s) => s.revert());
      window.removeEventListener('load', refresh);
      window.removeEventListener('intro-done', refresh);
      window.removeEventListener('scroll', sweep);
    };
  });

  return null;
}
