import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Github,
  Linkedin,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
          ? 'py-3 dark:bg-darkBg/85 bg-white/85 backdrop-blur-md border-b dark:border-electricBlue/15 border-slate-200 shadow-sm'
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
              <span className="font-extrabold text-base tracking-wider dark:text-lightWhite text-slate-900 group-hover:text-cyanAccent transition-colors flex items-center gap-1.5">
                DIVAKAR S.
                <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent animate-pulse" />
              </span>
              <span className="text-[10px] font-mono text-mutedText tracking-widest uppercase">
                B.Tech IT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 dark:bg-darkCard/50 bg-slate-100/70 border dark:border-electricBlue/15 border-slate-200 rounded-full px-4 py-1.5 backdrop-blur-md">
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
                      : 'dark:text-mutedText text-slate-600 dark:hover:text-lightWhite hover:text-slate-900 hover:bg-slate-200/50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 dark:bg-electricBlue/15 bg-blue-500/10 border dark:border-cyanAccent/40 border-blue-500/30 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Buttons, Theme Toggle & Socials */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle (Light / Dark) */}
            <motion.button
              whileHover={{ scale: 1.08, rotate: 15 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2 rounded-full dark:bg-slate-900/80 bg-slate-200/80 border dark:border-electricBlue/30 border-slate-300 text-cyanAccent dark:text-cyanAccent transition-all shadow-sm"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </motion.button>

            {/* Social Links */}
            <div className="flex items-center gap-2 pl-2 border-l dark:border-slate-800 border-slate-300">
              <motion.a
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
                className="w-8 h-8 rounded-lg dark:bg-darkCard/70 bg-slate-100 border dark:border-slate-700/60 border-slate-300 flex items-center justify-center dark:text-mutedText text-slate-600 dark:hover:text-white hover:text-slate-900 hover:border-electricBlue transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
                className="w-8 h-8 rounded-lg dark:bg-darkCard/70 bg-slate-100 border dark:border-slate-700/60 border-slate-300 flex items-center justify-center dark:text-mutedText text-slate-600 dark:hover:text-white hover:text-slate-900 hover:border-electricBlue transition-all shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Contact CTA */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contact');
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primaryBlue via-sky-500 to-cyan-400 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-neon-blue border border-electricBlue/30"
            >
              Contact Me
            </motion.a>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 xl:hidden">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg dark:bg-darkCard/70 bg-slate-100 border dark:border-electricBlue/20 border-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl dark:bg-darkCard bg-slate-100 border dark:border-electricBlue/30 border-slate-300 dark:text-lightWhite text-slate-800 hover:text-cyanAccent transition-colors focus:outline-none"
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
            className="xl:hidden dark:bg-darkBgSecondary/95 bg-white/95 backdrop-blur-2xl border-b dark:border-electricBlue/20 border-slate-200 overflow-hidden"
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
                        ? 'dark:bg-electricBlue/15 bg-blue-500/10 text-cyanAccent border dark:border-cyanAccent/30 border-blue-500/30'
                        : 'dark:text-mutedText text-slate-600 dark:hover:text-lightWhite hover:text-slate-900 dark:hover:bg-slate-800/50 hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t dark:border-slate-800/80 border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl dark:bg-darkCard bg-slate-100 border dark:border-slate-700/60 border-slate-300 dark:text-mutedText text-slate-600 hover:text-cyanAccent"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl dark:bg-darkCard bg-slate-100 border dark:border-slate-700/60 border-slate-300 dark:text-mutedText text-slate-600 hover:text-cyanAccent"
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
