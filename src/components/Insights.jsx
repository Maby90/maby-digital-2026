import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Insights() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                // Fetch from Vercel Serverless Function
                const res = await fetch('/api/notion');
                if (!res.ok) {
                    throw new Error('Impossibile caricare gli articoli.');
                }
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error(err);
                // Fallback locale nel caso Vite dev non supporti le /api (solo visivo)
                if (import.meta.env.DEV) {
                    setPosts([
                        {
                            id: 'mock-1',
                            slug: 'mock-1',
                            title: "L'Ecosistema Digitale del Futuro",
                            date: new Date().toISOString(),
                            tags: [{ name: 'Strategia', color: 'blue' }, { name: 'AI', color: 'green' }]
                        },
                        {
                            id: 'mock-2',
                            slug: 'mock-2',
                            title: "Come automatizzare il Customer Care",
                            date: new Date().toISOString(),
                            tags: [{ name: 'CX', color: 'purple' }]
                        }
                    ]);
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    useEffect(() => {
        if (!loading && posts.length > 0) {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    '.insight-card',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
                );
            }, containerRef);
            return () => ctx.revert();
        }
    }, [loading, posts]);

    return (
        <section className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24" ref={containerRef}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl text-dark mb-6 tracking-tight">
                        Insights
                    </h1>
                    <p className="font-sans text-xl text-dark/70 max-w-2xl leading-relaxed">
                        Riflessioni, strategie e visioni sull'evoluzione degli ecosistemi digitali e l'impatto dell'Intelligenza Artificiale.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error && posts.length === 0 ? (
                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl">
                        <p>Oops, qualcosa è andato storto nel caricamento degli articoli: {error}</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 border border-dark/10 rounded-3xl bg-dark/5">
                        <p className="font-sans text-xl text-dark/60">Non ci sono ancora articoli pubblicati.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                to={`/insights/${post.slug}`}
                                key={post.id}
                                className="insight-card group block p-8 rounded-3xl bg-background border border-dark/10 hover:border-accent/40 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent tracking-wide"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="font-heading font-bold text-xl md:text-2xl text-dark mb-4 leading-tight group-hover:text-accent transition-colors">
                                    {post.title}
                                </h2>

                                <div className="flex items-center text-sm font-sans text-dark/50 mt-auto pt-4 border-t border-dark/5">
                                    <span>{new Date(post.date).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    <span className="ml-auto flex items-center gap-1 font-semibold group-hover:text-accent transition-colors">
                                        Leggi <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform">→</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
