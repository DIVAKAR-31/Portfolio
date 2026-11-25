import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, MapPin, Sparkles, Heart } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-darkBgSecondary/80 border-t border-electricBlue/15 pt-16 pb-12 overflow-hidden">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyanAccent/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-12 bg-cyanAccent/5 blur-xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Identity Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electricBlue/20 to-primaryBlue/20 border border-electricBlue/40 flex items-center justify-center">
                <span className="font-mono font-bold text-base text-cyanAccent">DS</span>
              </div>
              <div>
                <h3 className="font-extrabold text-xl tracking-wider text-white">
                  DIVAKAR S.
                </h3>
                <p className="text-xs font-mono text-cyanAccent/80">
                  {personalInfo.title}
                </p>
              </div>
            </div>

            <p className="text-sm text-mutedText leading-relaxed max-w-sm">
              {personalInfo.tagline} Crafting intelligent software, responsive interfaces, and data-driven systems with modern engineering excellence.
            </p>

            <div className="flex items-center gap-2 text-xs text-mutedText">
              <MapPin className="w-4 h-4 text-electricBlue shrink-0" />
              <span>{personalInfo.college}, {personalInfo.location}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono tracking-widest uppercase text-cyanAccent">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs dark:text-mutedText text-slate-600">
              <li><a href="#home" className="hover:text-cyanAccent transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-cyanAccent transition-colors">About Me</a></li>
              <li><a href="#education" className="hover:text-cyanAccent transition-colors">Education</a></li>
              <li><a href="#skills" className="hover:text-cyanAccent transition-colors">Skills</a></li>
              <li><a href="#projects" className="hover:text-cyanAccent transition-colors">Projects</a></li>
              <li><a href="#certifications" className="hover:text-cyanAccent transition-colors">Certifications</a></li>
              <li><a href="#contact" className="hover:text-cyanAccent transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect & Status */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono tracking-widest uppercase text-cyanAccent">
              Connect With Me
            </h4>
            <p className="text-xs text-mutedText">
              Feel free to reach out for project collaborations, technical discussions, or opportunities.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-darkCard border border-slate-700/80 flex items-center justify-center text-mutedText hover:text-white hover:border-electricBlue transition-all shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-darkCard border border-slate-700/80 flex items-center justify-center text-mutedText hover:text-white hover:border-electricBlue transition-all shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 rounded-xl bg-darkCard border border-slate-700/80 flex items-center justify-center text-mutedText hover:text-white hover:border-cyanAccent transition-all shadow-sm"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Futuristic Live Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Technical Projects & Internships</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mutedText">
          <p className="font-mono text-center sm:text-left">
            © {new Date().getFullYear()} Divakar S. Designed with precision & futuristic motion.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-darkCard border border-electricBlue/20 text-mutedText hover:text-cyanAccent hover:border-cyanAccent/50 transition-all text-xs font-mono"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-electricBlue" />
          </button>
        </div>
      </div>
    </footer>
  );
};

