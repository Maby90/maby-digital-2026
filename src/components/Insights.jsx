import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

function toSentenceCase(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function Insights() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = 'Insights · Riflessioni su AI, marketing e strategia · Maby Prochilo';
        async function fetchPosts() {
            try {
                const res = await fetch('/api/notion');
                if (!res.ok) throw new Error(`Impossibile caricare gli articoli: ${res.status}`);
                const data = await res.json();
                setPosts(data.map(p => ({ ...p, tags: Array.isArray(p.tags) ? p.tags : [] })));
            } catch (err) {
                if (import.meta.env.DEV) {
                    setPosts([
                        { id: 'mock-1', slug: 'mock-1', title: "L'ecosistema digitale del futuro", date: new Date().toISOString(), tags: [{ name: 'Strategia' }, { name: 'AI' }] },
                        { id: 'mock-2', slug: 'mock-2', title: "Come automatizzare il customer care", date: new Date().toISOString(), tags: [{ name: 'CX' }] },
                        { id: 'mock-3', slug: 'mock-3', title: "Workflow AI per team marketing", date: new Date().toISOString(), tags: [{ name: 'AI' }, { name: 'Workflow' }] },
                    ]);
                } else { setError(err.message); }
            } finally { setLoading(false); }
        }
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <Navbar />

            <section className="relative overflow-hidden pt-28 md:pt-32 pb-16 border-b border-line">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-x-0 top-0 h-[60vh] bg-radial-fade" />
                <div className="relative container-edge">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="pill"><span className="pill-dot" />Insights · magazine</span>
                    </div>
                    <h1 className="font-display font-medium text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tightest">
                        <span className="text-mint">Insights</span>
                    </h1>
                    <p className="mt-8 text-mute text-lg max-w-2xl leading-relaxed">
                        Riflessioni, strategie e visioni sull'evoluzione degli ecosistemi digitali e l'impatto dell'Intelligenza Artificiale.
                    </p>
                </div>
            </section>

            <section className="flex-grow py-16 md:py-20">
                <div className="container-edge">
                    {loading ? (
                        <div className="py-32 font-mono text-mute text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                            Carico gli articoli…
                        </div>
                    ) : error ? (
                        <div className="py-20 panel p-6 text-mute">Errore: {error}</div>
                    ) : posts.length === 0 ? (
                        <div className="py-32 panel p-8 text-center">
                            <p className="text-mute">Non ci sono ancora articoli pubblicati.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {posts.map((post) => (
                                <Link
                                    to={`/insights/${post.slug}`}
                                    key={post.id}
                                    className="panel p-6 hover:border-mint/40 hover:bg-elev transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mint/0 to-transparent group-hover:via-mint/60 transition-colors" />

                                    <div className="flex items-start justify-between mb-5">
                                        <div className="flex flex-wrap gap-1.5">
                                            {post.tags.map((tag, idx) => (
                                                <span key={idx} className="font-mono text-[10px] uppercase tracking-widest text-mint/90 px-2 py-0.5 rounded border border-mint/20 bg-mint/5">
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                        <ArrowUpRight size={16} className="text-dim group-hover:text-mint group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                                    </div>

                                    <h2 className="font-display font-medium text-xl md:text-2xl text-fg mb-4 leading-tight tracking-tight group-hover:text-mint transition-colors">
                                        {toSentenceCase(post.title)}
                                    </h2>

                                    <div className="font-mono text-[11px] uppercase tracking-widest text-dim mt-auto pt-4 border-t border-line">
                                        {new Date(post.date).toLocaleDateString('it-IT', { year: 'numeric', month: 'short', day: '2-digit' })}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
