import React, { useEffect } from 'react';
import { ArrowUpRight, Check, Download } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import useSeo from '../hooks/useSeo';

const ZIP = '/downloads/agente-fascicolo-cliente.zip';

const AgenteFascicolo = () => {
    useSeo({
        path: '/agente-fascicolo',
        title: 'Agente fascicolo cliente, gratis | Maby Prochilo',
        description: 'Scarica l\'agente che prende il materiale sparso di un cliente e ti restituisce lo stato: cosa è deciso, cosa è aperto, cosa scade, di chi è la prossima mossa.',
        jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://mprochilo.it/agente-fascicolo#page',
            name: 'Agente fascicolo cliente, gratis',
            description: 'Un agente Claude che ricostruisce lo stato di un cliente dal materiale sparso: deciso, aperto, scadenze, prossima mossa.',
            url: 'https://mprochilo.it/agente-fascicolo',
            inLanguage: 'it-IT',
            isPartOf: { '@id': 'https://mprochilo.it/#website' },
            author: { '@id': 'https://mprochilo.it/#person' },
        },
    });

    useEffect(() => {
        try {
            localStorage.setItem('mp_lead_source', 'agente-fascicolo');
        } catch (_) {}
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <Navbar />

            {/* HERO */}
            <section className="relative overflow-hidden pt-28 md:pt-32 pb-16 md:pb-24 border-b border-line">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-x-0 top-0 h-[80vh] bg-radial-fade" />

                <div className="relative container-edge">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                        <div className="lg:col-span-7">
                            <div className="flex flex-wrap items-center gap-3 mb-8">
                                <span className="pill"><span className="pill-dot" />Gratis · nessuna mail da lasciare</span>
                                <span className="hidden md:inline-flex pill">
                                    <span className="text-mint">agente</span> · Claude
                                </span>
                            </div>

                            <h1 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tightest text-fg text-balance">
                                L'agente che ti dice <span className="text-mint">a che punto</span> è un cliente, dieci minuti prima della call.
                            </h1>

                            <p className="mt-8 text-mute text-lg md:text-xl leading-relaxed max-w-2xl">
                                Gli dai la roba sparsa, mail esportate, appunti di call, note buttate giù di corsa. Ti restituisce un documento di stato: cosa è deciso, cosa è ancora aperto, cosa scade, e <span className="text-fg">di chi è la prossima mossa</span>. Non è un riassunto. Un riassunto racconta cosa è successo, il fascicolo dice cosa è vero adesso.
                            </p>

                            <ul className="mt-10 space-y-3 max-w-2xl">
                                {[
                                    'Cartella pronta da mettere in Claude Code, o da caricare in un Progetto su Claude',
                                    'Script Python senza dipendenze che ordina il materiale sparso per data',
                                    'Un esempio completo: materiale finto dentro, fascicolo giusto fuori',
                                    'Regola dura contro le invenzioni: quello che non è scritto non esiste, e viene dichiarato come buco',
                                ].map((b) => (
                                    <li key={b} className="flex items-start gap-3 text-fg/90 leading-relaxed">
                                        <span className="mt-1 inline-flex w-5 h-5 shrink-0 rounded-full bg-mint/15 border border-mint/30 items-center justify-center text-mint">
                                            <Check size={12} />
                                        </span>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Download panel */}
                        <div className="lg:col-span-5">
                            <div className="lg:sticky lg:top-24">
                                <div className="panel overflow-hidden shadow-[0_0_60px_-15px_rgb(var(--mint)/0.25)]">
                                    <div className="px-4 py-2.5 border-b border-line bg-elev/40 flex items-center justify-between">
                                        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-mute">
                                            <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_6px_rgb(var(--mint))]" />
                                            download.agente
                                        </div>
                                        <span className="font-mono text-[10px] text-dim">11 kb · .zip</span>
                                    </div>

                                    <div className="p-5 md:p-6">
                                        <div className="font-mono text-sm text-mint mb-5">$ get --agent "fascicolo-cliente"</div>

                                        <a
                                            href={ZIP}
                                            download
                                            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-mint text-bg font-medium text-base px-5 py-3.5 hover:opacity-90 transition-opacity"
                                        >
                                            <Download size={17} /> Scarica l'agente
                                        </a>

                                        <p className="mt-4 text-xs text-mute leading-relaxed">
                                            Nessun form, nessuna mail da lasciare. Dentro c'è un README di tre righe che ti dice dove appoggiarlo.
                                        </p>

                                        <div className="mt-5 pt-5 border-t border-line">
                                            <div className="font-mono text-[11px] uppercase tracking-widest text-dim mb-2">Dentro lo zip</div>
                                            <pre className="font-mono text-[11.5px] leading-relaxed text-mute whitespace-pre overflow-x-auto">{`SKILL.md
scripts/raccogli.py
TEMPLATE-fascicolo.md
esempio/`}</pre>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                    {[
                                        ['4 sezioni', 'nel fascicolo'],
                                        ['~2 min', 'per metterlo'],
                                        ['Zero', 'dipendenze'],
                                    ].map(([k, v]) => (
                                        <div key={k} className="panel p-3">
                                            <div className="font-mono text-mint text-base">{k}</div>
                                            <div className="text-mute text-[11px] mt-1 uppercase tracking-widest">{v}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COSA FA */}
            <section className="bg-surface/40 py-20 md:py-28 border-b border-line">
                <div className="container-edge">
                    <div className="flex items-center gap-3 mb-10">
                        <span className="eyebrow">// Cosa ti restituisce</span>
                        <span className="h-px flex-1 bg-line" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 max-w-5xl">
                        {[
                            { n: '01', t: 'Deciso', d: 'Solo quello che ha un accordo esplicito dietro, con la frase che lo prova e la data. Una proposta senza risposta non è decisa, è aperta.' },
                            { n: '02', t: 'Aperto', d: 'Domande senza risposta e decisioni rimandate. Per ognuna: da quante settimane è ferma, e cosa esattamente la sblocca.' },
                            { n: '03', t: 'Scade', d: 'Tutto quello che ha una data addosso. Anche le date vaghe tipo "entro fine mese", segnate come vaghe invece che sparite.' },
                            { n: '04', t: 'Prossima mossa', d: 'Cosa tocca a te, cosa tocca a loro, e se la palla è ferma in mezzo. Quest\'ultima è quasi sempre il motivo per cui il progetto non avanza.' },
                        ].map((s) => (
                            <article key={s.n} className="panel p-6 md:p-7 hover:border-mint/40 hover:bg-elev transition-colors">
                                <div className="flex items-start justify-between mb-4">
                                    <span className="font-mono text-[11px] text-mint">SEZ.{s.n}</span>
                                </div>
                                <h3 className="font-display font-medium text-xl md:text-2xl text-fg mb-3 tracking-tight">{s.t}</h3>
                                <p className="text-mute leading-relaxed text-sm md:text-base">{s.d}</p>
                            </article>
                        ))}
                    </div>

                    <p className="mt-10 text-mute max-w-3xl leading-relaxed">
                        In fondo al fascicolo c'è la riga dei buchi: cosa non è riuscito a ricostruire e quale file servirebbe. È la parte che si usa di più, perché ti dice dove non ti puoi fidare.
                    </p>
                </div>
            </section>

            {/* CHI SONO */}
            <section className="py-20 md:py-28 border-b border-line">
                <div className="container-edge">
                    <div className="grid lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-3">
                            <span className="eyebrow">// Chi sono</span>
                        </div>
                        <div className="lg:col-span-9 max-w-3xl">
                            <h2 className="font-display font-medium text-3xl md:text-4xl text-fg leading-[1.1] tracking-tightest mb-6">
                                Sono <span className="text-mint">Maby Prochilo</span>, progetto sistemi AI per aziende.
                            </h2>
                            <p className="text-mute text-base md:text-lg leading-relaxed mb-6">
                                Lavoro su marketing e AI automation per freelance, PMI e B2B. Su <strong className="text-fg">Oltre il prompt</strong> pubblico ogni settimana una guida operativa: workflow Claude, automazioni, costi reali. Questo agente è uno dei pezzi che uso davvero, non una demo.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-8">
                                <a href="https://oltreilprompt.substack.com/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                                    Newsletter <ArrowUpRight size={14} />
                                </a>
                                <a href="/ai-nel-tuo-lavoro" className="btn-ghost">
                                    Affiancamento 1:1 <ArrowUpRight size={14} />
                                </a>
                                <a href="https://instagram.com/socialmediamaby" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                                    Instagram <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AgenteFascicolo;
