import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer subtle shine ring
  const springConfig = { damping: 28, stiffness: 300, mass: 0.35 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

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
      {/* Sleek Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#38bdf8] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isPointer ? 1.4 : isText ? 0.6 : 1,
          backgroundColor: isPointer ? '#22D3EE' : '#FFFFFF',
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer Subtle Shine / Glow (No bubbles, clean minimal aura) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-electricBlue/35 bg-sky-500/5 -translate-x-1/2 -translate-y-1/2 transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          width: isPointer ? 44 : isText ? 16 : 30,
          height: isPointer ? 44 : isText ? 34 : 30,
          borderRadius: isText ? '4px' : '9999px',
          borderColor: isPointer
            ? 'rgba(34, 211, 238, 0.7)'
            : 'rgba(56, 189, 248, 0.3)',
          boxShadow: isPointer
            ? '0 0 20px rgba(34, 211, 238, 0.3)'
            : '0 0 10px rgba(56, 189, 248, 0.15)',
        }}
      />
    </div>
  );
};
