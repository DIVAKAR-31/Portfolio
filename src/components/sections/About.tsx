import React from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  BrainCircuit,
  Lightbulb,
  Users2,
  BookOpen,
  Award,
  Layers,
  CheckCircle2,
  GraduationCap,
  MapPin
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { personalInfo } from '../../data/portfolioData';
import { Card3D } from '../common/Card3D';

const corePillars = [
  {
    icon: Code,
    title: 'Programming & Development',
    description: 'Firm foundation in Java, C++, and C with hands-on practice in structured and object-oriented paradigms.',
    gradient: 'from-blue-500/20 to-sky-500/20',
    border: 'border-blue-500/30'
  },
  {
    icon: BrainCircuit,
    title: 'AI-Integrated Solutions',
    description: 'Active interest in modern LLMs and generative APIs, exploring how models like Google Gemini can enhance everyday digital services.',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30'
  },
  {
    icon: Lightbulb,
    title: 'Problem-Solving Mindset',
    description: 'Dedicated to understanding core problem constraints before code execution, approaching algorithms and system architecture systematically.',
    gradient: 'from-sky-500/20 to-indigo-500/20',
    border: 'border-sky-500/30'
  },
  {
    icon: Users2,
    title: 'Adaptability & Teamwork',
    description: 'Comfortable collaborating in diverse student engineering teams, participating in hackathons, and communicating design rationales.',
    gradient: 'from-indigo-500/20 to-cyan-500/20',
    border: 'border-indigo-500/30'
  }
];

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="About Divakar"
          title="Engineering With Purpose & Curiosity"
          subtitle="A grounded view into my technical background, academic journey, and technological focus areas."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative with Profile Card & Detailed Background */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <Card3D maxTilt={4} scaleHover={1.01}>
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-electricBlue/20 space-y-5 shadow-card-glow">
                {/* Profile Header Block Featuring Divakar's Original Photo */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-5 border-b border-slate-800">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-electricBlue/40 group shadow-neon-blue shrink-0">
                    <img
                      src={personalInfo.profileImage}
                      alt="Divakar S. - SKCET"
                      className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-darkBg/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-electricBlue/30 text-[10px] font-mono text-cyanAccent uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Verified Student Profile
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {personalInfo.name}
                    </h3>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-cyanAccent/90 font-mono">
                      <GraduationCap className="w-3.5 h-3.5 text-electricBlue shrink-0" />
                      <span>B.Tech Information Technology</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-mutedText">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{personalInfo.college}, {personalInfo.location}</span>
                    </div>
                  </div>
                </div>

                {/* Narrative Paragraphs */}
                <p className="text-sm sm:text-base text-mutedText leading-relaxed">
                  I am currently pursuing my <span className="text-lightWhite font-medium">B.Tech in Information Technology</span> at{' '}
                  <span className="text-cyanAccent font-medium">Sri Krishna College of Engineering and Technology (SKCET)</span> in Coimbatore, Tamil Nadu.
                </p>

                <p className="text-sm sm:text-base text-mutedText leading-relaxed">
                  My technical interests center on software development, AI-integrated applications, UI/UX design, and data analytics. I enjoy deconstructing real-world bottlenecks—whether that means designing a transparent civic grievance portal or conceptualizing an equitable cooperative services architecture.
                </p>

                <p className="text-sm sm:text-base text-mutedText leading-relaxed">
                  Rather than chasing buzzwords, I prioritize solid fundamentals: understanding data structures, writing clear code in Java and C++, structuring relational databases with MySQL, and learning through active project building and workshop participation.
                </p>

                {/* Core Attributes Checklist */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyanAccent shrink-0" />
                    <span>Disciplined Problem Solving</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyanAccent shrink-0" />
                    <span>Active Codebase Building</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyanAccent shrink-0" />
                    <span>Cross-functional Teamwork</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyanAccent shrink-0" />
                    <span>Continuous Self-Learning</span>
                  </div>
                </div>
              </div>
            </Card3D>

            {/* Verified Academic & Milestone Counters with 3D Depth */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                className="glass-panel p-4 rounded-xl border border-electricBlue/20 text-center shadow-card-glow transition-all"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-300 font-mono">
                  9.2
                </div>
                <div className="text-[11px] font-mono text-cyanAccent uppercase mt-1">
                  B.Tech CGPA
                </div>
                <div className="text-[10px] text-mutedText/70 mt-0.5">
                  Up to 2nd Sem
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                className="glass-panel p-4 rounded-xl border border-electricBlue/20 text-center shadow-card-glow transition-all"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-300 font-mono">
                  3
                </div>
                <div className="text-[11px] font-mono text-cyanAccent uppercase mt-1">
                  Key Projects
                </div>
                <div className="text-[10px] text-mutedText/70 mt-0.5">
                  Civic, Service & ML
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                className="glass-panel p-4 rounded-xl border border-electricBlue/20 text-center shadow-card-glow transition-all"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-300 font-mono">
                  3+
                </div>
                <div className="text-[11px] font-mono text-cyanAccent uppercase mt-1">
                  Hackathons
                </div>
                <div className="text-[10px] text-mutedText/70 mt-0.5">
                  Samsung, Adobe, SIH
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: 4 Core Pillars Grid with 3D Tilt */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="h-full"
                >
                  <Card3D maxTilt={6} scaleHover={1.02} className="h-full">
                    <div
                      className={`glass-panel p-6 rounded-2xl border ${pillar.border} hover:border-cyanAccent transition-all duration-300 group h-full flex flex-col justify-between`}
                    >
                      <div>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-4 border border-electricBlue/30 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-cyanAccent" />
                        </div>

                        <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyanAccent transition-colors">
                          {pillar.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-mutedText leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
