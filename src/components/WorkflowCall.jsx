import React, { useEffect, useState } from 'react';
import { Check, FileDown, Loader2, AlertCircle, ArrowUpRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import useSeo from '../hooks/useSeo';

const PDF_URL = '/downloads/workflow-call-a-4-contenuti.pdf';
const SOURCE = 'workflow-call';

const WorkflowCall = () => {
    useSeo({
        path: '/workflow-call',
        title: 'Workflow: da una call ai 4 contenuti · Maby Prochilo',
        description: 'Da una call di 30 minuti a 4 contenuti diversi (post LinkedIn, newsletter, reel, carosello). Workflow + 4 prompt Claude. Iscriviti per scaricare il PDF.',
        image: 'https://mprochilo.it/og-image.png',
        robots: 'noindex, follow',
    });

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        try {
            localStorage.setItem('mp_lead_source', SOURCE);
            localStorage.setItem('mp_lead_pdf', PDF_URL);
        } catch (_) {}
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (status === 'loading' || status === 'success') return;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMsg('Email non valida');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: SOURCE }),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok || !data.ok) {
                throw new Error(data && data.error ? data.error : 'Errore iscrizione');
            }

            // Fire Meta Pixel Lead
            if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
                try { window.fbq('track', 'Lead', { content_name: SOURCE, content_category: 'lead-magnet' }); } catch (_) {}
            }
            // GTM datalayer
            if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
                window.dataLayer.push({ event: 'lead_confirmed', source: SOURCE, content_name: SOURCE });
            }

            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
            setErrorMsg(err.message || 'Errore. Riprova o scrivi a hello@mprochilo.it');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <Navbar />

            <section className="relative overflow-hidden flex-grow flex items-center pt-28 md:pt-32 pb-20 border-b border-line">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-x-0 top-0 h-[80vh] bg-radial-fade" />

                <div className="relative container-edge w-full">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
                        {/* Copy */}
                        <div className="lg:col-span-7">
                            <span className="pill mb-8 inline-flex">
                                <span className="pill-dot" />
                                Lead magnet · PDF gratis
                            </span>

                            <h1 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tightest text-balance">
                                Da una call di 30 minuti<br className="hidden md:block" />
                                tiro fuori <span className="text-mint">4 contenuti.</span>
                            </h1>

                            <p className="mt-6 text-mute text-lg leading-relaxed max-w-xl">
                                Post LinkedIn, sezione newsletter, script reel, carosello: tutto da una sola conversazione. Il workflow approfondito con i <span className="text-fg">4 prompt Claude</span> che uso davvero.
                            </p>

                            <ul className="mt-8 space-y-2.5 text-fg/90 text-sm md:text-base">
                                {[
                                    'Step 1, registrazione + trascrizione (Whisper / Otter / MacWhisper)',
                                    'Step 2, estrazione narrativa con prompt Claude',
                                    'Step 3, vestizione in 4 formati diversi (4 prompt dedicati)',
                                ].map((b) => (
                                    <li key={b} className="flex items-start gap-2.5">
                                        <span className="mt-1 inline-flex w-4 h-4 shrink-0 rounded-full bg-mint/15 border border-mint/30 items-center justify-center text-mint">
                                            <Check size={10} />
                                        </span>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Form / Success */}
                        <div className="lg:col-span-5">
                            <div className="lg:sticky lg:top-24">
                                <div className="panel overflow-hidden shadow-[0_0_60px_-15px_rgb(var(--mint)/0.25)]">
                                    <div className="px-4 py-2.5 border-b border-line bg-elev/40 flex items-center justify-between">
                                        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-mute">
                                            <span className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-mint shadow-[0_0_6px_rgb(var(--mint))]' : 'bg-mint/60'}`} />
                                            {status === 'success' ? 'pdf.unlocked' : 'unlock.pdf'}
                                        </div>
                                        <span className="font-mono text-[10px] text-dim">↵ to send</span>
                                    </div>

                                    <div className="p-5">
                                        {status !== 'success' ? (
                                            <>
                                                <div className="font-mono text-sm text-mint mb-4">$ get --workflow "call-4-contenuti"</div>

                                                <form onSubmit={submit} className="space-y-3">
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="tua@email.it"
                                                        required
                                                        autoComplete="email"
                                                        className="w-full bg-bg border border-line text-fg rounded-md px-3.5 py-3 font-sans focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint/30 transition-colors placeholder:text-dim"
                                                    />

                                                    <button
                                                        type="submit"
                                                        disabled={status === 'loading'}
                                                        className="btn-primary w-full justify-between text-base py-3.5 disabled:opacity-60"
                                                    >
                                                        {status === 'loading' ? (
                                                            <>
                                                                <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Iscrizione in corso…</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="flex items-center gap-2"><FileDown size={16} /> Iscriviti e sblocca PDF</span>
                                                                <ArrowUpRight size={16} />
                                                            </>
                                                        )}
                                                    </button>

                                                    {status === 'error' && (
                                                        <div className="flex items-start gap-2 text-xs text-red-400 mt-2">
                                                            <AlertCircle size={14} className="mt-0.5 shrink-0" />
                                                            <span>{errorMsg}</span>
                                                        </div>
                                                    )}
                                                </form>

                                                <p className="mt-4 text-xs text-mute leading-relaxed">
                                                    Iscriviti a <strong className="text-fg">Oltre il prompt</strong>: ricevi subito il PDF + ogni settimana una guida operativa. Disiscrizione 1-click.
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="font-mono text-sm text-mint mb-4">$ unlock --status confirmed</div>

                                                <div className="flex items-center gap-3 mb-5">
                                                    <div className="inline-flex w-10 h-10 rounded-full bg-mint/15 border border-mint/30 items-center justify-center text-mint relative">
                                                        <span className="absolute inset-0 rounded-full bg-mint/20 animate-ping" />
                                                        <Check size={18} className="relative z-10" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-fg">Iscrizione confermata</div>
                                                        <div className="text-mute text-xs">Il PDF è pronto da scaricare</div>
                                                    </div>
                                                </div>

                                                <a href={PDF_URL} download className="btn-primary w-full justify-between text-base py-3.5">
                                                    <span className="flex items-center gap-2"><FileDown size={16} /> Scarica il PDF</span>
                                                    <ArrowUpRight size={16} />
                                                </a>

                                                <div className="mt-4 panel p-3 font-mono text-xs">
                                                    <div className="text-mint">$ status --pdf</div>
                                                    <div className="text-mute mt-1">→ ready · 6 pages · 75 KB</div>
                                                    <div className="text-mute">→ workflow + 4 prompt Claude</div>
                                                </div>

                                                <p className="mt-4 text-xs text-mute leading-relaxed">
                                                    Riceverai anche la newsletter <strong className="text-fg">Oltre il prompt</strong> via email ogni settimana. Disiscrizione 1-click.
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default WorkflowCall;
