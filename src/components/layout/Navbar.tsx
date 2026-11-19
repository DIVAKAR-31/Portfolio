import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

interface NavbarProps {
  onReplayIntro?: () => void;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Workshops', href: '#workshops' },
  { name: 'Hackathons', href: '#hackathons' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onReplayIntro }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-darkBg/85 backdrop-blur-md border-b border-electricBlue/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Divakar S. Portfolio Home"
          >
            {/* Holographic Logo Mark */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-electricBlue/20 to-primaryBlue/20 border border-electricBlue/40 flex items-center justify-center overflow-hidden group-hover:border-cyanAccent transition-colors">
              <span className="font-mono font-bold text-sm text-cyanAccent tracking-tighter">
                D<span className="text-electricBlue">S</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-cyanAccent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-wider text-lightWhite group-hover:text-cyanAccent transition-colors flex items-center gap-1.5">
                DIVAKAR S.
                <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent animate-pulse" />
              </span>
              <span className="text-[10px] font-mono text-mutedText tracking-widest uppercase">
                B.Tech IT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-darkCard/50 border border-electricBlue/15 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-all rounded-full ${
                    isActive
                      ? 'text-cyanAccent font-semibold'
                      : 'text-mutedText hover:text-lightWhite hover:bg-slate-800/40'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-electricBlue/15 border border-cyanAccent/40 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Buttons & Socials */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Replay Intro Button */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                title="Replay Cinematic Comet Intro"
                aria-label="Replay Cinematic Comet Intro"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-electricBlue/20 text-xs text-mutedText hover:text-cyanAccent hover:border-cyanAccent/50 transition-all group"
              >
                <Sparkles className="w-3.5 h-3.5 text-electricBlue group-hover:rotate-12 transition-transform" />
                <span className="font-mono text-[11px]">Replay Intro</span>
              </button>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
                className="w-8 h-8 rounded-lg bg-darkCard/70 border border-slate-700/60 flex items-center justify-center text-mutedText hover:text-white hover:border-electricBlue transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
                className="w-8 h-8 rounded-lg bg-darkCard/70 border border-slate-700/60 flex items-center justify-center text-mutedText hover:text-white hover:border-electricBlue transition-all shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Contact CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contact');
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primaryBlue to-sky-500 hover:from-blue-600 hover:to-cyan-400 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-neon-blue border border-electricBlue/30 hover:scale-105"
            >
              Contact Me
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                title="Replay Intro"
                aria-label="Replay Intro"
                className="p-2 rounded-lg bg-darkCard/70 border border-electricBlue/20 text-cyanAccent"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-darkCard border border-electricBlue/30 text-lightWhite hover:text-cyanAccent hover:border-cyanAccent transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-darkBgSecondary/95 backdrop-blur-2xl border-b border-electricBlue/20 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-electricBlue/15 text-cyanAccent border border-cyanAccent/30'
                        : 'text-mutedText hover:text-lightWhite hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-darkCard border border-slate-700/60 text-mutedText hover:text-white"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-darkCard border border-slate-700/60 text-mutedText hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#contact');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primaryBlue to-sky-500 text-white text-xs font-semibold tracking-wider uppercase shadow-neon-blue"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

