import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, motionOK } from '../lib/gsap';

// First-load reveal: a full-screen panel with the "m" mark and a drawing line,
// then a mask-wipe up that uncovers the page. Runs once per session; skipped
// entirely under reduced-motion (page is shown immediately).
export default function IntroLoader() {
  const seen = typeof window !== 'undefined' && sessionStorage.getItem('intro-seen');
  const [done, setDone] = useState(Boolean(seen) || !motionOK());
  const root = useRef(null);

  useGSAP(() => {
    if (done) return;
    document.body.style.overflow = 'hidden';
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        sessionStorage.setItem('intro-seen', '1');
        setDone(true);
      },
    });
    tl.set('.intro-line', { scaleX: 0, transformOrigin: 'left center' })
      .from('.intro-mark', { autoAlpha: 0, y: 18, filter: 'blur(12px)', duration: 0.8, ease: 'expo.out' })
      .from('.intro-word', { autoAlpha: 0, y: 12, duration: 0.6, ease: 'expo.out', stagger: 0.04 }, '-=0.4')
      .to('.intro-line', { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, '-=0.3')
      .to('.intro-content', { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, '+=0.25')
      .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.1');
  }, { scope: root, dependencies: [done] });

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
      aria-hidden="true"
    >
      <div className="intro-content flex flex-col items-center gap-5">
        <div className="intro-mark flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-lg border border-mint/30 bg-mint/15 font-mono text-2xl font-bold text-mint">
            m
          </span>
          <span className="font-display text-2xl font-medium tracking-tightest text-fg">
            {'Maby Prochilo'.split('').map((c, i) => (
              <span key={i} className="intro-word inline-block">{c === ' ' ? ' ' : c}</span>
            ))}
          </span>
        </div>
        <div className="intro-line h-px w-48 bg-gradient-to-r from-mint/60 to-transparent" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-dim">sistemi ai · firenze</span>
      </div>
    </div>
  );
}
