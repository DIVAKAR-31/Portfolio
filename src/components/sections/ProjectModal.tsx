import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Github,
  ExternalLink,
  Layers,
  AlertCircle,
  CheckCircle2,
  Clock,
  Code2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  BarChart3,
  Server,
  Workflow,
  Users2
} from 'lucide-react';
import { Project } from '../../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'architecture' | 'simulation'>('overview');

  // Interactive prototype simulation states for CivicConnect
  const [civicCategory, setCivicCategory] = useState('Pothole / Road Damage');
  const [civicDistrict, setCivicDistrict] = useState('Coimbatore Central');
  const [simulatedSubmitting, setSimulatedSubmitting] = useState(false);
  const [simulatedGrievanceId, setSimulatedGrievanceId] = useState<string | null>(null);

  // Interactive demo for UniServe
  const [uniServeRole, setUniServeRole] = useState<'household' | 'worker' | 'admin'>('household');

  if (!project) return null;

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulatedSubmitting(true);
    setTimeout(() => {
      setSimulatedSubmitting(false);
      setSimulatedGrievanceId(`CC-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-darkBg/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-4xl glass-modal rounded-3xl border border-electricBlue/30 overflow-hidden z-10 my-8 shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-darkBgSecondary/60 shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-electricBlue/15 text-cyanAccent border border-electricBlue/30">
                PROJECT {project.number}
              </span>
              <span className="text-xs font-mono text-mutedText uppercase">
                {project.tag}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-mutedText hover:text-white hover:border-cyanAccent transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Hero Banner */}
          <div className="px-6 sm:px-8 pt-6 pb-4 shrink-0 bg-gradient-to-b dark:from-darkCard from-slate-100 to-transparent">
            <h3 className="text-2xl sm:text-3xl font-extrabold dark:text-white text-slate-900">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-cyanAccent mt-1">
              {project.subtitle}
            </p>

            {/* Implementation Note Banner */}
            {project.implementationNote && (
              <div className="mt-4 p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/30 flex items-start gap-3 text-xs text-sky-200">
                <AlertCircle className="w-4 h-4 text-cyanAccent shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-semibold text-cyanAccent">Scope & Transparency Notice: </span>
                  {project.implementationNote}
                </p>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 mt-6 border-b border-slate-800 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-all border-b-2 whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-cyanAccent text-cyanAccent font-bold'
                    : 'border-transparent text-mutedText hover:text-white'
                }`}
              >
                01. Overview & Problem
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-all border-b-2 whitespace-nowrap ${
                  activeTab === 'features'
                    ? 'border-cyanAccent text-cyanAccent font-bold'
                    : 'border-transparent text-mutedText hover:text-white'
                }`}
              >
                02. {project.stages ? 'Project Stages' : 'Key Capabilities'}
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-all border-b-2 whitespace-nowrap ${
                  activeTab === 'architecture'
                    ? 'border-cyanAccent text-cyanAccent font-bold'
                    : 'border-transparent text-mutedText hover:text-white'
                }`}
              >
                03. Architecture & Tech
              </button>
              <button
                onClick={() => setActiveTab('simulation')}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-all border-b-2 whitespace-nowrap ${
                  activeTab === 'simulation'
                    ? 'border-cyanAccent text-cyanAccent font-bold'
                    : 'border-transparent text-mutedText hover:text-white'
                }`}
              >
                04. Interactive Showcase
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="px-6 sm:px-8 py-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyanAccent mb-2">
                    Executive Summary
                  </h4>
                  <p className="text-base text-slate-200 leading-relaxed font-sans">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-panel p-5 rounded-xl border border-red-500/20 bg-red-950/10">
                    <h5 className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                      The Problem Statement
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="glass-panel p-5 rounded-xl border border-emerald-500/20 bg-emerald-950/10">
                    <h5 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Engineered Solution
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Tech Badges List */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-mutedText mb-3">
                    Technologies & Tools Involved
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-electricBlue/30 text-xs font-mono text-cyanAccent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-6">
                {project.stages ? (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-cyanAccent mb-4">
                      Lifecycle Progress (Completed vs. Planned Stages)
                    </h4>
                    <div className="space-y-3">
                      {project.stages.map((stage, idx) => {
                        const isDone = stage.status === 'Completed';
                        const isProgress = stage.status === 'In Progress';

                        return (
                          <div
                            key={stage.name}
                            className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                              isDone
                                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                                : isProgress
                                ? 'bg-sky-950/30 border-cyanAccent/50 text-cyan-200'
                                : 'bg-slate-900/50 border-slate-800 text-slate-400'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs opacity-75">
                                Stage 0{idx + 1}
                              </span>
                              <div>
                                <h5 className="text-sm font-bold text-white">
                                  {stage.name}
                                </h5>
                                {stage.note && (
                                  <p className="text-xs text-mutedText mt-0.5">
                                    {stage.note}
                                  </p>
                                )}
                              </div>
                            </div>

                            <span
                              className={`text-[11px] font-mono px-2.5 py-1 rounded-full shrink-0 ${
                                isDone
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                  : isProgress
                                  ? 'bg-sky-500/20 text-cyanAccent border border-cyanAccent/40'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700'
                              }`}
                            >
                              {stage.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-cyanAccent mb-4">
                      Documented Platform Capabilities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features?.map((feat, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl glass-panel border border-electricBlue/20 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyanAccent shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyanAccent mb-3">
                    System Architecture Overview
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans mb-5">
                    {project.architectureOverview}
                  </p>
                </div>

                {/* Architectural Diagram Box */}
                <div className="p-6 rounded-2xl bg-darkBg border border-slate-800 relative overflow-hidden">
                  <div className="text-xs font-mono text-mutedText uppercase mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-electricBlue" />
                      Visual Architecture Topology
                    </span>
                    <span className="text-[10px] text-cyanAccent font-mono">SPEC V1.0</span>
                  </div>

                  {project.id === 'civicconnect' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs font-mono">
                      <div className="p-4 rounded-xl bg-slate-900 border border-electricBlue/30">
                        <div className="text-cyanAccent font-bold mb-1">Citizen UI Client</div>
                        <div className="text-slate-400 text-[11px]">React / Tailwind CSS</div>
                        <div className="text-slate-500 text-[10px] mt-2">Complaint Capture, Location Geotag</div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-900 border border-sky-500/40">
                        <div className="text-sky-300 font-bold mb-1">AI Intelligence Layer</div>
                        <div className="text-slate-400 text-[11px]">Google Gemini API</div>
                        <div className="text-slate-500 text-[10px] mt-2">Deduplication, Urgency Categorization</div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/30">
                        <div className="text-blue-300 font-bold mb-1">Admin Resolution Portal</div>
                        <div className="text-slate-400 text-[11px]">Simulated Telemetry</div>
                        <div className="text-slate-500 text-[10px] mt-2">Department Dispatch & Status Updates</div>
                      </div>
                    </div>
                  )}

                  {project.id === 'uniserve' && (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                        <div className="text-cyanAccent font-bold">Mobile App</div>
                        <div className="text-[10px] text-slate-400">React Native / Expo</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                        <div className="text-sky-300 font-bold">Backend API</div>
                        <div className="text-[10px] text-slate-400">Node.js / Express</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                        <div className="text-blue-300 font-bold">Data Store</div>
                        <div className="text-[10px] text-slate-400">PostgreSQL (ACID)</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                        <div className="text-emerald-300 font-bold">Geo & Cache</div>
                        <div className="text-[10px] text-slate-400">Redis & Maps API</div>
                      </div>
                    </div>
                  )}

                  {project.id === 'attrition-prediction' && (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                        <div className="text-emerald-400 font-bold">01. Ingestion</div>
                        <div className="text-[10px] text-slate-300">Cleaned Workforce Dataset</div>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                        <div className="text-emerald-400 font-bold">02. EDA & Prep</div>
                        <div className="text-[10px] text-slate-300">Correlation & Encodings</div>
                      </div>
                      <div className="p-3 rounded-xl bg-sky-950/30 border border-cyanAccent/40">
                        <div className="text-cyanAccent font-bold">03. Modeling</div>
                        <div className="text-[10px] text-slate-300">Classification Pipeline</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                        <div className="text-slate-400 font-bold">04. Evaluation</div>
                        <div className="text-[10px] text-slate-500">Benchmark Metrics</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'simulation' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyanAccent mb-2">
                    Interactive Concept Preview
                  </h4>
                  <p className="text-xs text-mutedText">
                    Simulate key interactions of {project.title} right in your browser.
                  </p>
                </div>

                {project.id === 'civicconnect' && (
                  <div className="p-6 rounded-2xl glass-panel border border-electricBlue/30 bg-slate-900/60">
                    <h5 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyanAccent" />
                      Simulated Public Grievance Filing Wizard
                    </h5>

                    <form onSubmit={handleSimulateSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono text-mutedText block mb-1">Issue Category</label>
                          <select
                            value={civicCategory}
                            onChange={(e) => setCivicCategory(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-lightWhite focus:border-cyanAccent focus:outline-none"
                          >
                            <option>Pothole / Road Damage</option>
                            <option>Water Supply Irregularity</option>
                            <option>Street Light Outage</option>
                            <option>Waste Management & Sanitation</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-mono text-mutedText block mb-1">District / Jurisdiction</label>
                          <select
                            value={civicDistrict}
                            onChange={(e) => setCivicDistrict(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-lightWhite focus:border-cyanAccent focus:outline-none"
                          >
                            <option>Coimbatore Central</option>
                            <option>Coimbatore South</option>
                            <option>Coimbatore North</option>
                            <option>Pollachi Rural</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-mutedText block mb-1">Grievance Description (AI Will Analyze)</label>
                        <textarea
                          rows={2}
                          defaultValue="Deep pothole formed near SKCET entrance road causing vehicular slowdown and waterlogging during rains."
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-lightWhite focus:border-cyanAccent focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={simulatedSubmitting}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primaryBlue to-sky-500 text-white text-xs font-mono font-semibold tracking-wider hover:opacity-90 transition-all flex items-center gap-2"
                      >
                        {simulatedSubmitting ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing with Simulated Gemini AI...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-cyanAccent" />
                            <span>Dispatch Grievance to AI Queue</span>
                          </>
                        )}
                      </button>

                      {simulatedGrievanceId && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs space-y-1.5"
                        >
                          <div className="font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            Grievance Successfully Registered: {simulatedGrievanceId}
                          </div>
                          <p className="text-slate-300">
                            Simulated Gemini API output: Classified as <strong className="text-cyanAccent">High Priority Infrastructure Risk</strong>. Assigned to Coimbatore Highways Sub-division.
                          </p>
                        </motion.div>
                      )}
                    </form>
                  </div>
                )}

                {project.id === 'uniserve' && (
                  <div className="p-6 rounded-2xl glass-panel border border-electricBlue/30 bg-slate-900/60 space-y-4">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <Users2 className="w-4 h-4 text-cyanAccent" />
                      UniServe Role-Based Portal Simulation
                    </h5>

                    <div className="flex gap-2">
                      {(['household', 'worker', 'admin'] as const).map(role => (
                        <button
                          key={role}
                          onClick={() => setUniServeRole(role)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                            uniServeRole === role
                              ? 'bg-cyanAccent text-darkBg font-bold'
                              : 'bg-slate-900 text-slate-400 hover:text-white'
                          }`}
                        >
                          {role} Portal
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                      {uniServeRole === 'household' && (
                        <div>
                          <p className="text-cyanAccent font-bold">Household Service Booking Flow</p>
                          <p className="text-slate-300 mt-1">Browse verified cooperative electricians, locked rate-cards ($0 middleman markups), and schedule with OTP verification upon task completion.</p>
                        </div>
                      )}
                      {uniServeRole === 'worker' && (
                        <div>
                          <p className="text-cyanAccent font-bold">Certified Tradesperson Dashboard</p>
                          <p className="text-slate-300 mt-1">View local Panchayat cluster jobs, digital escrow wage releases, and cooperative union social security health accruals.</p>
                        </div>
                      )}
                      {uniServeRole === 'admin' && (
                        <div>
                          <p className="text-cyanAccent font-bold">Federation Oversight Terminal</p>
                          <p className="text-slate-300 mt-1">Aggregate cooperative metrics, dispute mediation, trade certification ledger verification, and district welfare tracking.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {project.id === 'attrition-prediction' && (
                  <div className="p-6 rounded-2xl glass-panel border border-electricBlue/30 bg-slate-900/60 space-y-4">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-cyanAccent" />
                      Attrition Factor Weighting Explorer
                    </h5>
                    <p className="text-xs text-mutedText">
                      Exploratory correlations derived from workforce retention datasets:
                    </p>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-300">
                        <span>Overtime Frequency Impact</span>
                        <span className="text-cyanAccent font-bold">High Correlation</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-sky-400 to-rose-400 h-full w-[82%]" />
                      </div>

                      <div className="flex justify-between text-slate-300 pt-2">
                        <span>Years Since Last Promotion</span>
                        <span className="text-cyanAccent font-bold">Moderate-High</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-sky-400 to-amber-400 h-full w-[67%]" />
                      </div>

                      <div className="flex justify-between text-slate-300 pt-2">
                        <span>Work-Life Balance Score</span>
                        <span className="text-cyanAccent font-bold">Inverse Correlation</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full w-[74%]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 border-t border-slate-800 bg-darkBgSecondary/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex flex-wrap items-center gap-3">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-mono font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_15px_rgba(34,211,238,0.35)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Demo</span>
                </a>
              )}

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-electricBlue/30 hover:border-cyanAccent text-xs font-mono text-lightWhite hover:text-cyanAccent transition-all shadow-sm"
                >
                  <Github className="w-4 h-4 text-cyanAccent" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-mutedText" />
                </a>
              ) : !project.liveDemoUrl ? (
                <span className="text-xs font-mono text-mutedText/70 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  Case Study & Architecture Specification
                </span>
              ) : null}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
