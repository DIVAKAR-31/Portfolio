import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  X,
  FileBadge,
  Code,
  Layout,
  Palette,
  Database,
  Laptop,
  Terminal,
  Lightbulb,
  Trophy,
  FileText,
  Building2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionHeading } from '../common/SectionHeading';
import { certificationsAchievementsData } from '../../data/portfolioData';
import { AchievementItem, AchievementCategory } from '../../types/portfolio';
import { Card3D } from '../common/Card3D';

const categoryIconMap: Record<string, React.ElementType> = {
  code: Code,
  layout: Layout,
  figma: Palette,
  database: Database,
  laptop: Laptop,
  terminal: Terminal,
  lightbulb: Lightbulb,
  trophy: Trophy,
  fileText: FileText,
};

const filterTabs = [
  { label: 'All', key: 'All' },
  { label: 'Workshops & Events', key: 'Workshop' },
  { label: 'Hackathons & Ideathons', key: 'Ideathon' },
  { label: 'Paper Presentations', key: 'Paper Presentation' },
];

export const Certifications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<AchievementCategory>('All');
  const [viewingCertificate, setViewingCertificate] = useState<AchievementItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Close certificate modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setViewingCertificate(null);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenCertificate = (item: AchievementItem) => {
    setViewingCertificate(item);
    setZoomLevel(1);

    // Subtle celebratory confetti
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#38BDF8', '#22D3EE', '#2563EB', '#F8FAFC'],
      });
    } catch {
      // Ignore if confetti is blocked
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const filteredItems = certificationsAchievementsData.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Ideathon') {
      return item.category === 'Ideathon' || item.category === 'Hackathon';
    }
    return item.category === activeFilter;
  });

  return (
    <section id="achievements" className="relative py-24 overflow-hidden scroll-mt-12">
      {/* Anchor alias to support legacy #certifications links */}
      <span id="certifications" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Verified Accomplishments"
          title="Certifications & Achievements"
          subtitle="Verified accomplishments across collegiate workshops, hackathons, ideathons, and academic paper presentations."
        />

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.key;
            const count = certificationsAchievementsData.filter((i) => {
              if (tab.key === 'All') return true;
              if (tab.key === 'Ideathon') return i.category === 'Ideathon' || i.category === 'Hackathon';
              return i.category === tab.key;
            }).length;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as AchievementCategory)}
                className={`relative px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-cyanAccent bg-slate-900 border border-cyanAccent/50 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                    : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive ? 'bg-cyanAccent/20 text-cyanAccent' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certifications Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => {
              const Icon = categoryIconMap[item.iconType || ''] || Award;
              const hasCertificateFile = Boolean(item.certificateUrl || item.certificateImage);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full"
                >
                  <Card3D maxTilt={5} scaleHover={1.02} className="h-full">
                    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-electricBlue/20 hover:border-cyanAccent transition-all duration-300 flex flex-col justify-between group shadow-card-glow relative overflow-hidden h-full">
                      {/* Ambient background glow */}
                      <div className="absolute top-0 right-0 w-28 h-28 bg-cyanAccent/5 rounded-full blur-2xl group-hover:bg-cyanAccent/15 transition-all pointer-events-none" />

                      <div>
                        {/* Top Header Badge & Tag */}
                        <div className="flex items-center justify-between gap-2 mb-5">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-electricBlue/20 to-primaryBlue/20 border border-electricBlue/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-cyanAccent" />
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-mono uppercase px-3 py-1 rounded-full border ${
                                item.badgeColor || 'border-slate-700 text-slate-300 bg-slate-900/80'
                              }`}
                            >
                              {item.categoryLabel || item.category}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white group-hover:text-cyanAccent transition-colors mb-1.5 leading-snug">
                          {item.title}
                        </h3>

                        {/* Organization & Date */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyanAccent/80 mb-3">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-electricBlue" />
                            <span>{item.organization}</span>
                          </span>
                          {item.date && (
                            <>
                              <span className="text-slate-600">•</span>
                              <span className="flex items-center gap-1 text-slate-400">
                                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                <span>{item.date}</span>
                              </span>
                            </>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
                          {item.description}
                        </p>

                        {/* Interactive Certificate Photo Preview Card */}
                        {hasCertificateFile && (
                          <div
                            onClick={() => handleOpenCertificate(item)}
                            className="relative my-3 rounded-2xl overflow-hidden border border-electricBlue/25 bg-slate-950/80 group/thumb cursor-pointer shadow-md hover:border-cyanAccent transition-all duration-300"
                            title="Click to view full certificate photo"
                          >
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                              <img
                                src={item.certificateImage || item.certificateUrl}
                                alt={`${item.title} Certificate`}
                                className="w-full h-full object-cover object-top filter brightness-[0.98] group-hover/thumb:scale-105 group-hover/thumb:brightness-105 transition-all duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-darkBgSecondary/90 via-transparent to-transparent opacity-60 group-hover/thumb:opacity-30 transition-opacity" />
                              <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-darkBg/90 backdrop-blur-md border border-cyanAccent/40 text-[10px] font-mono text-cyanAccent flex items-center gap-1.5 shadow-lg group-hover/thumb:scale-105 transition-transform">
                                <ZoomIn className="w-3 h-3 text-cyanAccent" />
                                <span>Click to Zoom</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Skills / Highlight Tags */}
                        {item.skillsOrHighlights && item.skillsOrHighlights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {item.skillsOrHighlights.map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-slate-300 group-hover:border-electricBlue/30 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Footer / Action Controls */}
                      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
                        {/* Credential ID or Verification Status */}
                        {item.credentialId ? (
                          <span className="text-[10px] font-mono text-mutedText truncate max-w-[150px]">
                            ID: <span className="text-cyanAccent">{item.credentialId}</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Verified</span>
                          </span>
                        )}

                        {/* Certificate View Button (Rendered ONLY when real certificate file exists) */}
                        {hasCertificateFile ? (
                          <button
                            onClick={() => handleOpenCertificate(item)}
                            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-primaryBlue/80 to-sky-500/80 hover:from-primaryBlue hover:to-sky-400 text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-neon-blue group-hover:scale-105 cursor-pointer"
                          >
                            <FileBadge className="w-3.5 h-3.5" />
                            <span>View Certificate</span>
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Official Milestone</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* High-Resolution Certificate Viewing Modal (Zoomable, Full-Screen, Open in New Tab) */}
      <AnimatePresence>
        {viewingCertificate && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setViewingCertificate(null);
                setZoomLevel(1);
              }}
              className="fixed inset-0 bg-[#050816]/90 backdrop-blur-xl"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[92vh] glass-modal rounded-3xl border border-cyanAccent/40 shadow-2xl z-10 flex flex-col overflow-hidden bg-darkBgSecondary/95"
            >
              {/* Top Modal Controls Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-electricBlue/30 flex items-center justify-center text-cyanAccent">
                    <FileBadge className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {viewingCertificate.title}
                    </h4>
                    <p className="text-[11px] font-mono text-cyanAccent/90">
                      {viewingCertificate.organization} {viewingCertificate.date ? `• ${viewingCertificate.date}` : ''}
                    </p>
                  </div>
                </div>

                {/* Viewer Tools (Zoom In, Zoom Out, Reset, Open New Tab, Close) */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyanAccent transition-colors"
                    title="Zoom Out"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleResetZoom}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyanAccent text-xs font-mono transition-colors"
                    title="Reset Zoom"
                    aria-label="Reset Zoom"
                  >
                    {Math.round(zoomLevel * 100)}%
                  </button>

                  <button
                    onClick={handleZoomIn}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyanAccent transition-colors"
                    title="Zoom In"
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  {viewingCertificate.certificateUrl && (
                    <a
                      href={viewingCertificate.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyanAccent transition-colors ml-1"
                      title="Open Certificate in New Tab"
                      aria-label="Open Certificate in New Tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      setViewingCertificate(null);
                      setZoomLevel(1);
                    }}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors ml-1"
                    title="Close Viewer (Esc)"
                    aria-label="Close Viewer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Certificate Preview Body with Interactive Zoom */}
              <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[#030612]/90 min-h-[350px]">
                {viewingCertificate.certificateUrl || viewingCertificate.certificateImage ? (
                  <div
                    className="transition-transform duration-200 origin-center max-w-full"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    {viewingCertificate.certificateUrl?.endsWith('.pdf') ? (
                      <iframe
                        src={viewingCertificate.certificateUrl}
                        title={viewingCertificate.title}
                        className="w-full min-w-[320px] sm:min-w-[700px] h-[500px] rounded-xl border border-slate-800 shadow-2xl"
                      />
                    ) : (
                      <img
                        src={viewingCertificate.certificateImage || viewingCertificate.certificateUrl}
                        alt={`${viewingCertificate.title} Certificate`}
                        className="max-h-[70vh] w-auto rounded-xl border border-electricBlue/30 shadow-2xl object-contain"
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-cyanAccent/40 flex items-center justify-center mx-auto text-cyanAccent">
                      <Award className="w-8 h-8" />
                    </div>
                    <h5 className="text-lg font-bold text-white">{viewingCertificate.title}</h5>
                    <p className="text-xs text-mutedText max-w-md mx-auto">
                      Official credential issued by {viewingCertificate.organization}.
                    </p>
                    {viewingCertificate.credentialId && (
                      <span className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyanAccent text-xs font-mono">
                        Credential ID: {viewingCertificate.credentialId}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer Bar */}
              <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between text-xs font-mono text-mutedText">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Authenticated Credential Record</span>
                </span>
                <span>Use controls above to zoom, open in new tab, or close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
