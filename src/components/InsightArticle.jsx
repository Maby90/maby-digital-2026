import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gsap from 'gsap';

export default function InsightArticle() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const articleRef = useRef(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                setLoading(true);
                const res = await fetch(`/api/notion-post?id=${id}`);
                if (!res.ok) {
                    throw new Error('Articolo non trovato.');
                }
                const data = await res.json();
                setPost(data);
            } catch (err) {
                console.error(err);
                if (import.meta.env.DEV) {
                    // Mock data for local testing without Vercel API
                    setPost({
                        title: "L'Intelligenza Artificiale Etica",
                        date: new Date().toISOString(),
                        tags: [{ name: 'AI' }],
                        content: "Questo è un articolo generato automaticamente localmente per i test di design. In produzione, vedrai il vero testo da Notion!\n\n## Un nuovo paradigma\nL'AI non ci sostituirà, ci *amplierà*."
                    });
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [id]);

    useEffect(() => {
        if (!loading && post) {
            window.scrollTo({ top: 0, behavior: 'instant' });

            const ctx = gsap.context(() => {
                gsap.fromTo(
                    '.article-fade',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
                );
            }, articleRef);
            return () => ctx.revert();
        }
    }, [loading, post]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background pt-32 flex justify-center items-center">
                <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error && !post) {
        return (
            <div className="min-h-screen bg-background pt-32 px-6 flex justify-center items-center">
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-bold mb-4">Articolo non trovato.</h1>
                    <p className="mb-6 text-dark/70">{error}</p>
                    <Link to="/insights" className="btn-primary">Torna agli Insights</Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12" ref={articleRef}>
            <div className="max-w-3xl mx-auto">
                <Link to="/insights" className="article-fade inline-flex items-center text-dark/60 hover:text-accent font-semibold transition-colors mb-10">
                    <span className="mr-2">←</span> Torna indietro
                </Link>

                <header className="mb-12 border-b border-dark/10 pb-10">
                    <div className="article-fade flex flex-wrap gap-2 mb-6">
                        {post.tags?.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent tracking-wide"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>

                    <h1 className="article-fade font-heading font-bold text-3xl md:text-5xl lg:text-6xl text-dark leading-tight mb-6">
                        {post.title}
                    </h1>

                    <div className="article-fade font-sans text-dark/50">
                        Pubblicato il {new Date(post.date).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </header>

                <div className="article-fade prose prose-lg prose-slate prose-headings:font-heading prose-headings:font-bold prose-headings:text-dark prose-p:font-sans prose-p:text-dark/80 prose-a:text-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-dark prose-strong:font-bold prose-li:text-dark/80 max-w-none">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {post.content}
                    </ReactMarkdown>
                </div>

                <div className="article-fade mt-20 pt-10 border-t border-dark/10 text-center">
                    <h3 className="font-heading font-bold text-2xl mb-4 text-dark">Vuoi approfondire questo tema?</h3>
                    <p className="font-sans text-dark/70 mb-8">Scopri come possiamo applicare queste strategie al tuo ecosistema digitale.</p>
                    <a href="mailto:hello@mprochilo.it" className="btn-primary inline-block">Mettiamoci in contatto</a>
                </div>
            </div>
        </article>
    );
}
