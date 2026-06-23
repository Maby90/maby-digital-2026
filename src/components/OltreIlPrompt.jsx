import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowUpRight, Mail, Gift, RefreshCw } from 'lucide-react';
import useSeo from '../hooks/useSeo';

const substackUrl = 'https://oltreilprompt.substack.com/';
const subscribeUrl = 'https://oltreilprompt.substack.com/subscribe';

const fallbackIssues = [
    { id: 'f1', date: '2026-04-24', title: 'Come faccio foto iperrealistiche con Nano Banana Pro', description: 'Guida lunga, con prompt incluso.', link: substackUrl },
    { id: 'f2', date: '2026-04-17', title: 'Quanto guadagna il Papa?', description: 'Guida gratuita su come faccio un report di mercato ogni due giorni con Claude.', link: substackUrl },
    { id: 'f3', date: '2026-04-13', title: 'Come realizzo i caroselli Instagram con Claude', description: 'Workflow intero, grafica compresa, senza aprire Canva.', link: substackUrl },
];

function formatDate(iso) {
    if (!iso) return '';
    try {
        return new Date(iso).toLocaleDateString('it-IT', { year: 'numeric', month: 'short', day: '2-digit' });
    } catch {
        return '';
    }
}

const OltreIlPrompt = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useSeo({
        path: '/newsletter',
        title: 'Oltre il prompt · Newsletter su AI e comunicazione · Maby Prochilo',
        description: 'Comunicazione, intelligenza artificiale e le cose che succedono quando le usi insieme. Workflow reali, prompt inclusi. Skill brand voice extractor in regalo per chi si iscrive.',
        type: 'website',
        jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': 'https://mprochilo.it/newsletter#blog',
            name: 'Oltre il prompt.',
            description: 'Comunicazione, intelligenza artificiale e le cose che succedono quando le usi insieme.',
            url: 'https://mprochilo.it/newsletter',
            inLanguage: 'it-IT',
            author: { '@id': 'https://mprochilo.it/#person' },
            publisher: { '@id': 'https://mprochilo.it/#person' },
            sameAs: 'https://oltreilprompt.substack.com/',
            keywords: 'newsletter ai italia, claude marketing, prompt engineering, ai applicata, oltre il prompt',
        },
    });

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const res = await fetch('/api/newsletter');
                if (!res.ok) throw new Error(`Feed responded ${res.status}`);
                const data = await res.json();
                if (cancelled) return;
                setItems(Array.isArray(data.items) && data.items.length ? data.items : fallbackIssues);
            } catch (err) {
                if (cancelled) return;
                console.error(err);
                if (import.meta.env.DEV) {
                    setItems(fallbackIssues);
                } else {
                    setError(err.message);
                    setItems(fallbackIssues);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <Navbar />

            {/* HERO */}
            <section className="relative overflow-hidden pt-28 md:pt-32 pb-24 md:pb-32 border-b border-line">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-x-0 top-0 h-[80vh] bg-radial-fade" />

                <div className="relative container-edge">
                    <div className="flex flex-wrap items-center gap-3 mb-10">
                        <span className="pill"><span className="pill-dot" />Newsletter · Substack</span>
                        <span className="hidden md:inline-flex pill">
                            <Gift size={11} className="text-mint" />
                            Skill brand voice extractor in regalo
                        </span>
                    </div>

                    <h1 className="font-display font-medium text-6xl sm:text-7xl md:text-[140px] lg:text-[200px] leading-[0.9] tracking-tightest text-fg">
                        Oltre il<br/>
                        <span className="text-mint">prompt<span className="text-fg">.</span></span>
                    </h1>

                    <div className="mt-12 max-w-3xl">
                        <p className="text-fg text-xl md:text-2xl leading-relaxed font-medium tracking-tight">
                            Comunicazione, intelligenza artificiale e le cose che succedono quando le usi insieme.
                        </p>
                        <p className="mt-6 text-mute text-base md:text-lg leading-relaxed max-w-2xl">
                            La guida lunga a Claude Cowork e Code per chi non scrive codice. Con la skill brand voice extractor in regalo.
                        </p>
                    </div>

                    <div className="mt-12 panel max-w-2xl overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-line bg-elev/40 flex items-center justify-between">
                            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-mute">
                                <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_6px_rgb(var(--mint))]" />
                                subscribe.sh
                            </div>
                            <span className="font-mono text-[10px] text-dim">↵ to send</span>
                        </div>
                        <div className="p-4 md:p-5 space-y-3">
                            <div className="font-mono text-sm text-mint">$ subscribe --to "oltre-il-prompt"</div>
                            <a
                                href={subscribeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary w-full justify-between text-base py-4"
                            >
                                <span className="flex items-center gap-2"><Mail size={16} /> Iscriviti su Substack</span>
                                <ArrowUpRight size={16} />
                            </a>
                            <p className="font-mono text-[11px] text-dim">
                                # zero spam · zero ads · disiscrizione 1-click
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT YOU GET */}
            <section className="bg-surface/40 py-20 md:py-28 border-b border-line">
                <div className="container-edge">
                    <div className="flex items-center gap-3 mb-10">
                        <span className="eyebrow">// Cosa trovi dentro</span>
                        <span className="h-px flex-1 bg-line" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { k: 'Workflow reali', v: 'Come uso davvero AI generativa, Claude e tool per fare cose: caroselli, report, immagini, scrittura.' },
                            { k: 'Prompt inclusi', v: 'Ogni guida ha il prompt completo da copiare e adattare. Niente fuffa, solo pratica.' },
                            { k: 'Comunicazione + AI', v: 'L\'intersezione fra comunicare e usare modelli AI. Quello che succede quando li metti insieme bene.' },
                        ].map(({ k, v }, i) => (
                            <div key={k} className="panel p-6">
                                <div className="font-mono text-[11px] text-mint mb-3">FEAT.0{i + 1}</div>
                                <div className="font-medium text-fg text-lg mb-2">{k}</div>
                                <p className="text-mute text-sm leading-relaxed">{v}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ARCHIVE · live from RSS */}
            <section className="py-20 md:py-28 border-b border-line">
                <div className="container-edge">
                    <div className="flex items-center gap-3 mb-10">
                        <span className="eyebrow">// Ultime uscite</span>
                        <span className="h-px flex-1 bg-line" />
                        <a href={substackUrl} target="_blank" rel="noopener noreferrer" className="link-mono">
                            Archivio completo <ArrowUpRight size={12} />
                        </a>
                    </div>

                    {loading ? (
                        <div className="panel p-6 font-mono text-sm text-mute flex items-center gap-3">
                            <RefreshCw size={14} className="text-mint animate-spin" />
                            <span>$ fetching feed from oltreilprompt.substack.com<span className="blink"></span></span>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="mb-4 font-mono text-[11px] text-dim">
                                    # feed offline · mostro ultime uscite memorizzate
                                </div>
                            )}
                            <div className="panel divide-y divide-line">
                                {items.slice(0, 8).map((post, idx) => (
                                    <a
                                        key={post.id || idx}
                                        href={post.link || substackUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="grid md:grid-cols-12 gap-3 md:gap-6 p-5 md:p-6 hover:bg-elev/60 transition-colors group"
                                    >
                                        <div className="md:col-span-2 flex flex-col gap-1 self-start md:self-center">
                                            <span className="font-mono text-xs text-mint">#{String(items.length - idx).padStart(3, '0')}</span>
                                            <span className="font-mono text-[10px] text-dim uppercase tracking-widest">{formatDate(post.date)}</span>
                                        </div>
                                        <div className="md:col-span-8">
                                            <h3 className="text-fg font-medium text-lg md:text-xl mb-1.5 group-hover:text-mint transition-colors">{post.title}</h3>
                                            {post.description && (
                                                <p className="text-mute text-sm leading-relaxed line-clamp-2">{post.description}</p>
                                            )}
                                        </div>
                                        <div className="md:col-span-2 flex md:justify-end items-center text-mute group-hover:text-fg transition-colors">
                                            <span className="link-mono"><ArrowUpRight size={14} /> Leggi</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            <div className="mt-4 font-mono text-[11px] text-dim">
                                # feed sync · cache 1h · auto-refresh ogni nuovo post Substack
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative py-24 md:py-32 border-b border-line overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-mint-glow" />

                <div className="relative container-edge text-center max-w-3xl mx-auto">
                    <h2 className="font-display font-medium text-4xl md:text-6xl text-fg leading-[1.05] tracking-tightest text-balance">
                        Iscriviti e ricevi la <span className="text-mint">skill brand voice extractor</span> in regalo.
                    </h2>
                    <a
                        href={subscribeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-base py-4 px-7 mt-10 inline-flex"
                    >
                        Iscriviti gratis su Substack <ArrowUpRight size={18} />
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default OltreIlPrompt;
