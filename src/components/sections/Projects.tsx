import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Layers,
  ArrowUpRight,
  Sparkles,
  Cpu,
  BarChart2,
  Users2,
  Workflow,
  CheckCircle2
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { projectsData } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Featured Engineering Initiatives"
          title="Curated Projects & Case Studies"
          subtitle="Real-world civic applications, cooperative labor platforms, and predictive analytics pipelines with clear scope boundaries."
        />

        {/* 3 Distinct Project Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => {
            const isCivic = project.id === 'civicconnect';
            const isUniServe = project.id === 'uniserve';
            const isAttrition = project.id === 'attrition-prediction';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative rounded-3xl glass-panel border border-electricBlue/20 hover:border-cyanAccent transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-card-glow hover:-translate-y-2"
              >
                {/* Visual Thumbnail Header with Unique Project Theming */}
                <div className={`relative h-56 w-full overflow-hidden bg-gradient-to-br ${project.thumbnailGradient} p-6 flex flex-col justify-between border-b border-electricBlue/15`}>
                  {/* Subtle Grid Backdrop inside thumbnail */}
                  <div className="absolute inset-0 bg-futuristic-grid opacity-30" />

                  {/* Top Bar inside Thumbnail */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-white/30 tracking-widest group-hover:text-cyanAccent/70 transition-colors">
                      {project.number}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-electricBlue/30 text-[10px] font-mono text-cyanAccent uppercase tracking-wider backdrop-blur-md">
                      {project.tag}
                    </span>
                  </div>

                  {/* Creative Graphical Centerpiece per project */}
                  <div className="relative z-10 flex items-center justify-center my-auto">
                    {isCivic && (
                      <div className="relative p-4 rounded-2xl bg-sky-950/40 border border-cyanAccent/30 backdrop-blur-md group-hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-3">
                          <Cpu className="w-8 h-8 text-cyanAccent animate-pulse" />
                          <div className="text-left">
                            <div className="text-xs font-mono font-bold text-white">Civic AI Router</div>
                            <div className="text-[10px] font-mono text-cyan-300">Gemini Prompt Pipeline</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {isUniServe && (
                      <div className="relative p-4 rounded-2xl bg-indigo-950/40 border border-blue-400/30 backdrop-blur-md group-hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-3">
                          <Users2 className="w-8 h-8 text-sky-400" />
                          <div className="text-left">
                            <div className="text-xs font-mono font-bold text-white">Cooperative Hub</div>
                            <div className="text-[10px] font-mono text-sky-300">Verified Labor Dispatch</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {isAttrition && (
                      <div className="relative p-4 rounded-2xl bg-cyan-950/40 border border-sky-400/30 backdrop-blur-md group-hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-3">
                          <BarChart2 className="w-8 h-8 text-emerald-400" />
                          <div className="text-left">
                            <div className="text-xs font-mono font-bold text-white">Attrition Model</div>
                            <div className="text-[10px] font-mono text-emerald-300">8-Stage ML Workflow</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Footnote */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span className="truncate max-w-[200px]">{project.subtitle}</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyanAccent opacity-60 group-hover:rotate-45 transition-transform" />
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-cyanAccent transition-colors mb-2">
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-mutedText leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech Badges */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-900 border border-electricBlue/20 text-[11px] font-mono text-cyanAccent"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-mutedText">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions: View Details & Optional GitHub Button */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-primaryBlue/80 to-sky-500/80 hover:from-primaryBlue hover:to-sky-400 text-white text-xs font-semibold tracking-wider font-mono flex items-center justify-center gap-2 transition-all shadow-neon-blue group-hover:scale-102"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-darkCard border border-slate-700/80 hover:border-cyanAccent text-mutedText hover:text-white transition-all shadow-sm"
                        aria-label={`GitHub Repository for ${project.title}`}
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Case Study Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

