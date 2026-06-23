import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, RefreshCw } from 'lucide-react';

function formatDate(iso) {
    if (!iso) return '';
    try {
        return new Date(iso).toLocaleDateString('it-IT', { year: 'numeric', month: 'short', day: '2-digit' });
    } catch { return ''; }
}

const fallback = [
    { id: 'f1', date: '2026-04-30', title: 'La guida lunga a Claude Cowork e Code', description: 'Per chi non scrive codice. Con la skill brand voice extractor in regalo.', link: 'https://oltreilprompt.substack.com/' },
    { id: 'f2', date: '2026-04-24', title: 'Come faccio foto iperrealistiche con Nano Banana Pro', description: 'Guida lunga, con prompt incluso.', link: 'https://oltreilprompt.substack.com/' },
    { id: 'f3', date: '2026-04-13', title: 'Come realizzo i caroselli Instagram con Claude', description: 'Workflow intero, grafica compresa, senza aprire Canva.', link: 'https://oltreilprompt.substack.com/' },
];

const NewsletterPreview = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const res = await fetch('/api/newsletter');
                if (!res.ok) throw new Error(`feed ${res.status}`);
                const data = await res.json();
                if (cancelled) return;
                setItems(Array.isArray(data.items) && data.items.length ? data.items : fallback);
            } catch {
                if (!cancelled) setItems(fallback);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    const top = items.slice(0, 3);

    return (
        <section className="relative bg-bg py-24 md:py-32 border-t border-line">
            <div className="container-edge">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="eyebrow">// 05 · Newsletter</span>
                            <span className="h-px flex-1 bg-line lg:hidden" />
                        </div>
                        <h2 className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-fg leading-[1.05] tracking-tightest text-balance">
                            Estratti da<br/>
                            <span className="text-mint">Oltre il prompt.</span>
                        </h2>
                        <p className="mt-6 text-mute text-base md:text-lg leading-relaxed max-w-md">
                            Comunicazione, intelligenza artificiale e le cose che succedono quando le usi insieme. Le ultime uscite, in tempo reale dal feed Substack.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link to="/newsletter" className="btn-primary">
                                Iscriviti <Mail size={14} />
                            </Link>
                            <a href="https://oltreilprompt.substack.com/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                                Archivio completo <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        {loading ? (
                            <div className="panel p-6 font-mono text-sm text-mute flex items-center gap-3">
                                <RefreshCw size={14} className="text-mint animate-spin" />
                                <span>$ fetching latest issues<span className="blink"></span></span>
                            </div>
                        ) : (
                            <div className="panel divide-y divide-line">
                                {top.map((post) => (
                                    <a
                                        key={post.id}
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="grid grid-cols-12 gap-3 md:gap-4 p-4 md:p-5 hover:bg-elev/60 transition-colors group"
                                    >
                                        {post.image && (
                                            <div className="col-span-12 md:col-span-3">
                                                <div className="aspect-[4/3] md:aspect-square w-full overflow-hidden rounded-md border border-line bg-elev">
                                                    <img
                                                        src={post.image}
                                                        alt={`Copertina dell'uscita newsletter Oltre il prompt · ${post.title}`}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className={post.image ? 'col-span-12 md:col-span-9' : 'col-span-12'}>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-mono text-[11px] text-mint">↳ issue</span>
                                                <span className="font-mono text-[10px] uppercase tracking-widest text-dim">{formatDate(post.date)}</span>
                                            </div>
                                            <h3 className="text-fg font-medium text-base md:text-lg leading-snug mb-2 group-hover:text-mint transition-colors">
                                                {post.title}
                                            </h3>
                                            {post.description && (
                                                <p className="text-mute text-sm leading-relaxed line-clamp-2">{post.description}</p>
                                            )}
                                            <div className="mt-3 flex items-center gap-1.5 text-mute group-hover:text-fg text-xs font-mono uppercase tracking-widest transition-colors">
                                                Leggi su Substack <ArrowUpRight size={12} />
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterPreview;
