import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  X,
  Sparkles,
  FileBadge,
  Code,
  Layout,
  Palette,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionHeading } from '../common/SectionHeading';
import { certificationsData } from '../../data/portfolioData';
import { CertificationEntry } from '../../types/portfolio';

const certIconMap: Record<string, React.ElementType> = {
  code: Code,
  layout: Layout,
  figma: Palette,
  database: Database,
};

export const Certifications: React.FC = () => {
  const [activeCert, setActiveCert] = useState<CertificationEntry | null>(null);

  const handleOpenCertificate = (cert: CertificationEntry) => {
    setActiveCert(cert);
    // Fire subtle celebratory confetti bursts
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#38BDF8', '#22D3EE', '#2563EB', '#F8FAFC']
      });
    } catch {
      // Fallback if canvas confetti fails
    }
  };

  return (
    <section id="certifications" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Verified Credentials & Certifications"
          title="Accreditations & Certificates"
          subtitle="Skill assessments, design credentials, and enterprise workshop completions verified through standard testing platforms."
        />

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsData.map((cert, idx) => {
            const Icon = certIconMap[cert.iconType] || FileBadge;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-3xl border border-electricBlue/20 hover:border-cyanAccent transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-card-glow relative overflow-hidden"
              >
                {/* Glow ambient background on card */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyanAccent/5 rounded-full blur-2xl group-hover:bg-cyanAccent/15 transition-all" />

                <div>
                  {/* Top Badge & Issuer */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 border border-electricBlue/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-cyanAccent" />
                    </div>

                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                      {cert.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyanAccent transition-colors mb-1">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-xs font-mono text-cyanAccent/90 mb-3">
                    {cert.issuer}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-darkBgSecondary border border-slate-800 text-[10px] font-sans text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Certificate Interaction */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-mutedText">
                    {cert.issueDate}
                  </span>

                  <button
                    onClick={() => handleOpenCertificate(cert)}
                    className="text-xs font-mono text-cyanAccent hover:text-white flex items-center gap-1 font-semibold group-hover:underline"
                  >
                    <span>View Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Future Certification Placeholder Info */}
        <div className="mt-8 p-4 rounded-2xl glass-panel border border-slate-800 text-center max-w-lg mx-auto">
          <p className="text-xs font-mono text-mutedText flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-cyanAccent" />
            <span>Additional technical certifications and cloud assessments in progress</span>
          </p>
        </div>
      </div>

      {/* Full-Screen Digital Certificate Modal */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-darkBg/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-xl glass-modal rounded-3xl p-8 border border-cyanAccent/40 shadow-2xl z-10 space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-cyanAccent font-mono text-xs font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-cyanAccent" />
                  Verified Credential Badge
                </div>

                <button
                  onClick={() => setActiveCert(null)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
                  aria-label="Close credential viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Digital Certificate Graphic Plaque */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-darkBgSecondary to-darkCard border-2 border-electricBlue/30 text-center space-y-4 shadow-neon-blue">
                {/* Outer frame styling */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyanAccent" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyanAccent" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyanAccent" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyanAccent" />

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primaryBlue to-cyanAccent p-0.5 mx-auto shadow-neon-glow">
                  <div className="w-full h-full bg-darkBg rounded-[14px] flex items-center justify-center">
                    <Award className="w-8 h-8 text-cyanAccent" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-mutedText block">
                    Certificate of Accomplishment
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {activeCert.title}
                  </h4>
                  <p className="text-xs font-mono text-cyanAccent mt-1">
                    Awarded by {activeCert.issuer}
                  </p>
                </div>

                <div className="pt-2 text-xs text-slate-300 max-w-sm mx-auto font-sans leading-relaxed">
                  Demonstrated proficiency and structured assessment completion in {activeCert.skills.join(', ')}.
                </div>

                {activeCert.credentialId && (
                  <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-mutedText flex items-center justify-center gap-2">
                    <span>Credential ID:</span>
                    <span className="text-cyanAccent font-bold">{activeCert.credentialId}</span>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Official Credential Verified
                </span>

                <button
                  onClick={() => setActiveCert(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

