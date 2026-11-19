import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number;
  scaleHover?: number;
  onClick?: () => void;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  glowColor = 'rgba(56, 189, 248, 0.25)',
  maxTilt = 7,
  scaleHover = 1.02,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates relative to center of card (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse coordinates as percentages for radial gradient sheen (0 to 100)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  // Map mouse positions to 3D tilt angles
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width;
    const yPct = mouseY / rect.height;

    x.set(xPct - 0.5);
    y.set(yPct - 0.5);

    setGlarePos({
      x: Math.round(xPct * 100),
      y: Math.round(yPct * 100)
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        scale: isHovered ? scaleHover : 1,
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`relative perspective-1000 ${className}`}
    >
      {/* Specular glare reflection on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Dynamic radial glow behind card */}
      <div
        className="absolute -inset-1 rounded-[inherit] pointer-events-none transition-opacity duration-500 blur-lg -z-10"
        style={{
          background: glowColor,
          opacity: isHovered ? 0.75 : 0,
        }}
      />

      {/* Content wrapper with 3D preservation */}
      <div style={{ transform: 'translateZ(20px)' }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
};
