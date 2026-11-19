import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let counter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target is interactive
      const target = e.target as HTMLElement;
      const isInteractive = Boolean(
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      );
      setIsPointer(isInteractive);

      // Create subtle particle trail bubble
      counter++;
      if (counter % 3 === 0) {
        setTrail(prev => [
          ...prev.slice(-8),
          { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() }
        ]);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
      {/* Floating Stardust / Bubble Trail */}
      {trail.map((point) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2, y: -8 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute w-2 h-2 rounded-full bg-cyanAccent/50 blur-[1px]"
          style={{
            left: point.x - 4,
            top: point.y - 4,
          }}
        />
      ))}

      {/* Main Cursor Core */}
      <motion.div
        animate={{
          x: mousePosition.x - (isPointer ? 8 : 4),
          y: mousePosition.y - (isPointer ? 8 : 4),
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
        className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#38bdf8]"
      />

      {/* Outer Glowing Halo / Aura */}
      <motion.div
        animate={{
          x: mousePosition.x - (isPointer ? 24 : 16),
          y: mousePosition.y - (isPointer ? 24 : 16),
          scale: isPointer ? 1.3 : 1,
          borderColor: isPointer ? 'rgba(34, 211, 238, 0.8)' : 'rgba(56, 189, 248, 0.4)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 220, mass: 0.3 }}
        className="w-8 h-8 rounded-full border border-electricBlue/40 pointer-events-none bg-sky-500/5 backdrop-blur-[0.5px]"
      />
    </div>
  );
};

