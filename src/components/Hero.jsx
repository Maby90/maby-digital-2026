import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
    const container = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-element', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={container}
            className="relative w-full h-[100dvh] overflow-hidden bg-dark flex flex-col justify-end p-6 md:p-12 lg:p-24"
        >
            {/* Background Image with Dark Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2913&auto=format&fit=crop"
                    alt="Dark organic leaves texture"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-6 select-none">

                <div className="hero-element inline-flex items-center gap-3 px-4 py-2 rounded-full border border-background/20 bg-background/5 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <span className="text-background/80 font-mono text-xs uppercase tracking-widest">
                        Maby Prochilo — Digital Strategist
                    </span>
                </div>

                <h1 className="flex flex-col text-background leading-[0.9] -tracking-[0.02em]">
                    <span className="hero-element font-heading font-semibold text-5xl md:text-6xl lg:text-7xl">
                        Il tuo ecosistema di
                    </span>
                    <span className="hero-element font-drama italic font-light text-7xl md:text-8xl lg:text-[10rem] text-accent mt-2 ml-4 md:ml-12 lg:ml-24">
                        Crescita.
                    </span>
                </h1>

                <div className="hero-element mt-8">
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                        className="bg-accent text-background px-8 py-4 rounded-full font-sans text-lg font-semibold btn-magnetic group flex items-center gap-3"
                    >
                        <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                            Candidati per lavorare con me
                        </span>
                        <svg
                            className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
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
        </section>
    );
};

export default Hero;
