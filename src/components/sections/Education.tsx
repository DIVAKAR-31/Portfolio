import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { educationData } from '../../data/portfolioData';
import { Card3D } from '../common/Card3D';

export const Education: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Progressive scroll tracking for the timeline spine
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="education" className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Academic Milestone Timeline"
          title="Education & Foundations"
          subtitle="A consistent record of academic discipline, technical coursework, and foundational excellence."
        />

        {/* Vertical Timeline Container with Progressive Scroll Ref */}
        <div ref={containerRef} className="relative mt-16 max-w-4xl mx-auto">
          {/* Background timeline rail */}
          <div className="absolute top-4 bottom-4 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-slate-800/80" />

          {/* Central Glowing Cyber Spine (Animates down progressively as you scroll) */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute top-4 bottom-4 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyanAccent via-electricBlue to-primaryBlue shadow-[0_0_12px_#38bdf8]"
          />
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute top-4 bottom-4 left-4 sm:left-1/2 -translate-x-1/2 w-3 bg-gradient-to-b from-cyanAccent/30 via-electricBlue/15 to-transparent blur-sm pointer-events-none"
          />

          {/* Timeline Entries */}
          <div className="space-y-12">
            {educationData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? 40 : -40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-8 group`}
                >
                  {/* Glowing Milestone Marker Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-4 z-20 flex items-center justify-center">
                    <motion.div
                      whileInView={{ scale: [0.8, 1.25, 1] }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      className="relative w-8 h-8 rounded-full bg-darkBg border-2 border-cyanAccent flex items-center justify-center shadow-neon-glow group-hover:scale-125 transition-transform duration-300"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-cyanAccent animate-pulse" />
                      <div className="absolute -inset-1 rounded-full bg-cyanAccent/30 blur-[4px]" />
                    </motion.div>
                  </div>

                  {/* Content Card with 3D depth */}
                  <div className="pl-12 sm:pl-0 sm:w-1/2 w-full">
                    <Card3D maxTilt={4} scaleHover={1.015}>
                      <div
                        className={`glass-panel p-6 sm:p-7 rounded-2xl border border-electricBlue/20 hover:border-cyanAccent transition-all duration-300 shadow-card-glow ${
                          isEven ? 'sm:mr-10' : 'sm:ml-10'
                        }`}
                      >
                        {/* Top Header: Duration & Status Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-electricBlue/30 text-[11px] font-mono text-cyanAccent">
                            <Calendar className="w-3 h-3 text-electricBlue" />
                            {item.duration}
                          </span>

                          {item.status && (
                            <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-md ${
                              item.status === 'Currently Pursuing'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {item.status}
                            </span>
                          )}
                        </div>

                        {/* Institution Name */}
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyanAccent transition-colors">
                          {item.institution}
                        </h3>

                        {/* Location Immediately After Institution Name */}
                        <div className="flex items-center gap-1.5 text-xs text-sky-400/90 font-sans mt-1">
                          <MapPin className="w-3.5 h-3.5 text-electricBlue shrink-0" />
                          <span>{item.location}</span>
                        </div>

                        {/* Degree / Program Title */}
                        <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                          <GraduationCap className="w-4 h-4 text-cyanAccent shrink-0" />
                          <span>{item.degree}</span>
                        </div>

                        {/* Score / CGPA Highlight Card */}
                        <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                          <span className="text-xs font-mono text-mutedText">
                            {item.scoreLabel}
                          </span>
                          <span className="text-base sm:text-lg font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyanAccent to-emerald-400">
                            {item.score}
                          </span>
                        </div>

                        {/* Coursework or Relevant Subjects */}
                        {item.courseworkOrSubjects && item.courseworkOrSubjects.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-800/80">
                            <div className="text-[11px] font-mono text-mutedText mb-2 flex items-center gap-1.5 uppercase">
                              <BookOpen className="w-3 h-3 text-electricBlue" />
                              {index === 0 ? 'Relevant Coursework' : 'Key Subjects'}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {item.courseworkOrSubjects.map((subject) => (
                                <span
                                  key={subject}
                                  className="px-2.5 py-1 rounded-md bg-darkBgSecondary/90 border border-slate-800 text-xs text-slate-300 font-sans"
                                >
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card3D>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
