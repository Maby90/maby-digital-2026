import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

const ThankYou = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-[1px] border-accent animate-[spin_60s_linear_infinite]"></div>
            </div>

            <div className="relative z-10 max-w-2xl bg-white border border-dark/10 shadow-2xl rounded-[3rem] p-12 md:p-16 flex flex-col items-center text-center animate-in zoom-in-95 duration-700 fade-in slide-in-from-bottom-8">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
                    <CheckCircle2 size={40} className="text-accent relative z-10" />
                </div>

                <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-6">
                    Candidatura <span className="font-drama italic font-light text-accent">Ricevuta</span>
                </h1>

                <p className="font-sans text-lg text-dark/70 mb-10 max-w-lg leading-relaxed">
                    Grazie per avermi raccontato il tuo progetto. Analizzerò le tue risposte e ti ricontatterò al più presto per farti sapere se ci sono i presupposti per lavorare insieme.
                </p>

                <div className="w-full h-[1px] bg-dark/10 mb-10"></div>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-dark font-sans font-medium hover:text-accent transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Torna alla Home
                </Link>
            </div>
        </section>
    );
};

export default ThankYou;
