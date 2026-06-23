import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

function toSentenceCase(str) {
    if (!str) return '';
    const m = str.match(/[a-zA-ZÀ-ÖØ-öø-ÿ]/);
    if (!m) return str.toLowerCase();
    const i = m.index;
    return str.substring(0, i) + str.charAt(i).toUpperCase() + str.substring(i + 1).toLowerCase();
}

const processMarkdownHeaders = (content) => {
    if (!content) return '';
    return content.replace(/^(#{1,6}\s+)([^\n]+)/gm, (_, hashes, text) => hashes + toSentenceCase(text));
};

export default function InsightArticle() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                setLoading(true);
                const res = await fetch(`/api/notion-post?id=${id}`);
                if (!res.ok) throw new Error(`Articolo non trovato: ${res.status}`);
                const data = await res.json();
                if (data && !Array.isArray(data.tags)) data.tags = [];
                setPost(data);
                document.title = `${toSentenceCase(data.title)} · Insights · Maby Prochilo`;
            } catch (err) {
                if (import.meta.env.DEV) {
                    setPost({
                        title: "L'AI etica nel marketing",
                        date: new Date().toISOString(),
                        tags: [{ name: 'AI' }],
                        content: "Mock locale.\n\n## Un nuovo paradigma\nL'AI non sostituisce, *amplifica*."
                    });
                } else { setError(err.message); }
            } finally { setLoading(false); }
        }
        fetchPost();
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-bg flex items-center justify-center">
            <div className="font-mono text-sm text-mute flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                Carico l'articolo…
            </div>
        </div>
    );

    if (error && !post) return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <Navbar />
            <div className="flex-grow pt-32 container-edge">
                <h1 className="font-display text-4xl text-fg mb-4">Articolo non trovato.</h1>
                <p className="text-mute mb-6">{error}</p>
                <Link to="/insights" className="link-mono"><ArrowLeft size={14} /> Torna agli Insights</Link>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <Navbar />

            <article className="relative pt-28 md:pt-32 pb-16 border-b border-line">
                <div className="absolute inset-x-0 top-0 h-[60vh] bg-radial-fade pointer-events-none" />

                <div className="relative container-edge">
                    <div className="max-w-3xl">
                        <Link to="/insights" className="link-mono mb-12 inline-flex">
                            <ArrowLeft size={14} /> Tutti gli articoli
                        </Link>

                        <div className="flex flex-wrap gap-1.5 mb-8">
                            {post.tags?.map((tag, idx) => (
                                <span key={idx} className="font-mono text-[10px] uppercase tracking-widest text-mint/90 px-2 py-0.5 rounded border border-mint/20 bg-mint/5">
                                    {tag.name}
                                </span>
                            ))}
                        </div>

                        <h1 className="font-display font-medium text-4xl md:text-6xl lg:text-7xl text-fg leading-[1.05] tracking-tightest mb-8 text-balance">
                            {toSentenceCase(post.title)}
                        </h1>

                        <div className="font-mono text-[11px] uppercase tracking-widest text-dim mb-12 pb-12 border-b border-line">
                            Pubblicato · {new Date(post.date).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none
                            prose-headings:font-display prose-headings:tracking-tight prose-headings:font-medium prose-headings:text-fg
                            prose-p:font-sans prose-p:text-mute prose-p:leading-relaxed
                            prose-a:text-mint prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-fg prose-strong:font-medium
                            prose-blockquote:border-l-2 prose-blockquote:border-mint prose-blockquote:pl-6 prose-blockquote:text-fg prose-blockquote:not-italic
                            prose-code:bg-elev prose-code:text-mint prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:hidden prose-code:after:hidden
                            prose-li:text-mute
                        ">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {processMarkdownHeaders(post.content)}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </article>

            <section className="py-24 md:py-32 border-b border-line bg-surface/40">
                <div className="container-edge max-w-3xl text-center">
                    <span className="pill mb-6 inline-flex"><span className="pill-dot" />Approfondiamo insieme</span>
                    <h3 className="font-display font-medium text-3xl md:text-5xl text-fg leading-tight tracking-tightest text-balance">
                        Vuoi applicare queste idee al tuo <span className="text-mint">business</span>?
                    </h3>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                        className="btn-primary mt-10 inline-flex"
                    >
                        Proponi un progetto <ArrowUpRight size={16} />
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
