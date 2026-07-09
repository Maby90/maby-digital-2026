import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, Mail, FileDown } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import useSeo from '../hooks/useSeo';

const variants = {
    'skill-carosello': {
        title: 'Iscrizione confermata · Skill Claude in arrivo',
        description: 'Grazie per esserti iscritta/o. La skill Claude per i caroselli Instagram ti arriva via email entro pochi minuti.',
        eyebrow: '200 OK · iscrizione confermata',
        h1: 'Skill in <em class="not-italic text-mint">arrivo</em>.',
        body: 'Controlla la tua casella email entro pochi minuti. Riceverai la skill Claude, i prompt Gemini, lo script Python e la guida di setup. Se non vedi nulla, controlla la cartella Promozioni o Spam.',
        statusLines: [
            ['$ deploy --skill caroselli-claude', 'mint'],
            ['→ status: shipped to your inbox', 'mute'],
            ['→ from: maby@oltreilprompt.substack.com', 'mute'],
        ],
        cta: { href: 'https://oltreilprompt.substack.com/', label: 'Apri Substack', external: true },
        leadEvent: { content_name: 'skill-carosello', content_category: 'lead-magnet' },
    },
    'skill-lavagne': {
        title: 'Iscrizione confermata · Skill lavagne in arrivo',
        description: 'Grazie per esserti iscritta/o. Scarica subito la skill Claude per le lavagne Excalidraw.',
        eyebrow: '200 OK · iscrizione confermata',
        h1: 'Skill <em class="not-italic text-mint">sbloccata</em>.',
        body: 'La skill per le lavagne Excalidraw è pronta: scaricala qui sotto. Dentro trovi la skill Claude, il generatore Python e la guida di setup. Riceverai anche le prossime guide via email.',
        statusLines: [
            ['$ get --skill lavagne-excalidraw', 'mint'],
            ['→ status: ready to download', 'mute'],
            ['→ format: .zip · skill + script + guida', 'mute'],
        ],
        download: { href: '/downloads/lavagne-claude.zip', label: 'Scarica la skill' },
        cta: { href: 'https://oltreilprompt.substack.com/', label: 'Vai alla newsletter', external: true },
        leadEvent: { content_name: 'skill-lavagne', content_category: 'lead-magnet' },
    },
    'workflow-call': {
        title: 'Iscrizione confermata · Workflow Call PDF',
        description: 'Grazie per esserti iscritta/o. Scarica il workflow PDF qui sotto.',
        eyebrow: '200 OK · iscrizione confermata',
        h1: 'PDF <em class="not-italic text-mint">sbloccato</em>.',
        body: 'Workflow completo + i 4 prompt Claude per trasformare una call di 30 minuti in 4 contenuti diversi. Scaricalo qui sotto. Riceverai anche le prossime guide via email.',
        statusLines: [
            ['$ unlock --workflow call-4-contenuti', 'mint'],
            ['→ status: ready to download', 'mute'],
            ['→ format: PDF · 6 pages', 'mute'],
        ],
        download: { href: '/downloads/workflow-call-a-4-contenuti.pdf', label: 'Scarica il PDF' },
        cta: { href: 'https://oltreilprompt.substack.com/', label: 'Vai alla newsletter', external: true },
        leadEvent: { content_name: 'workflow-call', content_category: 'lead-magnet' },
    },
    default: {
        title: 'Richiesta ricevuta · Maby Prochilo',
        description: 'Grazie per la tua richiesta. Ti rispondo entro 48 ore lavorative.',
        eyebrow: '200 OK · richiesta ricevuta',
        h1: 'Richiesta <em class="not-italic text-mint">Ricevuta</em>.',
        body: 'Grazie per avermi raccontato il tuo progetto. Analizzerò le tue risposte e ti ricontatterò al più presto per farti sapere se ci sono i presupposti per lavorare insieme.',
        statusLines: [
            ['$ status --request latest', 'mint'],
            ['→ queued · ETA: 48h business', 'mute'],
            ['→ from: hello@mprochilo.it', 'mute'],
        ],
        cta: { href: '/', label: 'Torna alla home', external: false },
        leadEvent: { content_name: 'project-brief', content_category: 'lead' },
    },
};

const ThankYou = () => {
    const [params] = useSearchParams();
    const [source, setSource] = useState(params.get('source') || 'default');

    // Fallback: if Substack global redirect strips ?source, look at localStorage
    useEffect(() => {
        if (params.get('source')) return;
        try {
            const stored = localStorage.getItem('mp_lead_source');
            if (stored && variants[stored]) setSource(stored);
        } catch (_) {}
    }, [params]);

    const v = variants[source] || variants.default;

    useSeo({
        path: '/grazie',
        title: v.title,
        description: v.description,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        // Meta Pixel: fire Lead event if pixel is loaded
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            try { window.fbq('track', 'Lead', v.leadEvent); } catch (_) {}
        }
        // Push GTM event (optional but useful)
        if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({
                event: 'lead_confirmed',
                source,
                ...v.leadEvent,
            });
        }
    }, [source]);

    return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <Navbar />
            <main className="flex-grow relative overflow-hidden flex items-center pt-32 pb-24 border-b border-line">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-x-0 top-0 h-[80vh] bg-radial-fade" />

                <div className="relative container-edge w-full">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex w-14 h-14 rounded-full bg-mint/15 border border-mint/30 items-center justify-center mb-8 relative">
                            <span className="absolute inset-0 rounded-full bg-mint/20 animate-ping" />
                            <Check size={26} className="text-mint relative z-10" />
                        </div>

                        <span className="pill mb-6 inline-flex">
                            <span className="pill-dot" /> {v.eyebrow}
                        </span>

                        <h1
                            className="font-display font-medium text-5xl md:text-7xl text-fg leading-[1.02] tracking-tightest"
                            dangerouslySetInnerHTML={{ __html: v.h1 }}
                        />

                        <p className="mt-8 text-mute text-lg leading-relaxed max-w-lg mx-auto">
                            {v.body}
                        </p>

                        <div className="mt-10 panel p-4 max-w-md mx-auto font-mono text-xs text-left">
                            {v.statusLines.map(([line, color], i) => (
                                <div key={i} className={color === 'mint' ? 'text-mint' : 'text-mute mt-1'}>{line}</div>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            {v.download && (
                                <a href={v.download.href} download className="btn-primary inline-flex">
                                    <FileDown size={16} /> {v.download.label}
                                </a>
                            )}
                            {v.cta && (
                                v.cta.external ? (
                                    <a href={v.cta.href} target="_blank" rel="noopener noreferrer" className={v.download ? 'btn-ghost inline-flex' : 'btn-primary inline-flex'}>
                                        <Mail size={16} /> {v.cta.label}
                                    </a>
                                ) : (
                                    <Link to={v.cta.href} className={v.download ? 'btn-ghost inline-flex' : 'btn-primary inline-flex'}>
                                        <ArrowLeft size={16} /> {v.cta.label}
                                    </Link>
                                )
                            )}
                            {(v.download || v.cta) && (
                                <Link to="/" className="btn-ghost inline-flex">
                                    <ArrowLeft size={16} /> Home
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ThankYou;
