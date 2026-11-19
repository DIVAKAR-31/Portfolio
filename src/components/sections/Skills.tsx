import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Globe,
  Database,
  Cpu,
  Wrench,
  BookMarked,
  HeartHandshake,
  Check,
  Terminal,
  Sparkles
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { skillCategories } from '../../data/portfolioData';
import { Card3D } from '../common/Card3D';

const categoryIconMap: Record<string, React.ElementType> = {
  'PROGRAMMING': Code,
  'WEB DEVELOPMENT': Globe,
  'DATABASE': Database,
  'AI AND TECHNOLOGY': Cpu,
  'TOOLS': Wrench,
  'ACADEMIC COURSEWORK': BookMarked,
  'SOFT SKILLS': HeartHandshake,
};

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Technical & Interpersonal Stack"
          title="Skills & Competencies"
          subtitle="Accurate, unexaggerated breakdown of verified programming languages, tools, databases, and professional proficiencies."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
              selectedCategory === null
                ? 'bg-electricBlue text-darkBg font-bold shadow-neon-blue'
                : 'glass-panel text-mutedText hover:text-white border-electricBlue/20'
            }`}
          >
            All Categories ({skillCategories.length})
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(selectedCategory === cat.category ? null : cat.category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                selectedCategory === cat.category
                  ? 'bg-cyanAccent text-darkBg font-bold shadow-neon-glow'
                  : 'glass-panel text-mutedText hover:text-white border-electricBlue/20'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Categories Grid with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories
            .filter(cat => selectedCategory === null || cat.category === selectedCategory)
            .map((cat, idx) => {
              const Icon = categoryIconMap[cat.category] || Terminal;
              const isSelected = selectedCategory === cat.category;

              return (
                <motion.div
                  key={cat.category}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 25 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="h-full"
                >
                  <Card3D maxTilt={5} scaleHover={1.015} className="h-full">
                    <div
                      className={`glass-panel p-6 rounded-2xl border transition-all duration-300 relative group h-full flex flex-col justify-between ${
                        isSelected
                          ? 'border-cyanAccent bg-darkCard/90 shadow-neon-blue'
                          : 'border-electricBlue/20 hover:border-electricBlue/50 hover:bg-slate-900/80 shadow-card-glow'
                      }`}
                    >
                      <div>
                        {/* Category Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electricBlue/20 to-primaryBlue/10 border border-electricBlue/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                              <Icon className="w-5 h-5 text-cyanAccent" />
                            </div>
                            <div>
                              <span className="text-[10px] font-mono tracking-widest uppercase text-electricBlue block">
                                {cat.category}
                              </span>
                              <h3 className="text-base font-bold text-white group-hover:text-cyanAccent transition-colors">
                                {cat.title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Subtitle / Description */}
                        <p className="text-xs text-mutedText leading-relaxed mb-5">
                          {cat.description}
                        </p>
                      </div>

                      {/* Skills Chips / Items */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {cat.skills.map((skill, sIdx) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.25, delay: 0.15 + sIdx * 0.04 }}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                              skill.highlight
                                ? 'bg-slate-900/90 text-lightWhite border border-electricBlue/40 hover:border-cyanAccent group-hover:shadow-[0_0_12px_rgba(56,189,248,0.15)]'
                                : 'bg-darkBgSecondary/80 text-slate-300 border border-slate-800'
                            }`}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-cyanAccent" />
                            <span>{skill.name}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Corner tech accent */}
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-40 transition-opacity">
                        <Sparkles className="w-4 h-4 text-cyanAccent" />
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
