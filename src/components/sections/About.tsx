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
  CheckCircle2
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { personalInfo } from '../../data/portfolioData';

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
          {/* Left Column: Narrative & Detailed Background */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="glass-panel p-8 rounded-2xl border border-electricBlue/20 space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyanAccent" />
                Student, Developer & Continuous Learner
              </h3>

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

            {/* Verified Academic & Milestone Counters */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-panel p-4 rounded-xl border border-electricBlue/20 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-300 font-mono">
                  9.2
                </div>
                <div className="text-[11px] font-mono text-cyanAccent uppercase mt-1">
                  B.Tech CGPA
                </div>
                <div className="text-[10px] text-mutedText/70 mt-0.5">
                  Up to 2nd Sem
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-electricBlue/20 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-300 font-mono">
                  3
                </div>
                <div className="text-[11px] font-mono text-cyanAccent uppercase mt-1">
                  Key Projects
                </div>
                <div className="text-[10px] text-mutedText/70 mt-0.5">
                  Civic, Service & ML
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-electricBlue/20 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-300 font-mono">
                  3+
                </div>
                <div className="text-[11px] font-mono text-cyanAccent uppercase mt-1">
                  Hackathons
                </div>
                <div className="text-[10px] text-mutedText/70 mt-0.5">
                  Samsung, Adobe, SIH
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Core Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`glass-panel p-6 rounded-2xl border ${pillar.border} hover:border-cyanAccent transition-all duration-300 hover:-translate-y-1 group`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-4 border border-electricBlue/30 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-cyanAccent" />
                  </div>

                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyanAccent transition-colors">
                    {pillar.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-mutedText leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

