import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, EASE, motionOK } from '../lib/gsap';

const protocols = [
    {
        n: '01',
        t: 'Audit e mappatura',
        d: 'Guardo come lavori davvero: dove si perde tempo, quali task sono ripetuti, dove l\'AI ha senso e dove no. Niente AI per moda, solo dove libera ore vere.',
        out: ['process_map.md', 'bottlenecks.md', 'ai_opportunities.md'],
    },
    {
        n: '02',
        t: 'Progettazione del sistema',
        d: 'Disegno e costruisco la soluzione: agenti, automazioni e skill su Claude Code, con la persona sempre come punto di controllo. Iterazione su casi reali, non demo.',
        out: ['custom_agents/*', 'workflows.n8n', 'knowledge_base.notion'],
    },
    {
        n: '03',
        t: 'Integrazione e handoff',
        d: 'Il sistema entra nei tuoi strumenti e il team impara a usarlo. Ti lascio documentazione e controllo, così resta tuo anche quando io non ci sono.',
        out: ['handoff_docs.md', 'team_training.pdf', 'maintenance_plan.md'],
    },
];

const Protocol = () => {
    const root = useRef(null);

    useGSAP(() => {
        if (!motionOK()) return;
        const root_ = root.current;

        gsap.from('.proto-head', {
            autoAlpha: 0, y: 28, filter: 'blur(10px)', duration: 1, ease: EASE,
            scrollTrigger: { trigger: root_, start: 'top 80%', once: true },
        });

        gsap.utils.toArray('.proto-step', root_).forEach((el, i) => {
            gsap.from(el, {
                autoAlpha: 0, x: i % 2 === 0 ? -70 : 70, y: 30, filter: 'blur(12px)', duration: 1, ease: EASE,
                scrollTrigger: { trigger: el, start: 'top 84%', once: true },
            });
        });

        // progress line draws as you scroll the section
        const line = root_.querySelector('.proto-progress');
        if (line) {
            gsap.fromTo(line, { scaleY: 0 }, {
                scaleY: 1, transformOrigin: 'top center', ease: 'none',
                scrollTrigger: { trigger: '.proto-list', start: 'top 70%', end: 'bottom 70%', scrub: 0.6 },
            });
        }
    }, { scope: root });

    return (
        <section id="metodo" ref={root} className="relative bg-surface/40 py-24 md:py-32 border-t border-line">
            <div className="container-edge">
                <div className="proto-head flex items-center gap-3 mb-10">
                    <span className="eyebrow">// 04 · Metodo</span>
                    <span className="h-px flex-1 bg-line" />
                    <span className="font-mono text-[11px] text-dim">dall'audit all'handoff</span>
                </div>

                <h2 className="proto-head font-display font-medium text-3xl md:text-5xl lg:text-6xl text-fg leading-[1.05] tracking-tightest mb-16 max-w-3xl text-balance">
                    Tre fasi, un <span className="text-mint">sistema che resta tuo.</span>
                </h2>

                <ol className="proto-list relative">
                    {/* Vertical connector + animated progress overlay */}
                    <div className="absolute left-5 md:left-7 top-0 bottom-0 w-px bg-line" />
                    <div className="proto-progress absolute left-5 md:left-7 top-0 bottom-0 w-px bg-mint shadow-[0_0_10px_rgb(var(--mint))]" />

                    {protocols.map((p) => (
                        <li key={p.n} className="proto-step relative pl-14 md:pl-20 pb-10 md:pb-14 last:pb-0">
                            <div className="absolute left-0 top-0 w-10 md:w-14 h-10 md:h-14 rounded-md bg-elev border border-line2 flex items-center justify-center font-mono text-mint text-sm md:text-base">
                                {p.n}
                            </div>

                            <div className="grid lg:grid-cols-12 gap-8 panel p-6 md:p-8 hover:border-mint/30 transition-colors" data-cursor>
                                <div className="lg:col-span-7">
                                    <h3 className="font-display font-medium text-2xl md:text-3xl text-fg mb-3 tracking-tight">
                                        {p.t}
                                    </h3>
                                    <p className="text-mute leading-relaxed">{p.d}</p>
                                </div>
                                <div className="lg:col-span-5">
                                    <div className="font-mono text-[11px] uppercase tracking-widest text-dim mb-3">$ ls deliverables/</div>
                                    <ul className="space-y-2">
                                        {p.out.map(f => (
                                            <li key={f} className="font-mono text-sm text-mute flex items-center gap-2">
                                                <span className="text-mint">→</span>
                                                <span className="text-fg/80">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default Protocol;
