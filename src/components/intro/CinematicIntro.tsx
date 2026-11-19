import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Play } from 'lucide-react';

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
  const [canSkip, setCanSkip] = useState(true);
  const animFrameId = useRef<number | null>(null);

  const handleSkip = useCallback(() => {
    if (animFrameId.current) {
      cancelAnimationFrame(animFrameId.current);
    }
    setStage('done');
    sessionStorage.setItem('divakar_portfolio_intro_seen', 'true');
    setTimeout(() => {
      onComplete();
    }, 400);
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

    // Particle pool for comet trail and stardust
    const particles: Particle[] = [];
    const cometColors = ['#38BDF8', '#22D3EE', '#60A5FA', '#FFFFFF', '#0284C7'];

    // Background faint stars
    const staticStars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      flickerSpeed: Math.random() * 0.02 + 0.01,
      flickerDirection: 1
    }));

    let startTime = performance.now();
    let cometPos = { x: width * 0.1, y: height * 0.85 };
    let cometVelocity = { vx: 0, vy: 0 };
    let starGlow = 0;
    let flashRadius = 0;
    let flashAlpha = 0;

    // Timeline phases:
    // 0 - 1000ms: Dark navy stillness, center star appears
    // 1000 - 2200ms: Star brightens, pulses, flare grows
    // 2200 - 4500ms: Star shoots in an arc across the screen, tail grows into brilliant electric-blue comet
    // 4500 - 5200ms: Comet light expands across the entire screen
    // 5200ms+: Reveal homepage

    const loop = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      // Clear with dark navy
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, width, height);

      // Draw static background starry atmosphere
      staticStars.forEach(s => {
        s.alpha += s.flickerSpeed * s.flickerDirection;
        if (s.alpha > 0.9) s.flickerDirection = -1;
        if (s.alpha < 0.2) s.flickerDirection = 1;
        ctx.fillStyle = `rgba(224, 242, 254, ${s.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (elapsed < 1200) {
        // Stage 1: Central tiny star emerges in center
        if (stage !== 'starPulsing') setStage('starPulsing');
        const progress = Math.min(1, elapsed / 1200);
        starGlow = progress;

        const centerX = width / 2;
        const centerY = height / 2;

        // Radial glow
        const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80 * progress);
        glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
        glowGrad.addColorStop(0.3, 'rgba(34, 211, 238, 0.4)');
        glowGrad.addColorStop(1, 'rgba(5, 8, 22, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 80 * progress, 0, Math.PI * 2);
        ctx.fill();

        // White-blue star center
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 2.5 * progress, 0, Math.PI * 2);
        ctx.fill();

        // Light cross spikes
        ctx.strokeStyle = `rgba(248, 250, 252, ${0.7 * progress})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(centerX - 15 * progress, centerY);
        ctx.lineTo(centerX + 15 * progress, centerY);
        ctx.moveTo(centerX, centerY - 15 * progress);
        ctx.lineTo(centerX, centerY + 15 * progress);
        ctx.stroke();

      } else if (elapsed >= 1200 && elapsed < 2200) {
        // Stage 2: Star pulsing brighter and preparing to shoot
        const p = (elapsed - 1200) / 1000;
        const centerX = width / 2;
        const centerY = height / 2;

        const pulseSize = 90 + Math.sin(p * Math.PI * 3) * 20;
        const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize);
        glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        glowGrad.addColorStop(0.2, 'rgba(56, 189, 248, 0.8)');
        glowGrad.addColorStop(0.6, 'rgba(34, 211, 238, 0.3)');
        glowGrad.addColorStop(1, 'rgba(5, 8, 22, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Star core
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Star flare spikes
        const spikeLen = 30 + p * 20;
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.9 - p * 0.2})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX - spikeLen, centerY);
        ctx.lineTo(centerX + spikeLen, centerY);
        ctx.moveTo(centerX, centerY - spikeLen);
        ctx.lineTo(centerX, centerY + spikeLen);
        ctx.stroke();

      } else if (elapsed >= 2200 && elapsed < 4600) {
        // Stage 3: Shooting star moves across the screen and transforms into a glorious electric-blue comet
        if (stage !== 'cometFlying') setStage('cometFlying');
        const travelProgress = (elapsed - 2200) / 2400; // 0 to 1

        // Smooth curved bezier-like trajectory from bottom-left swooping through center to top-right
        const startX = -50;
        const startY = height * 0.8;
        const cp1x = width * 0.3;
        const cp1y = height * 0.65;
        const cp2x = width * 0.6;
        const cp2y = height * 0.35;
        const endX = width + 60;
        const endY = height * 0.15;

        // Cubic bezier calculation
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

        cometPos = { x: curX, y: curY };

        // Spawn trailing comet particles
        const spawnCount = 6;
        for (let i = 0; i < spawnCount; i++) {
          const jitter = (Math.random() - 0.5) * 8;
          particles.push({
            x: curX + (Math.random() - 0.5) * 6,
            y: curY + (Math.random() - 0.5) * 6,
            vx: -3 - Math.random() * 4 + (Math.random() - 0.5) * 2,
            vy: 1.5 + Math.random() * 3 + jitter * 0.2,
            size: Math.random() * 3.5 + 1.2,
            alpha: 1,
            life: 0,
            maxLife: 40 + Math.random() * 35,
            color: cometColors[Math.floor(Math.random() * cometColors.length)]
          });
        }

        // Draw and update particles (comet tail)
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
        const headGlow = ctx.createRadialGradient(curX, curY, 0, curX, curY, 70);
        headGlow.addColorStop(0, '#FFFFFF');
        headGlow.addColorStop(0.2, '#38BDF8');
        headGlow.addColorStop(0.5, 'rgba(34, 211, 238, 0.4)');
        headGlow.addColorStop(1, 'rgba(5, 8, 22, 0)');

        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(curX, curY, 70, 0, Math.PI * 2);
        ctx.fill();

        // Brilliant comet nucleus
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(curX, curY, 5, 0, Math.PI * 2);
        ctx.fill();

      } else if (elapsed >= 4600 && elapsed < 5400) {
        // Stage 4: Light expands across the screen
        if (stage !== 'expanding') setStage('expanding');
        const expandProg = (elapsed - 4600) / 800; // 0 to 1

        flashRadius = Math.max(width, height) * 1.4 * expandProg;
        flashAlpha = Math.sin(expandProg * Math.PI) * 0.95;

        // Expansion wave
        const expandGlow = ctx.createRadialGradient(
          width * 0.6,
          height * 0.4,
          0,
          width * 0.6,
          height * 0.4,
          flashRadius
        );
        expandGlow.addColorStop(0, `rgba(56, 189, 248, ${flashAlpha * 0.7})`);
        expandGlow.addColorStop(0.4, `rgba(34, 211, 238, ${flashAlpha * 0.4})`);
        expandGlow.addColorStop(0.8, `rgba(37, 99, 235, ${flashAlpha * 0.2})`);
        expandGlow.addColorStop(1, 'rgba(5, 8, 22, 0)');

        ctx.fillStyle = expandGlow;
        ctx.fillRect(0, 0, width, height);

        // Fade remaining particles
        particles.forEach(p => {
          p.alpha *= 0.9;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1.0;

      } else if (elapsed >= 5400) {
        // Stage 5: Complete & Reveal Homepage
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-darkBg select-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Atmospheric Vignette & Futuristic Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-darkBg/80 via-transparent to-darkBg/60" />

      {/* Cinematic Center Text Reveal during middle phase */}
      <AnimatePresence>
        {stage === 'starPulsing' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.85, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          >
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-cyanAccent/90 block">
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
            transition={{ duration: 0.6 }}
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
      {canSkip && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          onClick={handleSkip}
          className="absolute top-6 right-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-slate-800/80 text-xs font-mono text-cyanAccent/90 border border-electricBlue/30 hover:border-electricBlue transition-all group shadow-neon-blue"
          aria-label="Skip cinematic intro"
        >
          <span>Skip Intro</span>
          <X className="w-3.5 h-3.5 text-electricBlue group-hover:rotate-90 transition-transform duration-300" />
        </motion.button>
      )}

      {/* Subtext info */}
      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-mutedText/50 tracking-wider">
        <span>CINEMATIC INTRO • ELECTRIC-BLUE COMET</span>
      </div>
    </div>
  );
};

