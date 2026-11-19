import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const BackgroundStarfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mouse coordinates for dynamic spotlight
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

  const springConfig = { damping: 30, stiffness: 180 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle starfield
    const STAR_COUNT = Math.min(110, Math.floor((width * height) / 13000));
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      baseAlpha: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.2 + 0.05,
      flickerSpeed: Math.random() * 0.015 + 0.005,
      flickerDir: Math.random() > 0.5 ? 1 : -1,
    }));

    // Micro-comet data
    interface MicroComet {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }

    const microComet: MicroComet = {
      x: 0,
      y: 0,
      length: 80,
      speed: 12,
      angle: Math.PI / 4,
      alpha: 0,
      active: false,
    };

    let lastCometSpawn = performance.now();

    const spawnMicroComet = () => {
      microComet.x = Math.random() * width * 0.75;
      microComet.y = Math.random() * (height * 0.35);
      microComet.length = Math.random() * 65 + 45;
      microComet.speed = Math.random() * 7 + 10;
      microComet.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.25;
      microComet.alpha = 0.75;
      microComet.active = true;
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Render drifting stars
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        star.alpha += star.flickerSpeed * star.flickerDir;
        if (star.alpha > star.baseAlpha + 0.3) star.flickerDir = -1;
        if (star.alpha < star.baseAlpha - 0.2) star.flickerDir = 1;

        ctx.fillStyle = `rgba(186, 230, 253, ${Math.max(0.1, star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn periodic subtle micro-comet every 11 seconds
      if (!microComet.active && time - lastCometSpawn > 11000) {
        spawnMicroComet();
        lastCometSpawn = time;
      }

      // Draw active micro comet
      if (microComet.active) {
        const dx = Math.cos(microComet.angle) * microComet.speed;
        const dy = Math.sin(microComet.angle) * microComet.speed;

        microComet.x += dx;
        microComet.y += dy;
        microComet.alpha -= 0.013;

        if (microComet.alpha <= 0 || microComet.x > width || microComet.y > height) {
          microComet.active = false;
        } else {
          const tailX = microComet.x - Math.cos(microComet.angle) * microComet.length;
          const tailY = microComet.y - Math.sin(microComet.angle) * microComet.length;

          const grad = ctx.createLinearGradient(microComet.x, microComet.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${microComet.alpha})`);
          grad.addColorStop(0.3, `rgba(56, 189, 248, ${microComet.alpha * 0.85})`);
          grad.addColorStop(0.7, `rgba(34, 211, 238, ${microComet.alpha * 0.4})`);
          grad.addColorStop(1, 'rgba(5, 8, 22, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(microComet.x, microComet.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          // Comet head sparkle
          ctx.fillStyle = `rgba(255, 255, 255, ${microComet.alpha})`;
          ctx.beginPath();
          ctx.arc(microComet.x, microComet.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep space base canvas */}
      <div className="absolute inset-0 bg-darkBg" />
      <div className="absolute inset-0 bg-futuristic-grid opacity-35" />

      {/* Dynamic Cursor Spotlight Following Mouse Position */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-40"
        style={{
          x: spotlightX,
          y: spotlightY,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(37, 99, 235, 0.08) 45%, transparent 70%)',
        }}
      />

      {/* Ambient Pulsing Atmospheric Nebula Glows */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-blue-600/12 blur-[140px] animate-pulse-slow" />
      <div className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] rounded-full bg-sky-500/10 blur-[160px] animate-pulse-slow" />
      <div className="absolute bottom-20 left-1/4 w-[30rem] h-[30rem] rounded-full bg-cyan-500/08 blur-[160px]" />

      {/* Dynamic Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
