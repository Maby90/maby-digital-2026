import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-dark text-background pt-24 pb-12 px-6 md:px-12 lg:px-24 rounded-t-[4rem] -mt-16 relative z-30">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-background/10 pb-16">
                    <div className="flex flex-col gap-6 max-w-sm">
                        <h3 className="font-heading font-bold text-3xl tracking-tight">Maby Prochilo</h3>
                        <p className="font-sans text-background/50 text-sm leading-relaxed">
                            Digital Strategist specializzata in acquisizione clienti, personal branding e automazioni AI per aziende ambiziose.
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2">
                        <a href="mailto:hello@mprochilo.it" className="font-heading text-xl md:text-2xl hover:text-accent transition-colors interactive-link">
                            hello@mprochilo.it
                        </a>
                        <div className="flex items-center gap-3 mt-4 px-4 py-2 rounded-full border border-background/10 bg-background/5">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#81C784] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#81C784]"></span>
                            </div>
                            <span className="font-mono text-xs uppercase tracking-widest text-[#81C784]">System Operational</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs text-background/40">
                    <p>© {new Date().getFullYear()} Maby Prochilo. Tutti i diritti riservati.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" className="hover:text-background transition-colors interactive-link">Privacy Policy</Link>
                        <a href="https://www.linkedin.com/in/maby-prochilo/" className="hover:text-background transition-colors interactive-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
