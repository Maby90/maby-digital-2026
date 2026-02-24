import React from 'react';

const Action = () => {
    return (
        <section className="w-full bg-primary text-background py-32 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[1px] border-background animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-[1px] border-background animate-[spin_40s_linear_infinite_reverse]"></div>
            </div>

            <div className="relative z-10 max-w-4xl flex flex-col items-center gap-12">
                <h2 className="font-heading font-medium text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-balance">
                    Iniziamo a <br />
                    <span className="font-drama italic font-light text-accent">Costruire?</span>
                </h2>

                <p className="font-sans text-lg md:text-xl text-background/70 max-w-2xl text-balance">
                    Automatizza l'operatività, scala l'acquisizione e costruisci un posizionamento inattaccabile. Inizia la trasformazione oggi.
                </p>

                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                    className="mt-8 bg-accent text-background px-12 py-6 rounded-full font-sans text-xl md:text-2xl font-bold btn-magnetic group flex items-center gap-4 shadow-[0_0_40px_rgba(204,88,51,0.3)] hover:shadow-[0_0_60px_rgba(204,88,51,0.5)] transition-shadow"
                >
                    <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                        Proponi un progetto
                    </span>
                    <svg
                        className="w-8 h-8 relative z-10 group-hover:translate-x-2 transition-transform duration-300"
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
        </section>
    );
};

export default Action;
