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
  Upload,
  User
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { MagneticButton } from '../common/MagneticButton';

export const Hero: React.FC = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Rotating title every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % personalInfo.rotatingTitles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-electricBlue/30 text-xs font-mono text-cyanAccent tracking-wide backdrop-blur-md shadow-neon-blue"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyanAccent"></span>
              </span>
              <span>Available for Technical Projects • SKCET</span>
            </motion.div>

            {/* Salutation & Name */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1"
            >
              <p className="text-sm md:text-base font-mono text-electricBlue tracking-widest uppercase">
                Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-200">
                  {personalInfo.name}
                </span>
              </h1>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-electricBlue via-cyanAccent to-blue-400"
            >
              {personalInfo.tagline}
            </motion.h2>

            {/* Animated Rotating Role Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="h-10 flex items-center"
            >
              <span className="text-xs sm:text-sm font-mono text-mutedText mr-2 tracking-wider uppercase">
                Focus Area &gt;
              </span>
              <div className="relative overflow-hidden h-9 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-mono text-base sm:text-lg font-bold text-cyanAccent tracking-wide"
                  >
                    {personalInfo.rotatingTitles[titleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Professional Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base text-mutedText leading-relaxed max-w-2xl font-sans"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTAs and Working Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                variant="primary"
                href="#projects"
                className="group"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Divakar S. GitHub"
                  className="w-11 h-11 rounded-xl bg-darkCard/80 border border-electricBlue/30 hover:border-cyanAccent flex items-center justify-center text-mutedText hover:text-white hover:bg-slate-800 transition-all shadow-md group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Divakar S. LinkedIn"
                  className="w-11 h-11 rounded-xl bg-darkCard/80 border border-electricBlue/30 hover:border-cyanAccent flex items-center justify-center text-mutedText hover:text-white hover:bg-slate-800 transition-all shadow-md group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Quick Spec Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-800/80 max-w-xl"
            >
              <div className="p-2.5 rounded-lg bg-darkCard/40 border border-slate-800">
                <div className="text-xs font-mono text-mutedText">Institution</div>
                <div className="text-xs sm:text-sm font-semibold text-lightWhite truncate">SKCET</div>
              </div>
              <div className="p-2.5 rounded-lg bg-darkCard/40 border border-slate-800">
                <div className="text-xs font-mono text-mutedText">Department</div>
                <div className="text-xs sm:text-sm font-semibold text-cyanAccent truncate">B.Tech IT</div>
              </div>
              <div className="p-2.5 rounded-lg bg-darkCard/40 border border-slate-800">
                <div className="text-xs font-mono text-mutedText">Academic CGPA</div>
                <div className="text-xs sm:text-sm font-semibold text-emerald-400">9.2 / 10</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Holographic Futuristic Profile Card (Placeholder & Photo Uploader) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="relative w-full max-w-sm"
            >
              {/* Outer Cyber Glow Frame */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-electricBlue/40 via-cyanAccent/30 to-blue-600/40 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000" />

              <div className="relative rounded-2xl glass-panel p-6 border border-electricBlue/40 shadow-2xl bg-darkCard/80 backdrop-blur-xl">
                {/* Top Telemetry Bar */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-[11px] font-mono text-mutedText">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyanAccent animate-pulse" />
                    <span className="text-cyanAccent">IDENTITY PROTOCOL</span>
                  </div>
                  <span className="text-slate-500">ID: DIVAKAR-IT</span>
                </div>

                {/* Profile Visual Display */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-darkBgSecondary border border-electricBlue/20 flex flex-col items-center justify-center text-center p-4 group">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Divakar S. Profile"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-3">
                      {/* Futuristic Holographic Avatar Placeholder */}
                      <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-tr from-primaryBlue/30 via-slate-800/80 to-cyanAccent/20 border-2 border-dashed border-electricBlue/40 flex items-center justify-center shadow-neon-blue">
                        <span className="font-mono font-black text-4xl text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-sky-400">
                          DS
                        </span>
                        {/* Corner markers */}
                        <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyanAccent" />
                        <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-cyanAccent" />
                        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-cyanAccent" />
                        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyanAccent" />
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-lightWhite">
                          Divakar S.
                        </p>
                        <p className="text-xs font-mono text-cyanAccent/80">
                          B.Tech IT • SKCET
                        </p>
                      </div>

                      <p className="text-[11px] text-mutedText/70 max-w-[220px]">
                        Holographic Identity Placeholder
                      </p>
                    </div>
                  )}

                  {/* Optional Upload / Change Photo trigger */}
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-darkCard/90 border border-electricBlue/40 text-cyanAccent hover:bg-slate-800 hover:border-cyanAccent transition-all cursor-pointer shadow-lg group-hover:scale-105"
                    title="Upload / Replace Photo"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Bottom Spec Details */}
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-mutedText flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-electricBlue" />
                      Program
                    </span>
                    <span className="font-medium text-lightWhite">B.Tech IT</span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-mutedText flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-cyanAccent" />
                      Interests
                    </span>
                    <span className="font-mono text-cyanAccent">AI • Dev • UI/UX</span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-mutedText flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-sky-400" />
                      Location
                    </span>
                    <span className="font-medium text-slate-300">Coimbatore, TN</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

