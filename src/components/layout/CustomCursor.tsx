import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring for subtle luminous shine follow
  const springConfig = { damping: 28, stiffness: 320, mass: 0.3 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

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

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
      {/* Soft Luminous Cursor Shine (Pure borderless radial light shine, zero bubble round) */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-[8px]"
        style={{
          x: smoothX,
          y: smoothY,
          background: isPointer
            ? 'radial-gradient(circle, rgba(34, 211, 238, 0.45) 0%, rgba(56, 189, 248, 0.2) 35%, transparent 70%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(37, 99, 235, 0.1) 40%, transparent 70%)',
        }}
      />

      {/* Crisp White/Cyan Center Pointer Dot with soft light glow */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          backgroundColor: isPointer ? '#22D3EE' : '#FFFFFF',
          boxShadow: isPointer
            ? '0 0 14px #22D3EE, 0 0 4px #FFFFFF'
            : '0 0 10px #38BDF8, 0 0 3px #FFFFFF',
        }}
        animate={{
          scale: isPointer ? 1.4 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
