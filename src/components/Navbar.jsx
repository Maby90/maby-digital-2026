import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const links = [
    { to: '/#chi-sono', label: 'Chi sono' },
    { to: '/#servizi', label: 'Servizi' },
    { to: '/#metodo', label: 'Metodo' },
    { to: '/#progetti', label: 'Progetti' },
    { to: '/newsletter', label: 'Newsletter' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setOpen(false); }, [location.pathname]);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'}`}
        >
            <nav className="container-edge flex items-center justify-between h-14">
                <Link to="/" className="flex items-center gap-2 group shrink-0">
                    <span className="w-7 h-7 shrink-0 rounded-md bg-mint/15 border border-mint/30 grid place-items-center font-mono text-[13px] leading-none font-bold text-mint">m</span>
                    <span className="font-medium tracking-tight text-fg leading-none whitespace-nowrap">Maby Prochilo</span>
                </Link>

                <div className="hidden md:flex items-center gap-1 text-sm">
                    {links.map(l => {
                        const cls = "px-3 py-1.5 rounded-md text-mute hover:text-fg hover:bg-surface/60 transition-colors";
                        return l.to.startsWith('/#')
                            ? <a key={l.to} href={l.to} className={cls}>{l.label}</a>
                            : <Link key={l.to} to={l.to} className={cls}>{l.label}</Link>;
                    })}
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                        className="btn-primary text-xs py-2 px-4"
                    >
                        Proponi un progetto <ArrowUpRight size={14} />
                    </button>
                </div>

                <button
                    className="md:hidden p-2 -mr-2 text-fg"
                    onClick={() => setOpen(o => !o)}
                    aria-label="Menu"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {open && (
                <div className="md:hidden border-t border-line bg-bg">
                    <div className="container-edge py-5 flex flex-col gap-4">
                        {links.map(l => (
                            l.to.startsWith('/#')
                                ? <a key={l.to} href={l.to} className="text-mute hover:text-fg">{l.label}</a>
                                : <Link key={l.to} to={l.to} className="text-mute hover:text-fg">{l.label}</Link>
                        ))}
                        <div className="flex items-center gap-3 pt-2">
                            <ThemeToggle />
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                                className="btn-primary text-xs flex-1 justify-center"
                            >
                                Proponi un progetto <ArrowUpRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
