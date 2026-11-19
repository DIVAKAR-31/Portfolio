import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

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
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primaryBlue to-sky-500 hover:from-blue-600 hover:to-cyan-400 text-white font-medium shadow-neon-blue border border-electricBlue/40';
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

  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-colors duration-300 font-sans text-sm tracking-wide overflow-hidden group select-none";

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
      className="inline-block"
    >
      <div className={`${baseStyles} ${getVariantStyles()} ${className}`}>
        {/* Subtle hover gleam effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
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

