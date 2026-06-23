import React from 'react';

const About = () => {
    return (
        <section id="chi-sono" className="relative bg-surface/40 py-24 md:py-32 border-t border-line">
            <div className="container-edge">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
                    {/* Sidebar / dossier */}
                    <aside className="lg:col-span-4">
                        <div className="lg:sticky lg:top-24">
                            <div className="panel overflow-hidden">
                                <div className="aspect-[4/5] w-full overflow-hidden bg-elev">
                                    <img
                                        src="/maby-profile.jpg"
                                        alt="Maby Prochilo, progetta sistemi AI per aziende"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-4 border-t border-line bg-elev/40 flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-fg text-sm">Maby Prochilo</div>
                                        <div className="font-mono text-[11px] text-mute">Sistemi AI · Agenti</div>
                                    </div>
                                    <span className="pill"><span className="pill-dot" />Online</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="eyebrow">// 01 · Chi sono</span>
                            <span className="h-px flex-1 bg-line" />
                        </div>

                        <h2 className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-fg leading-[1.05] tracking-tightest text-balance" data-split>
                            Progetto sistemi AI, <span className="text-mint">non vetrine</span>
                        </h2>

                        <div className="mt-10 space-y-6 text-mute text-base md:text-lg leading-relaxed max-w-prose">
                            <p data-reveal>
                                <strong className="text-fg font-medium">Maby Prochilo progetta e installa sistemi AI per aziende</strong>: agenti, automazioni e skill su Claude Code per freelance, PMI e team B2B. L'AI sta nel backend e lavora dentro i processi reali, non è un chatbot da vetrina. La competenza viene prima dello strumento: l'AI la amplifica, non la sostituisce.
                            </p>
                            <p data-reveal>
                                Per anni ho disegnato case e studiato architettura, ma i confini fisici dei muri mi stavano stretti. Ho portato quella passione per la progettazione nel digitale, con più libertà e dinamismo. Invece di edifici, oggi progetto sistemi: pezzi che si parlano, reggono il carico e si possono cambiare senza rompere tutto.
                            </p>
                            <p data-reveal>
                                Il marketing resta nel mio lavoro, ma come contesto, non come slogan. Lo uso per capire cosa serve davvero a chi compra e a chi vende, così i sistemi AI che costruisco servono a risultati concreti e non a vanity metrics. Niente urlato, niente finzione.
                            </p>
                            <p data-reveal>
                                Costruisco anche prodotti miei: ho programmato e pubblicato da sola sull'App Store <em className="text-fg not-italic">LearnCast</em>, che trasforma articoli e PDF in podcast a due voci, e mando ogni settimana <em className="text-fg not-italic">Oltre il prompt</em>, la newsletter su AI applicata al lavoro reale. Non eroga consulenze standard: progetto interi sistemi orientati a scalabilità e valore.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4" data-reveal-group data-reveal="rotate">
                            {[
                                ['Agenti', 'AI che esegue task reali'],
                                ['Flussi', 'Automazioni che girano da sole'],
                                ['Claude Code', 'Skill e knowledge base'],
                                ['Marketing', 'Il contesto che fa vendere'],
                            ].map(([k, v]) => (
                                <div key={k} className="panel p-4" data-reveal-item>
                                    <div className="font-mono text-mint text-base">{k}</div>
                                    <div className="text-mute text-xs mt-2 leading-snug">{v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
