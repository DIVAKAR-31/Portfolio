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
  Laptop
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { workshopsData } from '../../data/portfolioData';
import { WorkshopEntry } from '../../types/portfolio';

const workshopIcons: Record<string, React.ElementType> = {
  'fabric-workshop': Database,
  'vibe-coding': Code2,
  'aws-event': Cloud,
};

export const Workshops: React.FC = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopEntry | null>(null);

  return (
    <section id="workshops" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Continuous Technical Upskilling"
          title="Workshops & Technical Experiences"
          subtitle="Immersive hands-on workshops, enterprise analytics deep dives, and cutting-edge developer paradigms."
        />

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workshopsData.map((item, idx) => {
            const Icon = workshopIcons[item.id] || Laptop;

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
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-electricBlue/20 to-primaryBlue/20 border border-electricBlue/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-cyanAccent" />
                    </div>

                    <span className={`text-[10px] font-mono uppercase px-3 py-1 rounded-full border ${item.badgeColor}`}>
                      Interactive Workshop
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyanAccent transition-colors mb-2">
                    {item.title}
                  </h3>

                  {/* Organizer & Date */}
                  <div className="space-y-1 mb-4 text-xs font-mono text-mutedText">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="text-cyanAccent font-semibold">Organizer:</span> {item.organizer}
                    </div>
                    {item.date && (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-electricBlue" />
                        <span>{item.date}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                    {item.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-mono text-cyanAccent uppercase tracking-wider mb-2">
                      Key Learnings & Focus:
                    </div>
                    {item.highlights.slice(0, 3).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-mutedText">
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

                  <button
                    onClick={() => setSelectedWorkshop(item)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-electricBlue/20 hover:border-cyanAccent text-xs font-mono text-slate-300 hover:text-cyanAccent transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Workshop Insights</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative glass-modal rounded-3xl p-6 sm:p-8 max-w-xl w-full z-10 border border-electricBlue/30 shadow-2xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[11px] font-mono text-cyanAccent uppercase tracking-widest block mb-1">
                  WORKSHOP DEEP DIVE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedWorkshop.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  {selectedWorkshop.organizer} • {selectedWorkshop.date}
                </p>
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

            <div className="pt-4 border-t border-slate-800 flex justify-end">
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

