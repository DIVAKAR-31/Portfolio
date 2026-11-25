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
  CheckCircle2,
  Factory,
  Play
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { projectsData } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { Card3D } from '../common/Card3D';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Featured Engineering Initiatives"
          title="Curated Projects & Case Studies"
          subtitle="Real-world civic applications, cooperative labor platforms, predictive analytics pipelines, and enterprise manufacturing audit systems."
        />

        {/* 4 Distinct Project Showcase Cards with Staggered Scroll Entrance and 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, idx) => {
            const isCivic = project.id === 'civicconnect';
            const isUniServe = project.id === 'uniserve';
            const isAttrition = project.id === 'attrition-prediction';
            const isOrderToAudit = project.id === 'order-to-audit';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.18,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="h-full"
              >
                <Card3D maxTilt={6} scaleHover={1.02} className="h-full">
                  <div className="group relative rounded-3xl glass-panel border border-electricBlue/20 hover:border-cyanAccent transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-card-glow h-full">
                    
                    {/* Visual Thumbnail Header with Animated Gradient Backdrop */}
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
                          <div className="relative p-4 rounded-2xl bg-sky-950/40 border border-cyanAccent/30 backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                            <div className="flex items-center gap-3">
                              <Cpu className="w-8 h-8 text-cyanAccent animate-pulse" />
                              <div className="text-left">
                                <div className="text-xs font-mono font-bold text-white">Civic AI Router</div>
                                <div className="text-[10px] font-mono text-cyan-300">AI Triage & 3-Tier Escalation</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {isUniServe && (
                          <div className="relative p-4 rounded-2xl bg-indigo-950/40 border border-blue-400/30 backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
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
                          <div className="relative p-4 rounded-2xl bg-cyan-950/40 border border-sky-400/30 backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                            <div className="flex items-center gap-3">
                              <BarChart2 className="w-8 h-8 text-emerald-400" />
                              <div className="text-left">
                                <div className="text-xs font-mono font-bold text-white">Attrition Model</div>
                                <div className="text-[10px] font-mono text-emerald-300">8-Stage ML Workflow</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {isOrderToAudit && (
                          <div className="relative p-4 rounded-2xl bg-blue-950/40 border border-cyanAccent/30 backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                            <div className="flex items-center gap-3">
                              <Factory className="w-8 h-8 text-cyanAccent" />
                              <div className="text-left">
                                <div className="text-xs font-mono font-bold text-white">Order-to-Audit</div>
                                <div className="text-[10px] font-mono text-cyan-300">FastAPI & GST Engine</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Thumbnail Footnote */}
                      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-300">
                        <span className="truncate max-w-[200px]">{project.subtitle}</span>
                        <Sparkles className="w-3.5 h-3.5 text-cyanAccent opacity-60 group-hover:rotate-45 group-hover:scale-125 transition-all duration-500" />
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="text-xl font-bold dark:text-white text-slate-900 group-hover:text-cyanAccent transition-colors mb-2">
                          {project.title}
                        </h3>

                        {/* Short Description */}
                        <p className="text-xs sm:text-sm dark:text-mutedText text-slate-600 leading-relaxed line-clamp-3">
                          {project.shortDescription}
                        </p>
                      </div>

                      {/* Tech Badges with Staggered Entrance */}
                      <div className="pt-2">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 4).map((tech, tIdx) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.2 + tIdx * 0.05 }}
                              className="px-2.5 py-1 rounded-md bg-slate-900 border border-electricBlue/20 text-[11px] font-mono text-cyanAccent group-hover:border-electricBlue/40 transition-colors"
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-mutedText">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Actions: View Details, Live Demo, Watch Demo, & GitHub Button */}
                      <div className="pt-4 border-t border-slate-800/80 dark:border-slate-800/80 border-slate-200/80 flex flex-wrap items-center justify-between gap-2.5">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="flex-1 min-w-[95px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-primaryBlue/80 to-sky-500/80 hover:from-primaryBlue hover:to-sky-400 text-white text-xs font-semibold tracking-wider font-mono flex items-center justify-center gap-1.5 transition-all shadow-neon-blue group-hover:scale-102"
                        >
                          <span>Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>

                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-cyan-500/90 to-blue-600/90 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-mono font-semibold tracking-wide flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-105"
                            title="Open Live Platform Demo"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {project.demoVideoUrl && (
                          <a
                            href={project.demoVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-red-600/90 to-rose-600/90 hover:from-red-500 hover:to-rose-500 text-white text-xs font-mono font-semibold tracking-wide flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(239,68,68,0.35)] hover:scale-105"
                            title="Watch Demo Video on YouTube"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Watch Demo</span>
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-darkCard dark:bg-darkCard bg-slate-100 border border-slate-700/80 dark:border-slate-700/80 border-slate-300 hover:border-cyanAccent text-mutedText hover:text-white dark:hover:text-white hover:text-slate-900 transition-all shadow-sm"
                            aria-label={`GitHub Repository for ${project.title}`}
                            title="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
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

      {/* Project Case Study Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
