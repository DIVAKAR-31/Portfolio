import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Users,
  Lightbulb,
  Calendar,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { hackathonsData } from '../../data/portfolioData';

export const Hackathons: React.FC = () => {
  return (
    <section id="hackathons" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Competitive Engineering & Collaborative Ideation"
          title="Hackathons & Innovation"
          subtitle="Real-world problem-solving, rapid time-boxed development sprints, and collegiate innovation challenges."
        />

        {/* Hackathon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hackathonsData.map((item, idx) => {
            const isSamsung = item.id === 'samsung-hackathon';
            const isAdobe = item.id === 'adobe-hackathon';
            const isSIH = item.id === 'smart-india-hackathon';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative rounded-3xl glass-panel border border-electricBlue/20 hover:border-cyanAccent transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 sm:p-7 hover:-translate-y-1.5 shadow-card-glow"
              >
                <div>
                  {/* Top Header Badge & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-slate-900 border border-electricBlue/30 text-cyanAccent">
                      {item.badge}
                    </span>

                    <span className="text-[10px] font-mono text-mutedText/80 uppercase">
                      {item.role}
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyanAccent transition-colors mb-1">
                    {item.title}
                  </h3>

                  {/* Organizer & Edition */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-4">
                    <span className="text-electricBlue font-semibold">{item.organizer}</span>
                    <span>•</span>
                    <span>{item.edition}</span>
                  </div>

                  {/* Participation Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 font-sans">
                    {item.participationDescription}
                  </p>

                  {/* Problem Statement Box */}
                  {item.problemStatement && (
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 mb-4">
                      <div className="text-[10px] font-mono text-cyanAccent uppercase tracking-wider flex items-center gap-1.5">
                        <Lightbulb className="w-3 h-3 text-cyanAccent" />
                        Problem Focus
                      </div>
                      <p className="text-xs text-slate-300 leading-snug">
                        {item.problemStatement}
                      </p>
                    </div>
                  )}

                  {/* Project / Submission Details */}
                  {item.projectOrSubmission && (
                    <div className="space-y-1 mb-4">
                      <div className="text-[10px] font-mono text-mutedText uppercase tracking-wider">
                        Submission / Outcome:
                      </div>
                      <p className="text-xs text-slate-300">
                        {item.projectOrSubmission}
                      </p>
                    </div>
                  )}
                </div>

                {/* Team Info / Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-mutedText">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-electricBlue" />
                    <span className="truncate max-w-[200px]">{item.teamDetails}</span>
                  </div>

                  <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Verified Entry
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

