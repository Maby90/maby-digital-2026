import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 rounded-full px-6 py-3 flex items-center justify-between gap-8 md:gap-16
        ${scrolled
                    ? 'bg-background/80 backdrop-blur-xl border border-dark/10 shadow-lg'
                    : 'bg-transparent text-background'
                }
      `}
        >
            <div className="font-heading font-bold text-lg tracking-tight whitespace-nowrap">
                Maby Prochilo
            </div>

            <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
                <a href="#chi-sono" className="interactive-link hover:text-accent transition-colors">Chi sono</a>
                <a href="#metodo" className="interactive-link hover:text-accent transition-colors">Metodo</a>
                <a href="#servizi" className="interactive-link hover:text-accent transition-colors">Servizi</a>
            </div>

            <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                className="bg-accent text-background px-5 py-2 rounded-full font-sans text-sm font-semibold btn-magnetic group"
            >
                <span className="relative z-10 group-hover:text-background transition-colors duration-300">Proponi un progetto</span>
            </button>
        </nav>
    );
};

export default Navbar;
