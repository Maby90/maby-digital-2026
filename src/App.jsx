import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Projects from './components/Projects';
import Action from './components/Action';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import IntroLoader from './components/IntroLoader';
import CustomCursor from './components/CustomCursor';
import ScrollFX from './components/ScrollFX';
import PrivacyPolicy from './components/PrivacyPolicy';
import ThankYou from './components/ThankYou';
import NotFound from './components/NotFound';
import OltreIlPrompt from './components/OltreIlPrompt';
import NewsletterPreview from './components/NewsletterPreview';
import SkillCarosello from './components/SkillCarosello';
import WorkflowCall from './components/WorkflowCall';
import Faq from './components/Faq';
import MiniAppClaudeCode from './components/MiniAppClaudeCode';
import useSeo from './hooks/useSeo';

function Home() {
  useSeo({
    path: '/',
    title: 'Maby Prochilo · Sistemi AI per aziende: agenti, automazioni, Claude Code',
    description: 'Progetto e installo sistemi AI per freelance, PMI e team B2B: agenti, automazioni e skill su Claude Code che tolgono lavoro ripetitivo. Con un occhio al marketing.',
  });
  return (
    <div className="relative w-full bg-bg text-fg">
      <ScrollFX />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Philosophy />
        <Protocol />
        <Projects />
        <NewsletterPreview />
        <Faq />
        <Action />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <IntroLoader />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/grazie" element={<ThankYou />} />
        <Route path="/newsletter" element={<OltreIlPrompt />} />
        <Route path="/skill-carosello" element={<SkillCarosello />} />
        <Route path="/workflow-call" element={<WorkflowCall />} />
        <Route path="/miniapp-claudecode" element={<MiniAppClaudeCode />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ContactModal />
    </BrowserRouter>
  );
}

export default App;
