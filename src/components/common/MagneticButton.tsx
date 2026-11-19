import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  href,
  target,
  rel,
  ariaLabel
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-fidelity magnetic spring physics
  const springConfig = { stiffness: 350, damping: 18, mass: 0.2 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const distanceX = clientX - (left + width / 2);
    const distanceY = clientY - (top + height / 2);

    // Magnetic pull strength
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primaryBlue via-sky-500 to-cyan-400 hover:from-blue-600 hover:via-sky-400 hover:to-cyan-300 text-white font-medium shadow-neon-blue border border-electricBlue/40';
      case 'secondary':
        return 'glass-panel text-white hover:bg-slate-800/80 border border-electricBlue/30 hover:border-cyanAccent';
      case 'outline':
        return 'bg-transparent text-cyanAccent border border-cyanAccent/50 hover:bg-cyan-500/10 hover:border-cyanAccent';
      case 'ghost':
        return 'bg-transparent text-mutedText hover:text-white hover:bg-slate-800/40';
      default:
        return 'bg-primaryBlue text-white';
    }
  };

  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-sans text-sm tracking-wide overflow-hidden group select-none";

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03 }}
      className="inline-block"
    >
      <div className={`${baseStyles} ${getVariantStyles()} ${className}`}>
        {/* Cinematic light sweep across the button */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} aria-label={ariaLabel} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} role="button" aria-label={ariaLabel} className="inline-block cursor-pointer">
      {content}
    </div>
  );
};
