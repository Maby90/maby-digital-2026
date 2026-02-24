import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const protocols = [
    {
        step: "01",
        title: "Audit & Identità",
        desc: "Analisi profonda del tuo posizionamento attuale e definizione dell'architettura di personal brand. Creiamo fondamenta inattaccabili basate sull'autenticità.",
        Animation: () => (
            <div className="relative w-full h-full flex items-center justify-center">
                {/* A simple morphing/rotating organic DNA-like loop */}
                <div className="absolute w-40 h-40 rounded-full border border-dark/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                    <div className="w-4 h-4 rounded-full bg-accent/40 absolute top-[-8px]"></div>
                    <div className="w-4 h-4 rounded-full bg-primary/40 absolute bottom-[-8px]"></div>
                </div>
                <div className="absolute w-24 h-24 rounded-full border border-dark/30 flex items-center justify-center animate-[spin_7s_linear_infinite_reverse]">
                    <div className="w-3 h-3 rounded-full bg-accent/60 absolute right-[-6px]"></div>
                    <div className="w-3 h-3 rounded-full bg-primary/60 absolute left-[-6px]"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-dark flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-background animate-pulse"></div>
                </div>
            </div>
        )
    },
    {
        step: "02",
        title: "Ingegneria dell'acquisizione",
        desc: "Sviluppo di sistemi di acquisizione clienti prevedibili e scalabili. Progettiamo flussi che convertono l'attenzione in relazioni di valore.",
        Animation: () => (
            <div className="relative w-full h-full flex items-center justify-center flex-col gap-4 overflow-hidden">
                {/* Simple scanning laser grid */}
                <div className="w-32 h-32 relative border border-dark/10 bg-dark/5 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px]"></div>
                    <div className="absolute w-full h-1 bg-accent/80 shadow-[0_0_8px_2px_rgba(204,88,51,0.5)] top-0 left-0 animate-[shuffler_3s_ease-in-out_infinite_alternate]"></div>
                </div>
            </div>
        )
    },
    {
        step: "03",
        title: "Ecosistema AI automatizzato",
        desc: "Integrazione di modelli AI per automatizzare l'operatività a basso valore aggiunto, moltiplicando la tua produttività senza sacrificare la qualità.",
        Animation: () => (
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Pulsing waveform SVG */}
                <svg viewBox="0 0 100 40" className="w-48 h-20 overflow-visible">
                    <path
                        d="M0,20 L15,20 L20,5 L25,35 L30,20 L45,20 L50,10 L55,30 L60,20 L80,20 L85,15 L90,25 L95,20 L100,20"
                        fill="none"
                        stroke="#CC5833"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="opacity-80"
                        strokeDasharray="150"
                        strokeDashoffset="150"
                    >
                        <animate attributeName="stroke-dashoffset" values="150;0;-150" dur="4s" repeatCount="indefinite" />
                    </path>
                    <circle cx="50" cy="20" r="2" fill="#2E4036" className="animate-pulse" />
                </svg>
            </div>
        )
    }
];

const Protocol = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useLayoutEffect(() => {
        // Pinning and Stacking logic using a single master timeline
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${window.innerHeight * protocols.length}`,
                    scrub: true,
                    pin: true,
                }
            });

            // Animate each card except the first one coming in
            cardsRef.current.forEach((card, index) => {
                if (index === 0) return; // First card is already visible

                const prevCard = cardsRef.current[index - 1];

                // The incoming card moves up into view
                tl.fromTo(card,
                    { y: window.innerHeight },
                    { y: 0, ease: "none" },
                    index // Use index as the position parameter to sequence them properly
                );

                // The previous card scales down and blurs at the same time
                tl.to(prevCard,
                    {
                        scale: 0.9,
                        opacity: 0.5,
                        filter: "blur(10px)",
                        y: -20,
                        ease: "none"
                    },
                    index
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative w-full bg-background" id="metodo">
            {/* We need a tall container to allow scrolling */}
            <div
                ref={containerRef}
                className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center p-6 md:p-12 lg:p-24"
            >
                <div className="absolute top-12 left-6 md:left-12 lg:left-24 z-10 w-full max-w-5xl mx-auto flex items-center justify-between pointer-events-none">
                    <h2 className="font-heading font-medium text-xl text-primary tracking-widest uppercase">Protocollo</h2>
                    <span className="font-mono text-xs text-dark/40">SISTEMA DI CRESCITA</span>
                </div>

                <div className="relative w-full max-w-5xl mx-auto h-[80vh] md:h-[70vh] flex items-center justify-center perspective-[1000px] mt-12 md:mt-0">
                    {protocols.map((protocol, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="absolute w-full h-full bg-background border border-dark/10 rounded-[2rem] md:rounded-5xl shadow-xl flex flex-col md:flex-row overflow-hidden will-change-transform z-[1] transform-origin-top"
                            // Initially stack them using z-index
                            style={{ zIndex: index }}
                        >

                            {/* Animation Side (Visuals) */}
                            <div className="w-full md:w-1/2 h-2/5 md:h-full bg-[#f8f7f4] border-b md:border-b-0 md:border-r border-dark/5 p-6 md:p-8 relative flex items-center justify-center shrink-0">
                                <protocol.Animation />
                                <div className="absolute bottom-4 left-6 md:bottom-6 font-mono text-xs text-dark/30">FIG. {protocol.step}</div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-1/2 h-3/5 md:h-full p-6 md:p-16 flex flex-col justify-center overflow-y-auto">
                                <div className="font-mono text-4xl md:text-7xl text-dark/10 font-bold mb-2 md:mb-4 shrink-0">
                                    {protocol.step}
                                </div>
                                <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-3 md:mb-6 shrink-0 leading-tight">
                                    {protocol.title}
                                </h3>
                                <p className="font-sans text-dark/70 text-sm sm:text-base md:text-lg leading-relaxed md:leading-relaxed">
                                    {protocol.desc}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Protocol;
