import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CinematicIntro } from './components/intro/CinematicIntro';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BackgroundStarfield } from './components/layout/BackgroundStarfield';
import { CustomCursor } from './components/layout/CustomCursor';
import { BackToTop } from './components/common/BackToTop';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Education } from './components/sections/Education';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Workshops } from './components/sections/Workshops';
import { Hackathons } from './components/sections/Hackathons';
import { Certifications } from './components/sections/Certifications';
import { Contact } from './components/sections/Contact';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    // Check if intro was already played in this browsing session
    const introSeen = sessionStorage.getItem('divakar_portfolio_intro_seen');
    return !introSeen;
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('divakar_portfolio_intro_seen', 'true');
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowIntro(true);
  };

  return (
    <div className="relative min-h-screen bg-darkBg text-lightWhite selection:bg-electricBlue selection:text-darkBg font-sans">
      {/* Signature Cinematic Comet Intro */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <CinematicIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Interactive Custom Glowing Cursor */}
      <CustomCursor />

      {/* Cosmic Starfield & Ambient Lighting Background */}
      <BackgroundStarfield />

      {/* Navigation Bar */}
      <Navbar onReplayIntro={handleReplayIntro} />

      {/* Main Content Flow */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Workshops />
        <Hackathons />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default App;

