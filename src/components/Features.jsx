import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { MousePointer2 } from 'lucide-react';

// Card 1: Diagnostic Shuffler
const ShufflerCard = () => {
    const [cards, setCards] = useState([
        { id: 1, label: "Analisi Brand", active: true },
        { id: 2, label: "Strategia Acquisizione", active: false },
        { id: 3, label: "Autenticità", active: false }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const next = [...prev];
                const last = next.pop();
                next.unshift(last);

                // Update active state based on position
                return next.map((card, idx) => ({
                    ...card,
                    active: idx === 0
                }));
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-background rounded-5xl border border-dark/10 p-8 shadow-sm flex flex-col h-full gap-6 relative overflow-hidden group">
            <div className="flex justify-between items-start">
                <h3 className="font-heading font-bold text-2xl text-primary w-2/3">Strategie di acquisizione clienti</h3>
                <div className="w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center font-mono text-xs text-dark/50">01</div>
            </div>

            <p className="font-sans text-dark/70 text-sm leading-relaxed mb-4">
                Attraverso personal brand e comunicazione autentica per aziende.
            </p>

            <div className="relative h-48 w-full mt-auto flex flex-col justify-end items-center">
                {cards.map((card, idx) => (
                    <div
                        key={card.id}
                        className={`absolute w-[90%] p-4 rounded-xl border transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-between
              ${card.active
                                ? 'bg-primary text-background border-primary/20 z-30 translate-y-0 scale-100 opacity-100'
                                : idx === 1
                                    ? 'bg-background text-dark border-dark/10 z-20 translate-y-3 scale-95 opacity-80'
                                    : 'bg-background/50 text-dark/50 border-dark/5 z-10 translate-y-6 scale-90 opacity-40'
                            }
            `}
                        style={{ bottom: `${idx * 16}px` }}
                    >
                        <span className="font-mono text-xs uppercase tracking-wider">{card.label}</span>
                        {card.active && <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Card 2: Telemetry Typewriter
const TypewriterCard = () => {
    const fullText = "> Scanning processi...\\n> Identificazione colli di bottiglia...\\n> Calcolo ROI automazione AI...\\n> Ottimizzazione in corso...\\n> Pronto per il deploy.";
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + fullText.charAt(index));
                setIndex(index + 1);
            }, Math.random() * 50 + 20); // Random typing speed
            return () => clearTimeout(timeout);
        } else {
            const resetTimeout = setTimeout(() => {
                setDisplayedText("");
                setIndex(0);
            }, 4000);
            return () => clearTimeout(resetTimeout);
        }
    }, [index, fullText]);

    return (
        <div className="bg-background rounded-5xl border border-dark/10 p-8 shadow-sm flex flex-col h-full gap-6 relative group">
            <div className="flex justify-between items-start">
                <h3 className="font-heading font-bold text-2xl text-primary w-2/3">Analisi dei processi</h3>
                <div className="w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center font-mono text-xs text-dark/50">02</div>
            </div>

            <p className="font-sans text-dark/70 text-sm leading-relaxed mb-4">
                Per garantirti un flusso di lavoro ottimizzato prima delle implementazioni.
            </p>

            <div className="mt-auto relative w-full h-48 bg-dark rounded-3xl p-6 overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-4 border-b border-background/10 pb-3">
                    <div className="w-2 h-2 rounded-full bg-[#E57373]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#FFF176]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#81C784]"></div>
                    <span className="ml-2 font-mono text-[10px] text-background/50 uppercase tracking-widest">Live Feed</span>
                </div>
                <div className="font-mono text-xs text-[#81C784] whitespace-pre-line leading-relaxed">
                    {displayedText}
                    <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
                </div>
            </div>
        </div>
    );
};

// Card 3: Cursor Protocol Scheduler
const SchedulerCard = () => {
    const container = useRef(null);
    const cursorRef = useRef(null);
    const cellRef = useRef(null);
    const btnRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.set(cursorRef.current, { x: 50, y: 150, opacity: 0, scale: 1.5 })
                // Cursor enters
                .to(cursorRef.current, { opacity: 1, duration: 0.3 })
                .to(cursorRef.current, { x: 120, y: 60, duration: 1, ease: "power2.inOut" })
                // Hover cell
                .to(cellRef.current, { backgroundColor: 'rgba(204, 88, 51, 0.1)', borderColor: '#CC5833', duration: 0.2 })
                // Click down
                .to(cursorRef.current, { scale: 1.3, duration: 0.1 })
                .to(cellRef.current, { scale: 0.95, duration: 0.1 }, "<")
                // Click up
                .to(cursorRef.current, { scale: 1.5, duration: 0.1 })
                .to(cellRef.current, { scale: 1, backgroundColor: '#CC5833', color: '#F2F0E9', duration: 0.1 }, "<")
                // Move to button
                .to(cursorRef.current, { x: 180, y: 130, duration: 0.8, ease: "power2.inOut", delay: 0.4 })
                // Hover button
                .to(btnRef.current, { y: -2, duration: 0.2 })
                // Click button down
                .to(cursorRef.current, { scale: 1.3, duration: 0.1 })
                .to(btnRef.current, { scale: 0.95, duration: 0.1 }, "<")
                // End sequence
                .to(cursorRef.current, { opacity: 0, duration: 0.2 })
                .to(btnRef.current, { scale: 1, y: 0, duration: 0.2 }, "<")
                .to(cellRef.current, { backgroundColor: 'transparent', borderColor: 'rgba(26, 26, 26, 0.1)', color: '#1A1A1A', duration: 0.1, delay: 0.5 });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-background rounded-5xl border border-dark/10 p-8 shadow-sm flex flex-col h-full gap-6 relative group" ref={container}>
            <div className="flex justify-between items-start">
                <h3 className="font-heading font-bold text-2xl text-primary w-2/3">Implementazioni e automazioni AI</h3>
                <div className="w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center font-mono text-xs text-dark/50">03</div>
            </div>

            <p className="font-sans text-dark/70 text-sm leading-relaxed mb-4">
                Delega il lavoro macchinoso e concentrati su ciò che conta.
            </p>

            <div className="mt-auto relative w-full h-48 border border-dark/10 rounded-3xl p-4 flex flex-col bg-white overflow-hidden">

                <div className="grid grid-cols-5 gap-2 mb-4">
                    {['L', 'M', 'M', 'G', 'V'].map(d => (
                        <div key={d} className="text-center font-mono text-[10px] text-dark/40">{d}</div>
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            ref={i === 7 ? cellRef : null} // Target specific cell
                            className={`h-8 rounded-lg border border-dark/10 flex items-center justify-center font-mono text-xs transition-colors
                ${i === 7 ? 'text-dark' : 'text-dark/20'}
              `}
                        >
                            {i === 7 ? 'AI' : ''}
                        </div>
                    ))}
                </div>

                <div className="mt-auto flex justify-end">
                    <div ref={btnRef} className="px-4 py-1.5 bg-dark text-background rounded-full font-mono text-[10px] uppercase tracking-wider">
                        Deploy
                    </div>
                </div>

                {/* Animated Custom Cursor */}
                <div ref={cursorRef} className="absolute top-0 left-0 z-50 pointer-events-none drop-shadow-md text-accent w-6 h-6">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full -rotate-12">
                        <path d="M4.00411 3.5155C3.39534 2.11585 5.25078 0.792506 6.55167 1.68812L20.8034 11.5039C22.2599 12.5074 21.6853 14.8814 19.9239 15.1437L14.7176 15.9189L11.3972 21.8415C10.5126 23.4194 8.16335 23.1119 7.68969 21.3654L4.00411 3.5155Z" />
                    </svg>
                </div>

            </div>
        </div>
    );
};

const Features = () => {
    const container = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 75%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} id="servizi" className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background relative z-20">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-16 text-center">
                    Infrastruttura <span className="font-drama italic font-light text-accent">operativa</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="feature-card h-full">
                        <ShufflerCard />
                    </div>
                    <div className="feature-card h-full">
                        <TypewriterCard />
                    </div>
                    <div className="feature-card h-full">
                        <SchedulerCard />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
