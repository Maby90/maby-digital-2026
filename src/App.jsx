import React, { useLayoutEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Action from './components/Action';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import ThankYou from './components/ThankYou';
import NotFound from './components/NotFound';
import Sentiero from './components/Sentiero';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const container = useRef();

  useLayoutEffect(() => {
    // A context for global GSAP animations
    const ctx = gsap.context(() => {
      // Setup global defaults
      gsap.defaults({
        ease: "power3.out"
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="relative w-full text-dark">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Philosophy />
        <Protocol />
        <Action />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/grazie" element={<ThankYou />} />
        <Route path="/sentiero" element={<Sentiero />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ContactModal />
    </BrowserRouter>
  );
}

export default App;
