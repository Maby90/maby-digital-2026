import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, motionOK, isTouch } from '../lib/gsap';

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
    href: 'https://apps.apple.com/it/search?term=learncast',
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

const Card = ({ p }) => {
  const ref = useRef(null);

  useGSAP(() => {
    if (!motionOK() || isTouch()) return;
    const el = ref.current;
    const inner = el.querySelector('.card-inner');
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(inner, { rotateY: px * 8, rotateX: -py * 8, duration: 0.4, ease: 'power3.out', transformPerspective: 900 });
    };
    const reset = () => gsap.to(inner, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset); };
  }, { scope: ref });

  return (
    <a
      ref={ref}
      href={p.href}
      {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-reveal-item
      className="group block cursor-pointer rounded-2xl"
      style={{ perspective: '900px' }}
    >
      <div
        className="card-inner relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-7 md:p-8 transition-colors duration-300 group-hover:border-mint/50"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-mint/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div>
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-widest text-mint">{p.kind}</span>
            <ArrowUpRight size={20} className="text-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint" />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-fg group-hover:text-mint transition-colors">{p.name}</h3>
          <p className="mt-4 text-mute leading-relaxed">{p.desc}</p>
        </div>
        <div className="mt-7 flex flex-wrap gap-2 border-t border-line pt-5">
          {p.tags.map((t) => (
            <span key={t} className="rounded border border-line bg-bg/40 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-mute">
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default function Projects() {
  return (
    <section id="progetti" className="relative border-t border-line bg-bg py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="container-edge relative">
        <div className="mb-12 md:mb-16">
          <span className="eyebrow text-mint">Side project</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-medium tracking-tightest text-fg text-balance" data-split>
            Quello che porto <span className="text-mint">avanti io.</span>
          </h2>
          <p className="mt-4 max-w-md text-mute text-sm md:text-base leading-relaxed" data-reveal>
            Prodotti e business che ho costruito e mando avanti in parallelo. Clicca per aprirli.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" data-reveal-group data-reveal="scale">
          {projects.map((p) => (
            <Card key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
