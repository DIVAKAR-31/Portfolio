import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center'
}) => {
  const isCenter = align === 'center';
  const words = title.split(' ');

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl`}>
      {/* Futuristic Tag Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 15 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-electricBlue/30 text-xs font-mono tracking-wider text-cyanAccent uppercase mb-4 shadow-neon-blue ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent animate-pulse" />
        <span>{badge}</span>
      </motion.div>

      {/* Main Title with Staggered Word Mask Slide */}
      <div className={`flex flex-wrap ${isCenter ? 'justify-center' : 'justify-start'} gap-x-2.5 gap-y-1`}>
        {words.map((word, idx) => {
          const isHighlight =
            idx === words.length - 1 ||
            word.toLowerCase().includes('technical') ||
            word.toLowerCase().includes('innovation') ||
            word.toLowerCase().includes('competencies') ||
            word.toLowerCase().includes('projects');

          return (
            <div key={idx} className="overflow-hidden inline-block py-0.5">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 * idx,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight inline-block ${
                  isHighlight
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-electricBlue via-cyanAccent to-sky-300'
                    : 'text-lightWhite'
                }`}
              >
                {word}
              </motion.span>
            </div>
          );
        })}
      </div>

      {/* Subtitle with smooth fade & slide */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-base sm:text-lg text-mutedText leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Animated Glowing Accent Divider */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: isCenter ? '90px' : '65px', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
        className={`h-0.5 bg-gradient-to-r from-electricBlue via-cyanAccent to-transparent mt-6 ${
          isCenter ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
};
