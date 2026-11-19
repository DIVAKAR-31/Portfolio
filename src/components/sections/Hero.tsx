import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Send,
  Github,
  Linkedin,
  Sparkles,
  Cpu,
  GraduationCap,
  Code2,
  Terminal,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { MagneticButton } from '../common/MagneticButton';
import { Card3D } from '../common/Card3D';

export const Hero: React.FC = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  // Rotating title every 2.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % personalInfo.rotatingTitles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const headlineWords = personalInfo.tagline.split(' ');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-gradient-radial from-blue-600/15 via-cyan-500/05 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-electricBlue/30 text-xs font-mono text-cyanAccent tracking-wide backdrop-blur-md shadow-neon-blue"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyanAccent"></span>
              </span>
              <span>Available for Technical Projects • SKCET</span>
            </motion.div>

            {/* Salutation & Name with Cinematic Reveal */}
            <div className="space-y-1">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm md:text-base font-mono text-electricBlue tracking-widest uppercase"
                >
                  Hello, I'm
                </motion.p>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight dark:text-white text-slate-900 leading-[1.1]"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-white dark:via-slate-100 dark:to-sky-200 from-slate-900 via-blue-900 to-sky-700">
                    {personalInfo.name}
                  </span>
                </motion.h1>
              </div>
            </div>

            {/* Main Headline with Staggered Word Reveal */}
            <div className="flex flex-wrap gap-x-2.5 gap-y-1">
              {headlineWords.map((word, wIdx) => (
                <div key={wIdx} className="overflow-hidden inline-block">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.28 + wIdx * 0.08,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight inline-block text-transparent bg-clip-text bg-gradient-to-r from-electricBlue via-cyanAccent to-blue-500"
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Animated Rotating Role Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="h-10 flex items-center"
            >
              <span className="text-xs sm:text-sm font-mono dark:text-mutedText text-slate-500 mr-2 tracking-wider uppercase">
                Focus Area &gt;
              </span>
              <div className="relative overflow-hidden h-9 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="font-mono text-base sm:text-lg font-bold text-cyanAccent tracking-wide"
                  >
                    {personalInfo.rotatingTitles[titleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Professional Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base dark:text-mutedText text-slate-600 leading-relaxed max-w-2xl font-sans"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTAs and Working Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                variant="primary"
                href="#projects"
                className="group"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                href="#contact"
              >
                <span>Contact Me</span>
                <Send className="w-4 h-4 text-cyanAccent" />
              </MagneticButton>

              {/* Working GitHub and LinkedIn Links */}
              <div className="flex items-center gap-2.5 sm:ml-2">
                <MagneticButton
                  variant="ghost"
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  ariaLabel="Divakar S. GitHub"
                  className="!p-0 w-11 h-11 rounded-xl bg-darkCard/80 border border-electricBlue/30 hover:border-cyanAccent flex items-center justify-center text-mutedText hover:text-white hover:bg-slate-800 transition-all shadow-md group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </MagneticButton>

                <MagneticButton
                  variant="ghost"
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  ariaLabel="Divakar S. LinkedIn"
                  className="!p-0 w-11 h-11 rounded-xl bg-darkCard/80 border border-electricBlue/30 hover:border-cyanAccent flex items-center justify-center text-mutedText hover:text-white hover:bg-slate-800 transition-all shadow-md group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </MagneticButton>
              </div>
            </motion.div>

            {/* Quick Spec Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-800/80 max-w-xl"
            >
              <div className="p-2.5 rounded-lg bg-darkCard/40 border border-slate-800 hover:border-electricBlue/30 transition-colors">
                <div className="text-xs font-mono text-mutedText">Institution</div>
                <div className="text-xs sm:text-sm font-semibold text-lightWhite truncate">SKCET</div>
              </div>
              <div className="p-2.5 rounded-lg bg-darkCard/40 border border-slate-800 hover:border-cyanAccent/30 transition-colors">
                <div className="text-xs font-mono text-mutedText">Department</div>
                <div className="text-xs sm:text-sm font-semibold text-cyanAccent truncate">B.Tech IT</div>
              </div>
              <div className="p-2.5 rounded-lg bg-darkCard/40 border border-slate-800 hover:border-emerald-500/30 transition-colors">
                <div className="text-xs font-mono text-mutedText">Academic CGPA</div>
                <div className="text-xs sm:text-sm font-semibold text-emerald-400">9.2 / 10</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Original Profile Photo Presentation with 3D Tilt */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
            >
              <Card3D maxTilt={6} scaleHover={1.015}>
                {/* Main Portrait Frame Card */}
                <div className="relative rounded-[1.75rem] glass-panel p-3.5 sm:p-4 border-2 border-electricBlue/40 group-hover:border-cyanAccent shadow-[0_12px_45px_-10px_rgba(56,189,248,0.35)] group-hover:shadow-[0_16px_55px_-8px_rgba(34,211,238,0.45)] transition-all duration-500 bg-darkCard/80 backdrop-blur-xl overflow-hidden">
                  
                  {/* Top Telemetry Header */}
                  <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-slate-800/80 text-[11px] font-mono text-mutedText">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyanAccent animate-pulse" />
                      <span className="text-cyanAccent font-semibold tracking-wider">OFFICIAL PROFILE</span>
                    </div>
                    <span className="text-slate-400">SKCET • IT</span>
                  </div>

                  {/* Portrait Container */}
                  <div className="relative w-full aspect-[4/5] sm:h-[430px] rounded-2xl overflow-hidden bg-slate-900 border border-electricBlue/20 shadow-inner group">
                    {/* The Original Photograph */}
                    <img
                      src={personalInfo.profileImage}
                      alt="Divakar S. - B.Tech Information Technology Student at SKCET"
                      className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="eager"
                    />

                    {/* Subtle Gradient Vignette at Bottom for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-darkBg/90 via-darkBg/20 to-transparent pointer-events-none" />

                    {/* Futuristic Corner Bracket Markers */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyanAccent shadow-sm pointer-events-none" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyanAccent shadow-sm pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyanAccent shadow-sm pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyanAccent shadow-sm pointer-events-none" />

                    {/* Floating Identity Overlay Badge */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-darkBg/85 backdrop-blur-md border border-electricBlue/30 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-sans">
                            {personalInfo.name}
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          </h3>
                          <p className="text-[11px] font-mono text-cyanAccent">
                            B.Tech Information Technology
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                            Campus
                          </span>
                          <span className="text-[11px] font-semibold text-slate-200">
                            SKCET
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Specifications Bar */}
                  <div className="mt-3 grid grid-cols-3 gap-2 px-1">
                    <div className="py-2 px-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-center">
                      <div className="text-[10px] font-mono text-mutedText uppercase">Degree</div>
                      <div className="text-xs font-semibold text-slate-200 truncate">B.Tech IT</div>
                    </div>
                    <div className="py-2 px-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-center">
                      <div className="text-[10px] font-mono text-mutedText uppercase">Domain</div>
                      <div className="text-xs font-semibold text-cyanAccent truncate">AI & Dev</div>
                    </div>
                    <div className="py-2 px-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-center">
                      <div className="text-[10px] font-mono text-mutedText uppercase">Location</div>
                      <div className="text-xs font-semibold text-slate-200 truncate">Coimbatore</div>
                    </div>
                  </div>

                </div>
              </Card3D>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
