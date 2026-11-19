import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stage, setStage] = useState<'initial' | 'starPulsing' | 'cometFlying' | 'expanding' | 'done'>('initial');
  const animFrameId = useRef<number | null>(null);

  const handleSkip = useCallback(() => {
    if (animFrameId.current) {
      cancelAnimationFrame(animFrameId.current);
    }
    setStage('done');
    sessionStorage.setItem('divakar_portfolio_intro_seen', 'true');
    setTimeout(() => {
      onComplete();
    }, 350);
  }, [onComplete]);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      handleSkip();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const cometColors = ['#FFFFFF', '#38BDF8', '#22D3EE', '#60A5FA', '#0284C7'];

    // Faint atmospheric stars
    const staticStars = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      flickerSpeed: Math.random() * 0.02 + 0.01,
      flickerDirection: 1,
    }));

    let startTime = performance.now();

    // Sequence:
    // 0 - 900ms: Star shines in center, brightens and pulses
    // 900ms - 2400ms: Star falls/shoots like a blazing comet across the sky
    // 2400ms - 2900ms: Cosmic light expands
    // 2900ms+: Automatically transitions to home page

    const loop = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      // Dark navy cosmos background
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, width, height);

      // Render static background starry atmosphere
      staticStars.forEach((s) => {
        s.alpha += s.flickerSpeed * s.flickerDirection;
        if (s.alpha > 0.9) s.flickerDirection = -1;
        if (s.alpha < 0.2) s.flickerDirection = 1;
        ctx.fillStyle = `rgba(224, 242, 254, ${s.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (elapsed < 900) {
        // Stage 1: Central star emerges, shines, flares
        if (stage !== 'starPulsing') setStage('starPulsing');
        const progress = Math.min(1, elapsed / 900);

        const centerX = width / 2;
        const centerY = height / 2;

        const glowSize = 70 * progress + Math.sin(progress * Math.PI * 2) * 15;
        const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize);
        glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        glowGrad.addColorStop(0.25, 'rgba(56, 189, 248, 0.85)');
        glowGrad.addColorStop(0.6, 'rgba(34, 211, 238, 0.35)');
        glowGrad.addColorStop(1, 'rgba(5, 8, 22, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Star core
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 3.2 * progress, 0, Math.PI * 2);
        ctx.fill();

        // Flare spikes
        const spikeLen = 25 * progress;
        ctx.strokeStyle = `rgba(248, 250, 252, ${0.85 * progress})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(centerX - spikeLen, centerY);
        ctx.lineTo(centerX + spikeLen, centerY);
        ctx.moveTo(centerX, centerY - spikeLen);
        ctx.lineTo(centerX, centerY + spikeLen);
        ctx.stroke();

      } else if (elapsed >= 900 && elapsed < 2400) {
        // Stage 2: Star falls and shoots across the sky like a brilliant comet
        if (stage !== 'cometFlying') setStage('cometFlying');
        const travelProgress = (elapsed - 900) / 1500; // 0 to 1

        // Smooth falling swooping trajectory from upper left through center to bottom/right
        const startX = -40;
        const startY = height * 0.15;
        const cp1x = width * 0.35;
        const cp1y = height * 0.45;
        const cp2x = width * 0.65;
        const cp2y = height * 0.7;
        const endX = width + 60;
        const endY = height * 0.85;

        const t = travelProgress;
        const invT = 1 - t;
        const curX =
          invT * invT * invT * startX +
          3 * invT * invT * t * cp1x +
          3 * invT * t * t * cp2x +
          t * t * t * endX;
        const curY =
          invT * invT * invT * startY +
          3 * invT * invT * t * cp1y +
          3 * invT * t * t * cp2y +
          t * t * t * endY;

        // Spawn trailing comet stardust
        for (let i = 0; i < 7; i++) {
          particles.push({
            x: curX + (Math.random() - 0.5) * 8,
            y: curY + (Math.random() - 0.5) * 8,
            vx: -4 - Math.random() * 4,
            vy: -1.5 - Math.random() * 3,
            size: Math.random() * 3.5 + 1.2,
            alpha: 1,
            life: 0,
            maxLife: 35 + Math.random() * 25,
            color: cometColors[Math.floor(Math.random() * cometColors.length)],
          });
        }

        // Draw and update trailing particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life++;
          p.alpha = 1 - p.life / p.maxLife;

          if (p.life >= p.maxLife || p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        // Comet Head Glow (Electric Blue + Cyan + White Core)
        const headGlow = ctx.createRadialGradient(curX, curY, 0, curX, curY, 75);
        headGlow.addColorStop(0, '#FFFFFF');
        headGlow.addColorStop(0.2, '#38BDF8');
        headGlow.addColorStop(0.5, 'rgba(34, 211, 238, 0.45)');
        headGlow.addColorStop(1, 'rgba(5, 8, 22, 0)');

        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(curX, curY, 75, 0, Math.PI * 2);
        ctx.fill();

        // White-hot nucleus
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(curX, curY, 5.5, 0, Math.PI * 2);
        ctx.fill();

      } else if (elapsed >= 2400 && elapsed < 2900) {
        // Stage 3: Light expands across screen
        if (stage !== 'expanding') setStage('expanding');
        const expandProg = (elapsed - 2400) / 500;

        const flashRadius = Math.max(width, height) * 1.5 * expandProg;
        const flashAlpha = Math.sin(expandProg * Math.PI) * 0.95;

        const expandGlow = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          0,
          width * 0.5,
          height * 0.5,
          flashRadius
        );
        expandGlow.addColorStop(0, `rgba(56, 189, 248, ${flashAlpha * 0.6})`);
        expandGlow.addColorStop(0.4, `rgba(34, 211, 238, ${flashAlpha * 0.35})`);
        expandGlow.addColorStop(0.8, `rgba(37, 99, 235, ${flashAlpha * 0.15})`);
        expandGlow.addColorStop(1, 'rgba(5, 8, 22, 0)');

        ctx.fillStyle = expandGlow;
        ctx.fillRect(0, 0, width, height);

      } else if (elapsed >= 2900) {
        // Automatically smoothly navigate to home page!
        handleSkip();
        return;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleSkip, stage]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 overflow-hidden bg-darkBg select-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-darkBg/80 via-transparent to-darkBg/60" />

      {/* Cinematic Center Text Reveal */}
      <AnimatePresence>
        {stage === 'starPulsing' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.9, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          >
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-cyanAccent block">
              INITIALIZING EXPERIENCE
            </span>
            <span className="text-sm text-mutedText/80 font-sans tracking-wider mt-1 block">
              DIVAKAR S. — PORTFOLIO
            </span>
          </motion.div>
        )}

        {stage === 'cometFlying' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]">
              DIVAKAR S.
            </h1>
            <p className="text-xs md:text-sm font-mono text-electricBlue/80 tracking-[0.25em] mt-2 uppercase">
              Building Ideas Into Digital Experiences
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Intro Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        onClick={handleSkip}
        className="absolute top-6 right-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-slate-800/80 text-xs font-mono text-cyanAccent/90 border border-electricBlue/30 hover:border-electricBlue transition-all group shadow-neon-blue"
        aria-label="Skip cinematic intro"
      >
        <span>Skip Intro</span>
        <X className="w-3.5 h-3.5 text-electricBlue group-hover:rotate-90 transition-transform duration-300" />
      </motion.button>
    </motion.div>
  );
};
