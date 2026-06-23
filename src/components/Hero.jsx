import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, SplitText, EASE, motionOK } from '../lib/gsap';
import PromptBox from './PromptBox';
import HeroBackdrop from './HeroBackdrop';
import Magnetic from './Magnetic';

const stats = [
    ['7', '+', 'anni nel digitale'],
    ['100', '%', 'controllo umano'],
    ['3', '', 'sistemi: agenti · flussi · skill'],
    ['48', 'h', 'tempo di risposta'],
];

const Hero = () => {
    const root = useRef(null);

    useGSAP(() => {
        if (!motionOK()) return;

        const split = new SplitText('.hero-title', { type: 'chars, words', charsClass: 'hero-char', wordsClass: 'hero-word' });
        const tl = gsap.timeline({ delay: 0.15 });
        tl.from('.hero-pill', { autoAlpha: 0, y: 12, duration: 0.6, ease: EASE })
          .from(split.chars, {
              autoAlpha: 0,
              yPercent: 110,
              filter: 'blur(12px)',
              rotateX: -40,
              stagger: 0.018,
              duration: 0.9,
              ease: EASE,
          }, '-=0.2')
          .from('.hero-sub', { autoAlpha: 0, y: 18, filter: 'blur(8px)', duration: 0.8, ease: EASE }, '-=0.5')
          .from('.hero-cta', { autoAlpha: 0, y: 14, duration: 0.7, ease: EASE, stagger: 0.08 }, '-=0.4')
          .from('.hero-demo', { autoAlpha: 0, y: 24, filter: 'blur(10px)', duration: 1, ease: EASE }, '-=0.7')
          .from('.hero-stat', { autoAlpha: 0, y: 16, duration: 0.6, ease: EASE, stagger: 0.07 }, '-=0.5');

        // count-up numbers
        gsap.utils.toArray('.hero-num').forEach((el) => {
            const end = parseFloat(el.dataset.count);
            const obj = { v: 0 };
            gsap.to(obj, {
                v: end,
                duration: 1.4,
                ease: 'power2.out',
                delay: 0.7,
                onUpdate: () => { el.textContent = Math.round(obj.v); },
            });
        });

        // Scroll-out: hero content lifts and fades as you leave it (depth).
        gsap.to('.hero-copy', {
            yPercent: -18, autoAlpha: 0, ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.5 },
        });
        gsap.to('.hero-demo', {
            yPercent: 12, ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.5 },
        });

        return () => split.revert();
    }, { scope: root });

    return (
        <section ref={root} className="relative overflow-hidden bg-bg pt-24 md:pt-28 pb-20 md:pb-28">
            <HeroBackdrop />

            <div className="relative container-edge">
                <div className="hero-pill flex items-center gap-3 mb-10">
                    <span className="pill" data-cursor>
                        <span className="pill-dot" />
                        Disponibile · 2 progetti Q3 2026
                    </span>
                    <span className="hidden sm:inline-flex pill">
                        <span className="text-mint">v2026.6</span>
                        <span className="text-mute">/ sistemi ai</span>
                    </span>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    <div className="hero-copy lg:col-span-7">
                        <h1 className="hero-title font-display font-medium text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.98] tracking-tightest text-fg text-balance">
                            Sistemi AI che lavorano <span className="text-mint">per la tua azienda.</span>
                        </h1>

                        <p className="hero-sub mt-8 text-mute text-lg md:text-xl leading-relaxed max-w-xl">
                            Sono <span className="text-fg">Maby Prochilo</span>. Progetto e installo agenti, automazioni e skill su Claude Code che tolgono lavoro ripetitivo a freelance, PMI e team B2B. Con un occhio al marketing, così i sistemi servono davvero a vendere e comunicare.
                        </p>
                        <p className="hero-sub mt-3 text-mute text-sm leading-relaxed max-w-xl">
                            Ogni settimana scrivo <Link to="/newsletter" className="text-fg hover:text-mint underline underline-offset-4 decoration-mint/30 hover:decoration-mint">Oltre il prompt</Link>, una newsletter su AI applicata al lavoro reale.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-3">
                            <Magnetic>
                                <button
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                                    className="hero-cta btn-primary"
                                >
                                    Proponi un progetto <ArrowUpRight size={16} />
                                </button>
                            </Magnetic>
                            <a href="#metodo" className="hero-cta btn-ghost">
                                Come lavoro
                            </a>
                        </div>

                        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-6 border-t border-line pt-8">
                            {stats.map(([num, suffix, label]) => (
                                <div key={label} className="hero-stat">
                                    <div className="font-mono text-mint text-lg tracking-tight">
                                        <span className="hero-num" data-count={num}>{num}</span>{suffix}
                                    </div>
                                    <div className="text-mute text-xs mt-1 leading-snug">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="hero-demo lg:sticky lg:top-24">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="eyebrow">Live demo · prova subito</span>
                                <span className="font-mono text-[10px] text-dim">↵ enter to run</span>
                            </div>
                            <PromptBox />
                            <p className="mt-3 text-xs text-dim font-mono">
                                Demo simulata · risposte preimpostate per mostrare l'approccio
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
