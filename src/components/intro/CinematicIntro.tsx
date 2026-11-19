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
  const [stage, setStage] = useState<'initial' | 'starPulsing' | 'cometFalling' | 'bottomImpact' | 'done'>('initial');
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
    const cometColors = ['#FFFFFF', '#38BDF8', '#22D3EE', '#60A5FA', '#38BDF8'];

    // Faint atmospheric background stars
    const backgroundStars = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.3 + 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      flickerSpeed: Math.random() * 0.02 + 0.01,
      flickerDirection: 1,
    }));

    let startTime = performance.now();

    // Visual Choreography:
    // 0 - 1100ms: One star comes into the upper sky and shines brightly
    // 1100ms - 2600ms: Star falls downwards across the screen like a comet toward the bottom
    // 2600ms - 3100ms: Star falls on the bottom, creates radiant upward horizon glow
    // 3100ms+: Homepage smoothly comes into view

    const loop = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      // Dark space canvas
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, width, height);

      // Render static background starry atmosphere
      backgroundStars.forEach((s) => {
        s.alpha += s.flickerSpeed * s.flickerDirection;
        if (s.alpha > 0.85) s.flickerDirection = -1;
        if (s.alpha < 0.2) s.flickerDirection = 1;
        ctx.fillStyle = `rgba(224, 242, 254, ${s.alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Starting Star Coordinates (Upper Center Sky)
      const starOriginX = width * 0.5;
      const starOriginY = height * 0.26;

      if (elapsed < 1100) {
        // Phase 1: One star comes and shines brightly in the sky
        if (stage !== 'starPulsing') setStage('starPulsing');
        const progress = Math.min(1, elapsed / 1100);

        // Radiant expanding star flare
        const glowRadius = 75 * progress + Math.sin(progress * Math.PI * 3) * 15;
        const starGlow = ctx.createRadialGradient(
          starOriginX,
          starOriginY,
          0,
          starOriginX,
          starOriginY,
          glowRadius
        );
        starGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
        starGlow.addColorStop(0.2, 'rgba(56, 189, 248, 0.9)');
        starGlow.addColorStop(0.55, 'rgba(34, 211, 238, 0.35)');
        starGlow.addColorStop(1, 'rgba(5, 8, 22, 0)');

        ctx.fillStyle = starGlow;
        ctx.beginPath();
        ctx.arc(starOriginX, starOriginY, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Shimmering white core
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(starOriginX, starOriginY, 3.8 * progress, 0, Math.PI * 2);
        ctx.fill();

        // Cross flare diffraction spikes
        const spikeLength = 32 * progress;
        ctx.strokeStyle = `rgba(248, 250, 252, ${0.9 * progress})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(starOriginX - spikeLength, starOriginY);
        ctx.lineTo(starOriginX + spikeLength, starOriginY);
        ctx.moveTo(starOriginX, starOriginY - spikeLength);
        ctx.lineTo(starOriginX, starOriginY + spikeLength);
        ctx.stroke();

        // Secondary diagonal flare
        const diagLen = 16 * progress;
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.7 * progress})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(starOriginX - diagLen, starOriginY - diagLen);
        ctx.lineTo(starOriginX + diagLen, starOriginY + diagLen);
        ctx.moveTo(starOriginX - diagLen, starOriginY + diagLen);
        ctx.lineTo(starOriginX + diagLen, starOriginY - diagLen);
        ctx.stroke();

      } else if (elapsed >= 1100 && elapsed < 2600) {
        // Phase 2: Star falls like a comet toward the bottom of the screen
        if (stage !== 'cometFalling') setStage('cometFalling');
        const fallProgress = (elapsed - 1100) / 1500; // 0 to 1

        // Quadratic Bézier curve falling downwards toward bottom center-right
        const startX = starOriginX;
        const startY = starOriginY;
        const cpX = width * 0.44;
        const cpY = height * 0.6;
        const endX = width * 0.52;
        const endY = height + 40; // Falls all the way to the bottom

        // Current comet position (accelerating downward)
        const t = Math.pow(fallProgress, 1.15); // natural acceleration
        const invT = 1 - t;
        const curX = invT * invT * startX + 2 * invT * t * cpX + t * t * endX;
        const curY = invT * invT * startY + 2 * invT * t * cpY + t * t * endY;

        // Spawn upward/backward trailing comet particles as it falls
        for (let i = 0; i < 8; i++) {
          particles.push({
            x: curX + (Math.random() - 0.5) * 8,
            y: curY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 3,
            vy: -4 - Math.random() * 4, // Trail shoots upward behind the falling star
            size: Math.random() * 3.8 + 1.2,
            alpha: 1,
            life: 0,
            maxLife: 38 + Math.random() * 25,
            color: cometColors[Math.floor(Math.random() * cometColors.length)],
          });
        }

        // Draw and update trailing tail particles
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

        // Falling Comet Head Glow
        const headRadius = 80;
        const headGlow = ctx.createRadialGradient(curX, curY, 0, curX, curY, headRadius);
        headGlow.addColorStop(0, '#FFFFFF');
        headGlow.addColorStop(0.25, '#38BDF8');
        headGlow.addColorStop(0.55, 'rgba(34, 211, 238, 0.45)');
        headGlow.addColorStop(1, 'rgba(5, 8, 22, 0)');

        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(curX, curY, headRadius, 0, Math.PI * 2);
        ctx.fill();

        // Radiant comet nucleus falling downward
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(curX, curY, 5.5, 0, Math.PI * 2);
        ctx.fill();

      } else if (elapsed >= 2600 && elapsed < 3100) {
        // Phase 3: Star falls on the bottom -> radiant light illuminates upward from the bottom
        if (stage !== 'bottomImpact') setStage('bottomImpact');
        const impactProgress = (elapsed - 2600) / 500; // 0 to 1

        const bottomGlowRadius = Math.max(width, height) * 1.3 * impactProgress;
        const glowAlpha = Math.sin(impactProgress * Math.PI) * 0.9;

        // Radiant glow expanding upward from the bottom
        const bottomGlow = ctx.createRadialGradient(
          width * 0.52,
          height,
          0,
          width * 0.52,
          height,
          bottomGlowRadius
        );
        bottomGlow.addColorStop(0, `rgba(56, 189, 248, ${glowAlpha * 0.65})`);
        bottomGlow.addColorStop(0.35, `rgba(34, 211, 238, ${glowAlpha * 0.4})`);
        bottomGlow.addColorStop(0.7, `rgba(37, 99, 235, ${glowAlpha * 0.2})`);
        bottomGlow.addColorStop(1, 'rgba(5, 8, 22, 0)');

        ctx.fillStyle = bottomGlow;
        ctx.fillRect(0, 0, width, height);

      } else if (elapsed >= 3100) {
        // Star has fallen on the bottom -> Home page smoothly comes!
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
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 overflow-hidden bg-darkBg select-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-darkBg/70 via-transparent to-darkBg/60" />

      {/* Cinematic Center Text During Star Shining & Falling */}
      <AnimatePresence>
        {stage === 'starPulsing' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.9, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          >
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-cyanAccent block">
              INITIALIZING EXPERIENCE
            </span>
            <span className="text-sm text-mutedText/80 font-sans tracking-wider mt-1 block">
              DIVAKAR S. — PORTFOLIO
            </span>
          </motion.div>
        )}

        {stage === 'cometFalling' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center pointer-events-none"
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
        aria-label="Skip intro"
      >
        <span>Skip Intro</span>
        <X className="w-3.5 h-3.5 text-electricBlue group-hover:rotate-90 transition-transform duration-300" />
      </motion.button>
    </motion.div>
  );
};
