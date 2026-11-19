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

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl`}>
      {/* Futuristic Tag Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-electricBlue/30 text-xs font-mono tracking-wider text-cyanAccent uppercase mb-4 shadow-neon-blue ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent animate-pulse" />
        <span>{badge}</span>
      </motion.div>

      {/* Main Title with futuristic gradient */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
      >
        {title.split(' ').map((word, idx) => {
          // Highlight the last word or specific focus word with cyan/blue gradient
          const isHighlight = idx === title.split(' ').length - 1 || word.toLowerCase().includes('technical') || word.toLowerCase().includes('innovation');
          return (
            <span
              key={idx}
              className={isHighlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-cyanAccent' : 'text-lightWhite'}
            >
              {word}{' '}
            </span>
          );
        })}
      </motion.h2>

      {/* Optional Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-mutedText leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Futuristic subtle accent underline */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: isCenter ? '80px' : '60px', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className={`h-0.5 bg-gradient-to-r from-electricBlue to-transparent mt-6 ${isCenter ? 'mx-auto' : ''}`}
      />
    </div>
  );
};

