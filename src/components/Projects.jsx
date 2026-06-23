import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, motionOK, isTouch } from '../lib/gsap';

const projects = [
  {
    name: 'useskill.it',
    kind: 'Prodotto',
    desc: 'Store di skill AI pronte all\'uso: set di istruzioni e knowledge base riutilizzabili per Claude, usabili anche da chi non scrive codice.',
    tags: ['Claude skills', 'E-commerce', 'Self-serve'],
    href: 'https://useskill.it',
    external: true,
  },
  {
    name: 'getbusinessbrain.it',
    kind: 'Sistema B2B',
    desc: 'Il cervello AI dell\'azienda: knowledge base viva e assistente interno che risponde su processi, clienti e documenti. Servizio ricorrente.',
    tags: ['Knowledge base', 'Agenti', 'Retainer'],
    href: 'https://getbusinessbrain.it',
    external: true,
  },
  {
    name: 'LearnCast',
    kind: 'App iOS',
    desc: 'Trasforma articoli e PDF in episodi podcast a due voci. Progettata e pubblicata da sola sull\'App Store.',
    tags: ['Swift', 'TTS', 'App Store'],
    href: 'https://apps.apple.com/it/app/learncast/id6739044841',
    external: true,
  },
  {
    name: 'Oltre il prompt',
    kind: 'Newsletter',
    desc: 'Ogni settimana, AI applicata al lavoro reale: guide pratiche, workflow, casi concreti. Niente hype, codice e processi che funzionano.',
    tags: ['Substack', 'AI applicata', 'Settimanale'],
    href: '/newsletter',
    external: false,
  },
];

function tiltHandlers(el) {
  const move = (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: px * 10, rotateX: -py * 10, duration: 0.4, ease: 'power3.out', transformPerspective: 800 });
  };
  const reset = () => gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerleave', reset);
  return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset); };
}

const Card = ({ p }) => {
  const ref = useRef(null);
  useGSAP(() => {
    if (!motionOK() || isTouch()) return;
    return tiltHandlers(ref.current);
  }, { scope: ref });

  const Wrap = p.external ? 'a' : 'a';
  return (
    <Wrap
      ref={ref}
      href={p.href}
      {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-cursor
      className="project-card group relative flex w-[85vw] sm:w-[440px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-7 md:p-8 transition-colors hover:border-mint/40"
      style={{ transformStyle: 'preserve-3d', minHeight: '340px' }}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-mint/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div>
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-widest text-mint">{p.kind}</span>
          <ArrowUpRight size={18} className="text-mute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint" />
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-fg">{p.name}</h3>
        <p className="mt-4 text-mute leading-relaxed">{p.desc}</p>
      </div>
      <div className="mt-7 flex flex-wrap gap-2 border-t border-line pt-5">
        {p.tags.map((t) => (
          <span key={t} className="rounded border border-line bg-bg/40 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-mute">
            {t}
          </span>
        ))}
      </div>
    </Wrap>
  );
};

export default function Projects() {
  const section = useRef(null);
  const track = useRef(null);

  useGSAP(() => {
    if (!motionOK() || isTouch()) return;
    const trackEl = track.current;
    const cards = gsap.utils.toArray('.project-card', trackEl);
    if (cards.length < 2) return;

    const getScroll = () => trackEl.scrollWidth - trackEl.clientWidth;
    if (getScroll() <= 0) return;

    gsap.to(trackEl, {
      x: () => -getScroll(),
      ease: 'none',
      scrollTrigger: {
        trigger: section.current,
        start: 'top top',
        end: () => `+=${getScroll()}`,
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: section });

  return (
    <section id="progetti" ref={section} className="relative border-t border-line bg-bg py-24 md:py-0 md:h-screen md:flex md:flex-col md:justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container-edge relative">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow text-mint">Progetti</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-medium tracking-tightest text-fg text-balance">
              Cose che ho <span className="text-mint">costruito.</span>
            </h2>
          </div>
          <span className="hidden md:block font-mono text-[11px] text-dim">scorri →</span>
        </div>
      </div>

      <div
        ref={track}
        className="relative flex gap-5 px-5 md:px-8 lg:px-12 overflow-x-auto md:overflow-visible snap-x md:snap-none pb-4 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{ willChange: 'transform' }}
      >
        {projects.map((p) => (
          <div key={p.name} className="snap-start" style={{ transformStyle: 'preserve-3d' }}>
            <Card p={p} />
          </div>
        ))}
        {/* trailing spacer so last card can reach center on pinned scroll */}
        <div className="hidden md:block shrink-0 w-[20vw]" aria-hidden="true" />
      </div>
    </section>
  );
}
