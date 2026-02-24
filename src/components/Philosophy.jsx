import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
    const container = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        // A simple fade-up animation for the text lines when scrolling into view
        const ctx = gsap.context(() => {
            gsap.from('.reveal-line', {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 60%",
                    end: "bottom 80%",
                    scrub: 1, // Tie animation to scroll
                },
                y: 40,
                opacity: 0,
                stagger: 0.2,
                ease: "power2.out"
            });

            // Parallax effect for the background image
            gsap.to('.parallax-bg', {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
                yPercent: 20,
                ease: "none"
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={container}
            className="relative w-full min-h-[80vh] flex items-center bg-dark overflow-hidden py-32 px-6 md:px-12 lg:px-24"
        >
            {/* Background Image with Parallax */}
            <div className="absolute inset-x-0 -top-[20%] h-[140%] z-0 parallax-bg opacity-20">
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                    alt="Abstract dark organic lines"
                    className="w-full h-full object-cover"
                />
                {/* Adds a gradient to blend smoothly with adjacent sections if needed */}
                <div className="absolute inset-0 bg-dark/40"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto w-full" ref={textRef}>
                <div className="flex flex-col gap-12 md:gap-16">
                    <p className="reveal-line font-sans text-xl md:text-2xl text-background/60 leading-relaxed max-w-2xl">
                        La maggior parte delle agenzie si concentra su: <br />
                        <span className="text-background/90 tracking-wide">tattiche a breve termine e automazioni senza anima.</span>
                    </p>

                    <h2 className="reveal-line font-heading font-medium text-4xl md:text-5xl lg:text-7xl text-background leading-[1.1] max-w-4xl tracking-tight">
                        Io mi concentro su: <br className="hidden md:block" />
                        <span className="font-drama italic font-light text-accent text-6xl md:text-7xl lg:text-8xl">Crescita</span> <br className="hidden md:block" />
                        guidata dall'identità.
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
