import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-surface/40 border-t border-line text-fg">
            <div className="container-edge pt-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 pb-16 border-b border-line">
                    <div className="md:col-span-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-7 h-7 rounded-md bg-mint/15 border border-mint/30 flex items-center justify-center font-mono text-[13px] font-bold text-mint">m</span>
                            <span className="font-medium tracking-tight">Maby Prochilo</span>
                        </div>
                        <p className="text-mute text-sm leading-relaxed max-w-md">
                            Digital Strategist specializzata in acquisizione clienti, personal branding e automazioni AI per aziende ambiziose.
                        </p>
                        <a href="mailto:hello@mprochilo.it" className="mt-6 inline-flex items-center gap-2 font-mono text-mint hover:text-mint/80 transition-colors">
                            $ <span className="text-fg">contact</span> hello@mprochilo.it
                        </a>
                        <div className="mt-6 pill inline-flex">
                            <span className="pill-dot" />
                            System Operational
                        </div>
                    </div>

                    <div className="md:col-span-3 md:col-start-8">
                        <p className="eyebrow mb-4">Naviga</p>
                        <ul className="space-y-2.5 text-sm text-mute">
                            <li><a href="/#chi-sono" className="hover:text-fg transition-colors">Chi sono</a></li>
                            <li><a href="/#servizi" className="hover:text-fg transition-colors">Servizi</a></li>
                            <li><a href="/#metodo" className="hover:text-fg transition-colors">Metodo</a></li>
                            <li><Link to="/newsletter" className="hover:text-fg transition-colors">Newsletter</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <p className="eyebrow mb-4">Altrove</p>
                        <ul className="space-y-2.5 text-sm text-mute">
                            <li><a href="https://www.linkedin.com/in/maby-prochilo/" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">LinkedIn ↗</a></li>
                            <li><a href="https://oltreilprompt.substack.com/" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">Substack ↗</a></li>
                            <li><Link to="/privacy" className="hover:text-fg transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-3 pt-6 font-mono text-[11px] tracking-wider text-dim">
                    <span>© {new Date().getFullYear()} Maby Prochilo · P.IVA 03068590805</span>
                    <span>Built in IT · Deployed on Vercel</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
