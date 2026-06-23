import React from 'react';
import { Download, ArrowUpRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import useSeo from '../hooks/useSeo';

const PDF_URL = '/prompt-miniapp-claudecode.pdf';

const MiniAppClaudeCode = () => {
    useSeo({
        path: '/miniapp-claudecode',
        title: '3 prompt per costruire mini-app con Claude Code | Maby Prochilo',
        description: 'Tracker lead, calcolatrice preventivi, dashboard metriche. Prompt pronti da copiare per costruire le tue mini-app con Claude Code, con variazioni per iterare.',
        jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://mprochilo.it/miniapp-claudecode#page',
            name: '3 prompt per costruire mini-app con Claude Code',
            description: 'Tracker lead, calcolatrice preventivi, dashboard metriche. Prompt pronti da copiare per Claude Code.',
            url: 'https://mprochilo.it/miniapp-claudecode',
            inLanguage: 'it-IT',
            isPartOf: { '@id': 'https://mprochilo.it/#website' },
            author: { '@id': 'https://mprochilo.it/#person' },
        },
    });

    return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <Navbar />

            {/* HERO */}
            <section className="relative overflow-hidden pt-28 md:pt-32 pb-12 md:pb-16 border-b border-line">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-x-0 top-0 h-[60vh] bg-radial-fade" />

                <div className="relative container-edge">
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                        <span className="pill"><span className="pill-dot" />Risorsa pratica · gratis</span>
                        <span className="hidden md:inline-flex pill">
                            <span className="text-mint">Claude Code</span> · mini-app
                        </span>
                    </div>

                    <div className="max-w-3xl">
                        <h1 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tightest text-fg text-balance">
                            3 prompt per costruire le tue <span className="text-mint">mini-app</span> con Claude Code.
                        </h1>

                        <p className="mt-8 text-mute text-lg md:text-xl leading-relaxed max-w-2xl">
                            Tracker lead, calcolatrice preventivi, dashboard metriche. Prompt pronti da copiare, con le variazioni per iterare e adattare al tuo uso.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-10">
                            <a
                                href={PDF_URL}
                                download="3-prompt-miniapp-claudecode-maby.pdf"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <Download size={16} />
                                Scarica PDF
                            </a>
                            <a
                                href="https://oltreilprompt.substack.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost inline-flex items-center gap-2"
                            >
                                Newsletter <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* PDF VIEWER */}
            <section className="flex-1 py-12 md:py-16">
                <div className="container-edge">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="eyebrow">// Guida completa</span>
                        <span className="h-px flex-1 bg-line" />
                        <a
                            href={PDF_URL}
                            download="3-prompt-miniapp-claudecode-maby.pdf"
                            className="btn-ghost text-xs inline-flex items-center gap-1.5"
                        >
                            <Download size={13} />
                            Scarica
                        </a>
                    </div>

                    {/* PDF embed */}
                    <div className="panel overflow-hidden" style={{ height: '80vh', minHeight: '600px' }}>
                        <iframe
                            src={`${PDF_URL}#toolbar=0&navpanes=0`}
                            title="3 prompt per costruire mini-app con Claude Code"
                            className="w-full h-full"
                            style={{ border: 'none', display: 'block' }}
                        />
                    </div>

                    {/* Fallback link */}
                    <p className="mt-4 text-xs text-mute text-center">
                        Il PDF non si carica?{' '}
                        <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="text-mint hover:underline">
                            Aprilo direttamente
                        </a>
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default MiniAppClaudeCode;
