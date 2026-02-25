import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gsap from 'gsap';
import Navbar from './Navbar';
import Footer from './Footer';

function toSentenceCase(str) {
    if (!str) return '';
    const match = str.match(/[a-zA-ZÀ-ÖØ-öø-ÿ]/);
    if (!match) return str.toLowerCase();
    const index = match.index;
    return str.substring(0, index) +
        str.charAt(index).toUpperCase() +
        str.substring(index + 1).toLowerCase();
}

const processMarkdownHeaders = (content) => {
    if (!content) return '';
    return content.replace(/^(#{1,6}\s+)([^\n]+)/gm, (match, hashes, text) => {
        return hashes + toSentenceCase(text);
    });
};

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
                    const errorText = await res.text();
                    console.error("Fetch Article Error:", errorText);
                    throw new Error(`Articolo non trovato: ${res.status}`);
                }
                const data = await res.json();

                if (data && !Array.isArray(data.tags)) {
                    data.tags = [];
                }

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
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
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
            <div className="min-h-screen bg-background relative w-full text-dark">
                <Navbar />
                <div className="pt-32 flex justify-center items-center h-full min-h-[60vh]">
                    <div className="text-center max-w-md">
                        <h1 className="text-2xl font-bold mb-4 font-heading text-primary">Articolo non trovato.</h1>
                        <p className="mb-6 text-dark/70 font-sans">{error}</p>
                        <Link to="/insights" className="btn-primary">Torna agli Insights</Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="relative w-full text-dark bg-background">
            <Navbar />

            {/* Sfondo salvia morbido superiore */}
            <div className="absolute top-0 left-0 w-full h-[60vh] bg-primary/5 -z-10 pointer-events-none"></div>

            <article className="min-h-screen pt-32 pb-24 px-6 md:px-12" ref={articleRef}>
                <div className="max-w-3xl mx-auto">
                    <Link to="/insights" className="article-fade inline-flex items-center text-primary/70 hover:text-accent font-semibold transition-colors mb-10">
                        <span className="mr-2">←</span> Torna indietro
                    </Link>

                    <header className="mb-12 border-b border-primary/20 pb-10">
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

                        <h1 className="article-fade font-heading font-bold text-3xl md:text-5xl lg:text-6xl text-primary leading-tight mb-6">
                            {toSentenceCase(post.title)}
                        </h1>

                        <div className="article-fade font-sans text-primary/60 font-medium tracking-wide text-sm">
                            Pubblicato il {new Date(post.date).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </header>

                    <div className="article-fade prose prose-lg prose-slate prose-headings:font-heading prose-headings:font-bold prose-headings:text-primary prose-p:font-sans prose-p:text-dark/80 prose-a:text-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-dark prose-strong:font-bold prose-li:text-dark/80 max-w-none">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                            {processMarkdownHeaders(post.content)}
                        </ReactMarkdown>
                    </div>

                    <div className="article-fade mt-20 pt-16 border-t border-primary/20 text-center">
                        <h3 className="font-heading font-bold text-3xl mb-4 text-primary">Vuoi approfondire questo tema?</h3>
                        <p className="font-sans text-dark/80 max-w-lg mx-auto mb-8 text-lg">Scopri come possiamo applicare queste strategie al tuo ecosistema digitale.</p>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                            className="bg-accent text-background px-8 py-4 rounded-full font-sans text-lg font-bold btn-magnetic group inline-flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(204,88,51,0.2)] hover:shadow-[0_0_50px_rgba(204,88,51,0.4)] transition-shadow"
                        >
                            <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                                Candidati ora
                            </span>
                            <svg
                                className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </article>
            <Footer />
        </div>
    );
}
