import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Sentiero = () => {
    const [status, setStatus] = useState('idle');

    // We use a clean native form submission to MailerLite
    const handleSubmit = () => {
        setStatus('submitted');
        // The actual submission is handled natively by the browser to the action URL in a new tab
    };

    return (
        <div className="bg-background min-h-screen text-dark font-sans selection:bg-accent selection:text-background flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-24 px-6 md:px-12 lg:px-24 flex items-center justify-center">
                <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Copywriting Side */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[1px] w-12 bg-accent"></div>
                            <span className="font-mono text-sm tracking-widest text-accent uppercase">Newsletter</span>
                        </div>

                        <h1 className="font-heading font-bold text-5xl md:text-7xl text-primary mb-6 leading-[1.1]">
                            Sentiero
                        </h1>

                        <h2 className="font-sans text-xl md:text-2xl text-dark font-medium mb-6 leading-snug">
                            Il dietro le quinte della comunicazione <span className="text-accent italic font-serif">strategica</span>.
                        </h2>

                        <div className="prose prose-lg prose-slate font-sans text-dark/70 leading-relaxed max-w-none space-y-6">
                            <p>
                                I social sono perfetti per farsi scoprire, ma è nel silenzio di una casella email che si costruisce la vera fiducia.
                            </p>
                            <p>
                                <strong>Sentiero</strong> non è la classica newsletter che intasa la posta con promozioni. È uno spazio confidenziale dove condivido riflessioni, tecniche di posizionamento avanzato e strategie etiche che applico (e vedo funzionare) ogni giorno sui progetti dei miei clienti.
                            </p>
                            <p className="border-l-2 border-accent pl-4 py-1 italic text-dark/60 text-base">
                                Nessun trucchetto magico, solo marketing human-to-human, orientato alla crescita sostenibile. Meno rumore, più sostanza.
                            </p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="bg-[#f8f7f4] rounded-[2rem] p-8 md:p-12 shadow-xl border border-dark/5 relative overflow-hidden group">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 mix-blend-multiply transition-transform duration-700 group-hover:scale-150"></div>

                        <div className="relative z-10">
                            <h3 className="font-heading font-bold text-2xl text-primary mb-2">Unisciti al viaggio</h3>
                            <p className="font-sans text-sm text-dark/60 mb-8">Inserisci i tuoi dati per ricevere le prossime uscite.</p>

                            {status === 'idle' ? (
                                <form
                                    className="flex flex-col gap-5"
                                    action="https://assets.mailerlite.com/jsonp/1062356/forms/180365881692390887/subscribe"
                                    method="post"
                                    target="_blank"
                                    onSubmit={handleSubmit}
                                >
                                    <div>
                                        <label htmlFor="name" className="sr-only">Nome</label>
                                        <input
                                            id="name"
                                            aria-label="name"
                                            type="text"
                                            name="fields[name]"
                                            placeholder="Il tuo nome"
                                            autoComplete="given-name"
                                            required
                                            className="w-full bg-white text-dark placeholder:text-dark/30 border border-dark/10 rounded-xl px-5 py-4 font-sans text-base focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input
                                            id="email"
                                            aria-label="email"
                                            aria-required="true"
                                            type="email"
                                            name="fields[email]"
                                            placeholder="La tua migliore email"
                                            autoComplete="email"
                                            required
                                            className="w-full bg-white text-dark placeholder:text-dark/30 border border-dark/10 rounded-xl px-5 py-4 font-sans text-base focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                        />
                                    </div>

                                    {/* MailerLite Hidden Fields */}
                                    <input type="hidden" name="ml-submit" value="1" />
                                    <input type="hidden" name="anticsrf" value="true" />

                                    <button
                                        type="submit"
                                        className="mt-2 w-full bg-accent text-background px-8 py-4 rounded-xl font-sans text-lg font-bold btn-magnetic group flex items-center justify-center gap-3 shadow-lg shadow-accent/20 hover:shadow-accent/40"
                                    >
                                        <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                                            Iscriviti ora
                                        </span>
                                        <svg
                                            className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </button>
                                    <p className="text-center font-sans text-xs text-dark/40 mt-2">
                                        Nessuno spam, promesso. Puoi disiscriverti in qualsiasi momento.
                                    </p>
                                </form>
                            ) : (
                                <div className="bg-white/50 border border-accent/20 rounded-2xl p-6 text-center animate-fade-in">
                                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h4 className="font-heading font-bold text-xl text-primary mb-2">Quasi fatto!</h4>
                                    <p className="font-sans text-sm text-dark/70">
                                        Completa l'iscrizione nella nuova scheda che si è aperta. Ti aspetto su Sentiero!
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-6 text-accent font-sans text-sm font-semibold hover:underline"
                                    >
                                        Torna indietro
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Sentiero;
