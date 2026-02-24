import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const container = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // More daring and dramatic entrance for elements
            gsap.from('.about-element', {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
                y: 60,
                scale: 0.9,
                rotationX: -10,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
                transformOrigin: "center bottom"
            });

            // Stronger parallax for the image container
            gsap.to('.about-img', {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: -60,
                scale: 1.05,
                ease: "none"
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background relative" id="chi-sono">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center mt-12 mb-12">

                {/* Image Side */}
                <div className="w-full lg:w-5/12 perspective-[1000px] about-element">
                    <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border border-dark/10 about-img">
                        <img
                            src="/maby-profile.jpg"
                            alt="Maby Prochilo - Digital Strategist"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"></div>

                        {/* Magnetic badge */}
                        <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-background/90 backdrop-blur-md border border-dark/10 flex flex-col gap-1">
                            <span className="font-heading font-bold text-lg text-primary">Maby Prochilo</span>
                            <span className="font-sans text-sm text-dark/60 font-medium">Digital Strategist</span>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-7/12 flex flex-col justify-center">
                    <div className="about-element flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-accent"></div>
                        <span className="font-mono text-sm tracking-widest text-accent uppercase">Chi sono</span>
                    </div>

                    <h2 className="about-element font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary mb-8 leading-[1.1]">
                        Costruisco ecosistemi, <br />non campagne isolate.
                    </h2>

                    <div className="about-element prose prose-lg prose-slate font-sans text-dark/70 leading-relaxed max-w-none space-y-6">
                        <p className="about-element">
                            Sono una digital strategist specializzata nella progettazione di architetture di marketing per liberi professionisti, PMI e aziende B2B. Il mio approccio si basa sulla creazione di asset integrati capaci di generare un posizionamento inattaccabile in modo etico.
                        </p>
                        <p className="about-element">
                            Per anni ho disegnato case e studiato architettura, ma sentivo che i confini fisici dei muri mi stavano stretti. Così ho deciso di stravolgere tutto, portando quella stessa passione per il design e la progettazione nel mondo digitale, ma con molta più libertà creativa e dinamismo. Invece di edifici di cemento, oggi progetto ecosistemi flessibili.
                        </p>
                        <p className="about-element">
                            Lavorando a stretto contatto con piccole realtà emergenti ho imparato che i social media e il marketing non servono a "urlare" più forte degli altri, ma sono strumenti reali per collegare bisogni profondi a soluzioni funzionali. Il marketing più efficace è umano, autentico e costruito per durare nel tempo, non per bruciare budget in vanity metrics.
                        </p>
                        <p className="about-element">
                            Oggi collaboro in co-creazione con i miei clienti per sviluppare percorsi strategici avanzati, integrando processi AI intelligenti che automatizzano la routine e liberano la creatività. Parallelamente, sviluppo progetti miei: ho programmato e lanciato da sola sull'App Store <em>LearnCast</em>, il primo podcast personalizzato in Italia. Non mi limito a erogare consulenze standardizzate, ma sviluppo interi ecosistemi orientati alla scalabilità e al valore reale.
                        </p>
                    </div>

                    <div className="mt-12 pt-12 border-t border-dark/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <div className="about-element">
                            <div className="font-mono font-bold text-2xl text-accent mb-1">+7y</div>
                            <div className="font-sans text-sm text-dark/50">Di esperienza nel digitale</div>
                        </div>
                        <div className="about-element">
                            <div className="font-mono font-bold text-2xl text-accent mb-1">Human</div>
                            <div className="font-sans text-sm text-dark/50">Marketing etico senza forzature</div>
                        </div>
                        <div className="about-element">
                            <div className="font-mono font-bold text-2xl text-accent mb-1">Asset</div>
                            <div className="font-sans text-sm text-dark/50">Focus sulla scalabilità</div>
                        </div>
                        <div className="about-element">
                            <div className="font-mono font-bold text-2xl text-accent mb-1">AI Gen.</div>
                            <div className="font-sans text-sm text-dark/50">Integrazione tool autonomi</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
