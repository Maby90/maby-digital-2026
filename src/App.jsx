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
import ScrollFX from './components/ScrollFX';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import Marquee from './components/Marquee';
import PrivacyPolicy from './components/PrivacyPolicy';
import PrivacySfoglia from './components/PrivacySfoglia';
import ThankYou from './components/ThankYou';
import NotFound from './components/NotFound';
import OltreIlPrompt from './components/OltreIlPrompt';
import NewsletterPreview from './components/NewsletterPreview';
import SkillCarosello from './components/SkillCarosello';
import SkillLavagne from './components/SkillLavagne';
import WorkflowCall from './components/WorkflowCall';
import Faq from './components/Faq';
import MiniAppClaudeCode from './components/MiniAppClaudeCode';
import AiNelTuoLavoro from './components/AiNelTuoLavoro';
import Percorso from './components/Percorso';
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
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Philosophy />
        <Marquee />
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
      <SmoothScroll />
      <IntroLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/privacy-sfoglia" element={<PrivacySfoglia />} />
        <Route path="/grazie" element={<ThankYou />} />
        <Route path="/newsletter" element={<OltreIlPrompt />} />
        <Route path="/skill-carosello" element={<SkillCarosello />} />
        <Route path="/skill-lavagne" element={<SkillLavagne />} />
        <Route path="/workflow-call" element={<WorkflowCall />} />
        <Route path="/miniapp-claudecode" element={<MiniAppClaudeCode />} />
        <Route path="/ai-nel-tuo-lavoro" element={<AiNelTuoLavoro />} />
        <Route path="/percorso" element={<Percorso />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ContactModal />
    </BrowserRouter>
  );
}

export default App;
