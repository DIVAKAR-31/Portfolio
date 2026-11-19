import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
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
import { Contact } from './components/sections/Contact';

const PortfolioContent: React.FC = () => {
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
    <div className="relative min-h-screen dark:bg-darkBg bg-lightBg dark:text-lightWhite text-slate-900 selection:bg-electricBlue selection:text-darkBg font-sans transition-colors duration-300">
      {/* Signature Cinematic Comet Intro */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <CinematicIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Interactive Custom Glowing Cursor (Sleek slight shine, no bubbles) */}
      <CustomCursor />

      {/* Cosmic Starfield & Ambient Lighting Background */}
      <BackgroundStarfield />

      {/* Navigation Bar with Theme Toggle */}
      <Navbar onReplayIntro={handleReplayIntro} />

      {/* Main Content Flow (Certifications removed) */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Workshops />
        <Hackathons />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
};

export default App;
