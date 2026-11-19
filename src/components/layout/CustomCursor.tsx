import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer aura ring (cinematic delayed follow)
  const springConfig = { damping: 25, stiffness: 280, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let counter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Detect hover target
      const target = e.target as HTMLElement | null;
      if (target) {
        if (
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer') ||
          target.closest('.interactive-hover')
        ) {
          setCursorType('pointer');
        } else if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        ) {
          setCursorType('text');
        } else {
          setCursorType('default');
        }
      }

      // Add gentle stardust particle to trail periodically
      counter++;
      if (counter % 3 === 0) {
        setTrail((prev) => [
          ...prev.slice(-6),
          { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() },
        ]);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  const isPointer = cursorType === 'pointer';
  const isText = cursorType === 'text';

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
      {/* Stardust particle bubbles following the path */}
      {trail.map((point) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.65, scale: 1 }}
          animate={{ opacity: 0, scale: 0.1, y: -10 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-tr from-cyanAccent to-electricBlue blur-[0.6px]"
          style={{
            left: point.x - 4,
            top: point.y - 4,
          }}
        />
      ))}

      {/* Immediate Sharp Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#38bdf8] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isPointer ? 1.5 : isText ? 0.6 : 1,
          backgroundColor: isPointer ? '#22D3EE' : '#FFFFFF',
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer Spring Follow Halo */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-electricBlue/40 bg-sky-500/5 -translate-x-1/2 -translate-y-1/2 transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          width: isPointer ? 48 : isText ? 16 : 34,
          height: isPointer ? 48 : isText ? 36 : 34,
          borderRadius: isText ? '4px' : '9999px',
          borderColor: isPointer
            ? 'rgba(34, 211, 238, 0.75)'
            : 'rgba(56, 189, 248, 0.35)',
          boxShadow: isPointer
            ? '0 0 25px rgba(34, 211, 238, 0.35), inset 0 0 10px rgba(56, 189, 248, 0.15)'
            : '0 0 12px rgba(56, 189, 248, 0.15)',
        }}
      />
    </div>
  );
};
