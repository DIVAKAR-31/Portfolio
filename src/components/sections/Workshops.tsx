import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  Database,
  Code2,
  Cloud,
  ExternalLink,
  Laptop,
  Terminal,
  Linkedin
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { workshopsData } from '../../data/portfolioData';
import { WorkshopEntry } from '../../types/portfolio';
import { Card3D } from '../common/Card3D';

const workshopIcons: Record<string, React.ElementType> = {
  'operation-code-heist': Terminal,
  'vibe-coding': Code2,
};

export const Workshops: React.FC = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopEntry | null>(null);

  return (
    <section id="workshops" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Technical Contests & Practical Learning"
          title="Workshops & Contests"
          subtitle="Competitive coding challenges, collegiate innovation events, and practical developer paradigms."
        />

        {/* Workshop Cards Grid with 3D depth and scroll animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {workshopsData.map((item, idx) => {
            const Icon = workshopIcons[item.id] || Laptop;

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
                      {/* Top Badge & Icon */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-electricBlue/20 to-primaryBlue/20 border border-electricBlue/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-cyanAccent" />
                        </div>

                        <span className={`text-[10px] font-mono uppercase px-3 py-1 rounded-full border ${item.badgeColor}`}>
                          {item.category || "Interactive Workshop"}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold dark:text-white text-slate-900 group-hover:text-cyanAccent transition-colors mb-2">
                        {item.title}
                      </h3>

                      {/* Organizer, Institution & Date */}
                      <div className="space-y-1 mb-4 text-xs font-mono dark:text-mutedText text-slate-500">
                        <div className="flex items-start gap-1.5 dark:text-slate-300 text-slate-700">
                          <span className="text-cyanAccent font-semibold shrink-0">Organizer:</span>
                          <span>{item.organizer}</span>
                        </div>
                        {item.institution && (
                          <div className="flex items-start gap-1.5 text-slate-400">
                            <span className="text-electricBlue font-semibold shrink-0">
                              {item.id === 'vibe-coding' ? 'Venue:' : 'Institution:'}
                            </span>
                            <span>{item.institution}</span>
                          </div>
                        )}
                        {item.date && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Calendar className="w-3.5 h-3.5 text-electricBlue" />
                            <span>{item.date}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm dark:text-slate-300 text-slate-600 leading-relaxed mb-6 font-sans">
                        {item.description}
                      </p>

                      {/* Highlights Bullet List */}
                      <div className="space-y-2 mb-6">
                        <div className="text-[11px] font-mono text-cyanAccent uppercase tracking-wider mb-2">
                          Key Learnings & Focus:
                        </div>
                        {item.highlights.slice(0, 3).map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs dark:text-mutedText text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyanAccent shrink-0 mt-0.5" />
                            <span className="leading-snug">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills Gained Tags & Details Trigger */}
                    <div className="pt-4 border-t border-slate-800/80">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.skillsGained.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyanAccent/90"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <button
                          onClick={() => setSelectedWorkshop(item)}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-electricBlue/20 hover:border-cyanAccent text-xs font-mono text-slate-300 hover:text-cyanAccent transition-all flex items-center justify-center gap-2 group-hover:border-electricBlue/40"
                        >
                          <span>View Insights</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        {item.linkUrl && (
                          <a
                            href={item.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 rounded-xl bg-slate-900 border border-electricBlue/30 hover:border-cyanAccent text-xs font-mono text-cyanAccent hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap shrink-0"
                            title="View on LinkedIn"
                          >
                            <Linkedin className="w-3.5 h-3.5 text-cyanAccent" />
                            <span>View on LinkedIn</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Workshop Detail Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedWorkshop(null)}
            className="fixed inset-0 bg-darkBg/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative glass-modal rounded-3xl p-6 sm:p-8 max-w-xl w-full z-10 border border-electricBlue/30 shadow-2xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[11px] font-mono text-cyanAccent uppercase tracking-widest block mb-1">
                  {selectedWorkshop.category ? selectedWorkshop.category.toUpperCase() : 'EVENT DEEP DIVE'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedWorkshop.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  {selectedWorkshop.organizer} {selectedWorkshop.date ? `• ${selectedWorkshop.date}` : ''}
                </p>
                {selectedWorkshop.institution && (
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    <span className="text-electricBlue font-semibold">
                      {selectedWorkshop.id === 'vibe-coding' ? 'Venue: ' : 'Institution: '}
                    </span>
                    {selectedWorkshop.institution}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedWorkshop(null)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-200 mb-5 leading-relaxed font-sans">
              {selectedWorkshop.description}
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyanAccent">
                Complete Curriculum & Applied Practice:
              </h4>
              {selectedWorkshop.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyanAccent shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{hl}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              {selectedWorkshop.linkUrl ? (
                <a
                  href={selectedWorkshop.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyanAccent/10 border border-cyanAccent/30 hover:border-cyanAccent text-xs font-mono text-cyanAccent hover:text-white transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>View LinkedIn Post</span>
                  <ExternalLink className="w-3 h-3 text-cyanAccent" />
                </a>
              ) : <div />}

              <button
                onClick={() => setSelectedWorkshop(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
