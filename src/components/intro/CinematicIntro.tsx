import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  // Animation phases:
  // 1: star-shining (0 - 900ms): One star comes into the upper sky and shines brightly
  // 2: comet-falling (900ms - 2200ms): Star falls downwards like a comet toward the bottom
  // 3: bottom-impact (2200ms - 2600ms): Star strikes bottom, radiating upward horizon glow
  // 4: complete (2600ms): Intro finishes, home page runs automatically
  const [phase, setPhase] = useState<'shining' | 'falling' | 'impact'>('shining');

  useEffect(() => {
    // Phase 1 -> Phase 2: Start falling at 900ms
    const timerFalling = setTimeout(() => {
      setPhase('falling');
    }, 900);

    // Phase 2 -> Phase 3: Impact bottom at 2200ms
    const timerImpact = setTimeout(() => {
      setPhase('impact');
    }, 2200);

    // Phase 3 -> Finish: Transition to home page at 2600ms
    const timerComplete = setTimeout(() => {
      onComplete();
    }, 2650);

    return () => {
      clearTimeout(timerFalling);
      clearTimeout(timerImpact);
      clearTimeout(timerComplete);
    };
  }, [onComplete]);

  // Faint ambient background stars
  const backgroundStars = [
    { top: '15%', left: '12%', size: 2, delay: 0 },
    { top: '25%', left: '82%', size: 1.5, delay: 0.3 },
    { top: '45%', left: '18%', size: 2.5, delay: 0.5 },
    { top: '35%', left: '72%', size: 1, delay: 0.2 },
    { top: '65%', left: '28%', size: 1.8, delay: 0.6 },
    { top: '75%', left: '88%', size: 2, delay: 0.4 },
    { top: '85%', left: '15%', size: 1.5, delay: 0.1 },
    { top: '55%', left: '85%', size: 2.2, delay: 0.7 },
    { top: '10%', left: '60%', size: 1.8, delay: 0.3 },
    { top: '30%', left: '35%', size: 1.2, delay: 0.5 },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 overflow-hidden bg-[#050816] select-none pointer-events-none flex items-center justify-center"
    >
      {/* Ambient Twinkling Cosmic Background */}
      {backgroundStars.map((star, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-white/70"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(56, 189, 248, 0.8)`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-[#050816]/70 pointer-events-none" />

      {/* THE ONE STAR & COMET */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
        initial={{ top: '22%' }}
        animate={
          phase === 'shining'
            ? { top: '22%', scale: 1 }
            : {
                top: '106%',
                scale: [1, 1.1, 0.9],
              }
        }
        transition={
          phase === 'shining'
            ? { duration: 0.8 }
            : {
                duration: 1.3,
                ease: [0.45, 0, 0.75, 1], // Natural gravitational acceleration downward
              }
        }
      >
        {/* Comet Tail (visible and extending upward behind the star as it falls) */}
        {phase !== 'shining' && (
          <motion.div
            initial={{ opacity: 0, height: 40 }}
            animate={{ opacity: 1, height: 240 }}
            transition={{ duration: 0.35 }}
            className="w-1.5 -mb-2 flex flex-col items-center origin-bottom"
          >
            {/* Luminous Tail Gradient */}
            <div
              className="w-full h-full rounded-t-full"
              style={{
                background:
                  'linear-gradient(to top, rgba(255,255,255,0.95), rgba(56,189,248,0.85) 25%, rgba(34,211,238,0.5) 60%, transparent 100%)',
                filter: 'drop-shadow(0 0 16px rgba(56,189,248,0.9))',
              }}
            />
            {/* Secondary Wider Cyan Aura Tail */}
            <div
              className="absolute w-8 h-full -top-1 blur-[8px] rounded-t-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(56,189,248,0.6), rgba(34,211,238,0.3) 40%, transparent 100%)',
              }}
            />
          </motion.div>
        )}

        {/* The Shining Star / Comet Nucleus */}
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsing Corona Glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 140,
              height: 140,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(56,189,248,0.7) 20%, rgba(34,211,238,0.35) 50%, transparent 75%)',
              filter: 'blur(10px)',
            }}
            animate={
              phase === 'shining'
                ? {
                    scale: [0.3, 1.2, 1],
                    opacity: [0, 1, 0.9],
                  }
                : {
                    scale: 1.15,
                    opacity: 1,
                  }
            }
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Sharp 4-Point Diffraction Cross Spikes (Shining Star) */}
          {phase === 'shining' && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.95], rotate: [0, 45, 0] }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="absolute pointer-events-none"
            >
              {/* Horizontal Spike */}
              <div
                className="w-24 h-[2px] bg-white rounded-full -translate-x-1/2 -translate-y-1/2 absolute"
                style={{
                  boxShadow: '0 0 12px #38BDF8, 0 0 24px #22D3EE',
                }}
              />
              {/* Vertical Spike */}
              <div
                className="h-24 w-[2px] bg-white rounded-full -translate-x-1/2 -translate-y-1/2 absolute"
                style={{
                  boxShadow: '0 0 12px #38BDF8, 0 0 24px #22D3EE',
                }}
              />
              {/* Diagonal Subtle Spikes */}
              <div
                className="w-14 h-[1px] bg-cyan-200/80 rounded-full -translate-x-1/2 -translate-y-1/2 absolute rotate-45"
                style={{
                  boxShadow: '0 0 8px #38BDF8',
                }}
              />
              <div
                className="w-14 h-[1px] bg-cyan-200/80 rounded-full -translate-x-1/2 -translate-y-1/2 absolute -rotate-45"
                style={{
                  boxShadow: '0 0 8px #38BDF8',
                }}
              />
            </motion.div>
          )}

          {/* Brilliant Blazing Star Core */}
          <motion.div
            className="w-4 h-4 rounded-full bg-white relative z-10"
            style={{
              boxShadow:
                '0 0 15px #FFFFFF, 0 0 30px #38BDF8, 0 0 50px #22D3EE',
            }}
            animate={
              phase === 'shining'
                ? {
                    scale: [0.2, 1.4, 1],
                  }
                : {
                    scale: [1, 1.3, 1],
                  }
            }
            transition={{ duration: 0.8 }}
          />
        </div>
      </motion.div>

      {/* RADIANT BOTTOM HORIZON FLASH (When star falls on the bottom) */}
      <AnimatePresence>
        {phase === 'impact' && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.3 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute bottom-0 left-0 right-0 h-[45vh] pointer-events-none origin-bottom flex items-end justify-center"
          >
            {/* Broad Upward Horizon Glow */}
            <div
              className="w-full h-full"
              style={{
                background:
                  'radial-gradient(ellipse 90% 80% at 50% 100%, rgba(56,189,248,0.7) 0%, rgba(34,211,238,0.4) 35%, rgba(37,99,235,0.15) 65%, transparent 100%)',
                filter: 'blur(20px)',
              }}
            />
            {/* Intense Bottom White/Cyan Light Baseline */}
            <div
              className="absolute bottom-0 w-3/4 h-2 rounded-full"
              style={{
                background:
                  'linear-gradient(to right, transparent, #38BDF8 25%, #FFFFFF 50%, #38BDF8 75%, transparent)',
                boxShadow: '0 0 35px #38BDF8, 0 0 70px #22D3EE',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek Subtitle While Star Shines */}
      <AnimatePresence>
        {phase === 'shining' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.9, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          >
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-cyanAccent block">
              DIVAKAR S.
            </span>
            <span className="text-xs text-mutedText/80 font-sans tracking-widest mt-1 block uppercase">
              Portfolio
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
