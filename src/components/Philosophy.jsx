import React from 'react';

const Philosophy = () => {
    return (
        <section className="relative bg-bg py-32 md:py-48 border-t border-line overflow-hidden">
            {/* Subtle grid */}
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 bg-mint-glow" />
            {/* Scan line accent */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-mint/20 to-transparent" />

            <div className="relative container-edge">
                <div className="max-w-5xl">
                    <div className="flex items-center gap-3 mb-10">
                        <span className="eyebrow text-mint">// 03 · Tesi</span>
                        <span className="h-px flex-1 bg-line" />
                    </div>

                    <p className="text-mute text-base md:text-lg leading-relaxed max-w-2xl mb-10 font-mono" data-reveal>
                        Molti vendono l'AI come moda:<br/>
                        <span className="text-fg">chatbot che fingono di essere persone, demo che non reggono la produzione.</span>
                    </p>

                    <h2 className="font-display font-medium text-4xl md:text-6xl lg:text-7xl xl:text-[88px] leading-[1.02] tracking-tightest text-fg text-balance" data-split>
                        Io costruisco AI che lavora nel <span className="text-mint">backend.</span>
                    </h2>

                    {/* Principles */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl" data-reveal-group data-reveal="scale">
                        {[
                            ['P.01', 'Competenza prima dello strumento', 'L\'AI la amplifica, non la sostituisce.'],
                            ['P.02', 'AI nel backend', 'Non in vetrina. Lavora, non recita.'],
                            ['P.03', 'Sistemi che restano tuoi', 'Con documentazione e controllo.'],
                        ].map(([k, t, sub]) => (
                            <div key={k} className="panel p-5" data-reveal-item>
                                <div className="font-mono text-[11px] text-mint mb-3">{k}</div>
                                <div className="text-fg font-medium text-base mb-1">{t}</div>
                                <div className="text-mute text-sm">{sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
