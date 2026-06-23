import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import useSeo from '../hooks/useSeo';

const NotFound = () => {
    useSeo({
        path: '/404',
        title: '404 · Pagina non trovata · Maby Prochilo',
        description: 'La pagina che cerchi non esiste. Torna alla home o leggi la newsletter.',
    });
    return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <Navbar />
            <main className="flex-grow relative overflow-hidden flex items-center pt-32 pb-24 border-b border-line">
                <div className="absolute inset-0 grid-bg opacity-30" />

                <div className="relative container-edge w-full">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="pill mb-8 inline-flex">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            HTTP 404 · path not found
                        </span>

                        <h1 className="font-display font-medium text-[120px] md:text-[200px] lg:text-[260px] leading-none tracking-tightest text-fg">
                            <span className="text-mint">4</span>0<span className="text-mint">4</span>
                        </h1>

                        <h2 className="font-display font-medium text-2xl md:text-3xl text-fg mt-6 tracking-tight">
                            Un percorso <span className="text-mint">interrotto</span>.
                        </h2>

                        <p className="mt-6 text-mute text-lg leading-relaxed max-w-lg mx-auto">
                            Non ho trovato quello che cerchi, ma possiamo risalire insieme e costruire la strada giusta.
                        </p>

                        <div className="mt-10">
                            <Link to="/" className="btn-primary inline-flex">
                                <ArrowLeft size={16} /> Torna alla home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFound;
