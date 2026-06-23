import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, SplitText, EASE, motionOK } from '../lib/gsap';

// Document-wide reveal pass. Robust by design:
// - Content ships VISIBLE in the DOM/CSS. We only hide an element right before we
//   own its reveal, and we guarantee it ends visible (onLeaveBack/refresh/safety).
// - A safety timer forces anything still hidden back to visible, so a missed
//   trigger (intro lock, layout shift, pinned sections) never ships a blank block.
//
// Opt in with data-reveal="<variant>" or a [data-reveal-group] of [data-reveal-item].
// Variants: up (default), left, right, scale, clip, rotate.
const FROM = {
  up:    { y: 60, autoAlpha: 0, filter: 'blur(14px)' },
  left:  { x: -80, autoAlpha: 0, filter: 'blur(12px)' },
  right: { x: 80, autoAlpha: 0, filter: 'blur(12px)' },
  scale: { scale: 0.85, autoAlpha: 0, filter: 'blur(16px)' },
  clip:  { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', y: 30 },
  rotate:{ y: 70, rotateX: -55, autoAlpha: 0, filter: 'blur(14px)', transformPerspective: 900 },
};

export default function ScrollFX() {
  useGSAP(() => {
    if (!motionOK()) return;

    const built = [];

    const build = (el, variant, { delay = 0, dur = 1.1 } = {}) => {
      const from = FROM[variant] || FROM.up;
      gsap.set(el, from);
      const to = { x: 0, y: 0, scale: 1, rotateX: 0, autoAlpha: 1, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)', duration: dur, delay, ease: EASE };
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => gsap.to(el, to),
      });
      built.push({ el });
      return st;
    };

    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      build(el, el.dataset.reveal || 'up', { delay: parseFloat(el.dataset.revealDelay || '0') });
    });

    gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
      const variant = group.dataset.reveal || 'up';
      const items = gsap.utils.toArray('[data-reveal-item]', group);
      items.forEach((el) => gsap.set(el, FROM[variant] || FROM.up));
      ScrollTrigger.create({
        trigger: group,
        start: 'top 84%',
        once: true,
        onEnter: () => gsap.to(items, {
          x: 0, y: 0, scale: 1, rotateX: 0, autoAlpha: 1, filter: 'blur(0px)',
          duration: 0.95, ease: EASE, stagger: 0.1,
        }),
      });
      items.forEach((el) => built.push({ el }));
    });

    // Big headings: split into words and reveal with a 3D tip-up stagger.
    const splits = [];
    gsap.utils.toArray('[data-split]').forEach((el) => {
      const split = new SplitText(el, { type: 'lines, words', wordsClass: 'fx-word', linesClass: 'fx-line' });
      splits.push(split);
      gsap.set(split.words, { autoAlpha: 0, yPercent: 120, rotateX: -80, transformPerspective: 1000, transformOrigin: 'top center' });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        once: true,
        onEnter: () => gsap.to(split.words, {
          autoAlpha: 1, yPercent: 0, rotateX: 0,
          duration: 1, ease: EASE, stagger: 0.06,
        }),
      });
      built.push({ el });
    });

    // Scrubbed parallax: elements drift as the section scrolls through view.
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || '0.2');
      gsap.fromTo(el, { yPercent: -speed * 100 }, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
    });

    // Refresh once layout settles, and again when the intro unlocks scroll.
    const refresh = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refresh, 350);
    window.addEventListener('load', refresh);
    window.addEventListener('intro-done', refresh);

    // Safety net: nothing stays invisible. If a trigger never fired, force-show.
    const safety = setTimeout(() => {
      built.forEach(({ el }) => {
        if (parseFloat(getComputedStyle(el).opacity) < 0.05) gsap.set(el, { clearProps: 'all' });
      });
      gsap.utils.toArray('.fx-word').forEach((w) => {
        if (parseFloat(getComputedStyle(w).opacity) < 0.05) gsap.to(w, { autoAlpha: 1, yPercent: 0, rotateX: 0, duration: 0.4 });
      });
      ScrollTrigger.refresh();
    }, 5000);

    return () => {
      clearTimeout(t1); clearTimeout(safety);
      window.removeEventListener('load', refresh);
      window.removeEventListener('intro-done', refresh);
    };
  });

  return null;
}
