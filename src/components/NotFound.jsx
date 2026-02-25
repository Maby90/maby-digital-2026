import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const NotFound = () => {
    return (
        <div className="bg-background min-h-screen text-dark font-sans selection:bg-accent selection:text-background flex flex-col">
            <Navbar />

            <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
                    <div className="relative">
                        <h1 className="font-heading font-black text-9xl md:text-[12rem] text-dark/5 leading-none tracking-tighter mix-blend-multiply">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary text-center leading-tight">
                                Un percorso <span className="font-drama italic font-light text-accent">interrotto</span>.
                            </h2>
                        </div>
                    </div>

                    <p className="font-sans text-lg md:text-xl text-dark/70 max-w-lg leading-relaxed mt-4">
                        Non ho trovato quello che cerchi, ma possiamo risalire insieme e costruire la strada giusta.
                    </p>

                    <Link
                        to="/"
                        className="mt-8 bg-accent text-background px-8 py-4 rounded-full font-sans text-lg font-bold btn-magnetic transition-all hover:bg-opacity-90 hover:scale-105 inline-flex items-center justify-center gap-3"
                    >
                        <span>Torna alla Home</span>
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFound;
