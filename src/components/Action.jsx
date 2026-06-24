import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';

const Action = () => {
    return (
        <section className="relative bg-bg py-32 md:py-48 border-t border-line overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-mint-glow" />

            <div className="relative container-edge">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="pill mx-auto mb-10 inline-flex">
                        <span className="pill-dot" />
                        Ready to deploy
                    </span>

                    <h2 className="font-display font-medium text-5xl md:text-7xl lg:text-[88px] leading-[0.98] tracking-tightest text-fg text-balance" data-split>
                        Mettiamo l'AI <span className="text-mint">a lavorare?</span>
                    </h2>

                    <p className="mt-8 text-mute text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-balance" data-reveal>
                        Raccontami dove perdi tempo ogni settimana. Ti dico cosa si può togliere con un agente o un'automazione, e cosa invece conviene lasciare a una persona.
                    </p>

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-3" data-reveal>
                        <Magnetic>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                                className="btn-primary text-base py-4 px-7"
                            >
                                Proponi un progetto <ArrowUpRight size={18} />
                            </button>
                        </Magnetic>
                        <a href="mailto:hello@mprochilo.it" className="btn-ghost text-base py-4 px-7">
                            hello@mprochilo.it
                        </a>
                    </div>

                    <div className="mt-10 font-mono text-[11px] uppercase tracking-widest text-dim">
                        Risposta entro 48h · 1 spot disponibile Q2 2026
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Action;
