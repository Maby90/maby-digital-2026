import React, { useEffect } from 'react';
import { ArrowUpRight, Check, Mail } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import useSeo from '../hooks/useSeo';

const SkillCarosello = () => {
    useSeo({
        path: '/skill-carosello',
        title: 'Skill Claude per caroselli Instagram | Maby Prochilo',
        description: 'Scarica la skill che uso per generare caroselli Instagram in 30 minuti con Claude e Gemini. Senza Canva. 0 abbonamenti.',
        image: 'https://mprochilo.it/og-skill-carosello.png',
        jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://mprochilo.it/skill-carosello#page',
            name: 'Skill Claude per caroselli Instagram, gratis',
            description: 'Scarica la skill Claude che uso per generare caroselli Instagram in 30 minuti, foto incluse, senza Canva.',
            url: 'https://mprochilo.it/skill-carosello',
            inLanguage: 'it-IT',
            isPartOf: { '@id': 'https://mprochilo.it/#website' },
            author: { '@id': 'https://mprochilo.it/#person' },
        },
    });

    useEffect(() => {
        try {
            localStorage.setItem('mp_lead_source', 'skill-carosello');
            localStorage.removeItem('mp_lead_pdf');
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
                        {/* Copy */}
                        <div className="lg:col-span-7">
                            <div className="flex flex-wrap items-center gap-3 mb-8">
                                <span className="pill"><span className="pill-dot" />Lead magnet · gratis</span>
                                <span className="hidden md:inline-flex pill">
                                    <span className="text-mint">v2026.4</span> · skill Claude
                                </span>
                            </div>

                            <h1 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tightest text-fg text-balance">
                                Scarica la skill <span className="text-mint">Claude</span> che uso per generare caroselli Instagram in 30 minuti, foto incluse, senza Canva.
                            </h1>

                            <p className="mt-8 text-mute text-lg md:text-xl leading-relaxed max-w-2xl">
                                Il sistema completo che uso per pubblicare i miei <span className="text-fg">caroselli grunge editorial</span> nel 2026. Skill Claude pronta all'uso, brand kit, prompt Gemini Nano Banana, script Python di composizione. Costo per carosello: <span className="text-mint">30 centesimi</span>.
                            </p>

                            {/* Bullets */}
                            <ul className="mt-10 space-y-3 max-w-2xl">
                                {[
                                    'Skill Claude pronta da scaricare e mettere nel tuo workspace',
                                    'Prompt Gemini Nano Banana che generano foto grunge a tema (0,03€ a foto)',
                                    'Script Python che applica il trattamento grunge e ci sovrappone il testo automaticamente',
                                    'Setup tecnico spiegato passo per passo, font Google gratis inclusi nelle istruzioni',
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

                        {/* Form panel */}
                        <div className="lg:col-span-5">
                            <div className="lg:sticky lg:top-24">
                                <div className="panel overflow-hidden shadow-[0_0_60px_-15px_rgb(var(--mint)/0.25)]">
                                    <div className="px-4 py-2.5 border-b border-line bg-elev/40 flex items-center justify-between">
                                        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-mute">
                                            <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_6px_rgb(var(--mint))]" />
                                            download.skill
                                        </div>
                                        <span className="font-mono text-[10px] text-dim">↵ to send</span>
                                    </div>

                                    <div className="p-5 md:p-6">
                                        <div className="font-mono text-sm text-mint mb-4">$ get --skill "caroselli-claude"</div>

                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-10 h-10 rounded-md bg-mint/15 border border-mint/30 flex items-center justify-center text-mint">
                                                <Mail size={18} />
                                            </div>
                                            <div>
                                                <div className="font-medium text-fg">Iscriviti gratis</div>
                                                <div className="text-mute text-xs">Ti arriva via email tutto il setup</div>
                                            </div>
                                        </div>

                                        {/* Substack official iframe embed */}
                                        <div className="rounded-md overflow-hidden border border-line bg-white">
                                            <iframe
                                                src="https://oltreilprompt.substack.com/embed"
                                                title="Iscriviti a Oltre il prompt"
                                                width="100%"
                                                height="320"
                                                style={{ border: 'none', background: 'white', display: 'block' }}
                                                scrolling="no"
                                            />
                                        </div>

                                        <p className="mt-4 text-xs text-mute leading-relaxed">
                                            Ricevi anche <strong className="text-fg">Oltre il prompt</strong>, la mia newsletter su AI applicata al marketing e all'automazione. Ogni settimana una guida operativa. Disiscriverti da entrambi è un click.
                                        </p>
                                    </div>
                                </div>

                                {/* Trust strip */}
                                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                    {[
                                        ['30¢', 'per carosello'],
                                        ['~30 min', 'di lavoro'],
                                        ['No Canva', 'no plugin'],
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

            {/* SOCIAL PROOF / WHAT YOU GET */}
            <section className="bg-surface/40 py-20 md:py-28 border-b border-line">
                <div className="container-edge">
                    <div className="flex items-center gap-3 mb-10">
                        <span className="eyebrow">// Cosa scarichi</span>
                        <span className="h-px flex-1 bg-line" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 max-w-5xl">
                        {[
                            { n: '01', t: 'Skill Claude', d: 'File `.skill` pronto da caricare nel tuo Claude Cowork. Knowledge base + system prompt già configurati.' },
                            { n: '02', t: 'Prompt Gemini', d: 'Set di prompt Nano Banana per generare le foto grunge editorial coerenti con il tuo brand.' },
                            { n: '03', t: 'Script Python', d: 'Composizione automatica: filtro grunge + overlay testo. Eseguibile localmente o in colab.' },
                            { n: '04', t: 'Setup guide', d: 'PDF con tutti i passi, font Google gratis suggeriti, troubleshooting comuni.' },
                        ].map((s) => (
                            <article key={s.n} className="panel p-6 md:p-7 hover:border-mint/40 hover:bg-elev transition-colors group">
                                <div className="flex items-start justify-between mb-4">
                                    <span className="font-mono text-[11px] text-mint">FILE.{s.n}</span>
                                    <span className="font-mono text-[10px] text-dim">.zip</span>
                                </div>
                                <h3 className="font-display font-medium text-xl md:text-2xl text-fg mb-3 tracking-tight">{s.t}</h3>
                                <p className="text-mute leading-relaxed text-sm md:text-base">{s.d}</p>
                            </article>
                        ))}
                    </div>
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
                                Sono <span className="text-mint">Maby Prochilo</span>, digital strategist a Firenze.
                            </h2>
                            <p className="text-mute text-base md:text-lg leading-relaxed mb-6">
                                Lavoro su marketing e AI automation per freelance, PMI e B2B. Su <strong className="text-fg">Oltre il prompt</strong> pubblico ogni settimana una guida operativa: workflow Claude, automazioni n8n, prompt che funzionano, costi reali. Niente curiosity-driven, niente news, niente motivazionale.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-8">
                                <a href="https://oltreilprompt.substack.com/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                                    Newsletter <ArrowUpRight size={14} />
                                </a>
                                <a href="https://instagram.com/socialmediamaby" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                                    Instagram <ArrowUpRight size={14} />
                                </a>
                                <a href="https://mprochilo.it" className="btn-ghost">
                                    Sito <ArrowUpRight size={14} />
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

export default SkillCarosello;
