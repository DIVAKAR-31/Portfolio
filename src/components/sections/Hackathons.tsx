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
import { Card3D } from '../common/Card3D';

export const Hackathons: React.FC = () => {
  return (
    <section id="hackathons" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Competitive Engineering & Collaborative Ideation"
          title="Hackathons & Innovation"
          subtitle="Real-world problem-solving, rapid time-boxed development sprints, and collegiate innovation challenges."
        />

        {/* Hackathon Cards Grid with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hackathonsData.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="h-full"
              >
                <Card3D maxTilt={5} scaleHover={1.015} className="h-full">
                  <div className="group relative rounded-3xl glass-panel border border-electricBlue/20 hover:border-cyanAccent transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 sm:p-7 shadow-card-glow h-full">
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
                      <h3 className="text-xl font-bold dark:text-white text-slate-900 group-hover:text-cyanAccent transition-colors mb-1">
                        {item.title}
                      </h3>

                      {/* Organizer & Edition */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-4">
                        <span className="text-electricBlue font-semibold">{item.organizer}</span>
                        <span>•</span>
                        <span>{item.edition}</span>
                        {item.date && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-slate-300">
                              <Calendar className="w-3 h-3 text-cyanAccent" />
                              {item.date}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Participation Description */}
                      <p className="text-xs sm:text-sm dark:text-slate-300 text-slate-600 leading-relaxed mb-5 font-sans">
                        {item.participationDescription}
                      </p>

                      {/* Problem Statement Box */}
                      {item.problemStatement && (
                        <div className="p-3.5 rounded-xl dark:bg-slate-900/80 bg-slate-100 border dark:border-slate-800 border-slate-200 space-y-1 mb-4">
                          <div className="text-[10px] font-mono text-cyanAccent uppercase tracking-wider flex items-center gap-1.5">
                            <Lightbulb className="w-3 h-3 text-cyanAccent" />
                            Problem Focus
                          </div>
                          <p className="text-xs dark:text-slate-300 text-slate-700 leading-snug">
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
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
