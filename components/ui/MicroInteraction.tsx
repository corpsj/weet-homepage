'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface MicroInteractionProps {
  children: React.ReactNode;
  hover?: 'scale' | 'lift' | 'glow' | 'tilt';
  click?: 'ripple' | 'pulse';
  className?: string;
}

export function MicroInteraction({ children, hover, click, className }: MicroInteractionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (hover !== 'tilt' || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (hover === 'tilt') {
      x.set(0);
      y.set(0);
    }
  };

  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (click === 'ripple' && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const xPos = e.clientX - rect.left;
      const yPos = e.clientY - rect.top;
      
      const newRipple = { id: Date.now(), x: xPos, y: yPos };
      setRipples((prev) => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }
  };

  const getHoverAnimation = () => {
    switch (hover) {
      case 'scale': return { scale: 1.02 };
      case 'lift': return { y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' };
      case 'glow': return { boxShadow: '0 0 15px rgba(254, 189, 22, 0.5)' };
      default: return {};
    }
  };

  const getTapAnimation = () => {
    switch (click) {
      case 'pulse': return { scale: 0.95 };
      default: return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative', 
        click === 'ripple' ? 'overflow-hidden' : '', 
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={getHoverAnimation()}
      whileTap={getTapAnimation()}
      style={hover === 'tilt' ? { rotateX, rotateY, transformPerspective: 1000 } : {}}
    >
      {children}
      
      {click === 'ripple' && ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute bg-current rounded-full pointer-events-none origin-center"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            opacity: 0.3,
          }}
        />
      ))}
    </motion.div>
  );
}
