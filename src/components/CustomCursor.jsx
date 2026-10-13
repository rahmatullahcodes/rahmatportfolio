import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [ripple, setRipple] = useState(null);

  // Precision mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Buttery-smooth spring motion for the ambient light aura
  const auraX = useSpring(mouseX, { damping: 28, stiffness: 380, mass: 0.4 });
  const auraY = useSpring(mouseY, { damping: 28, stiffness: 380, mass: 0.4 });

  useEffect(() => {
    // Disable on touch devices for native performance
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('.card-interactive') ||
        target.closest('.shine-button')
      );

      setIsPointer(isInteractive);
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      // Trigger subtle light ripple on click
      setRipple({
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      });
      setTimeout(() => setRipple(null), 500);
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* 1. Fluid Ambient Neon Light Halo (No clumsy hollow ring, just soft radiant light) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 64 : 36,
          height: isPointer ? 64 : 36,
          background: isPointer
            ? 'radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(96, 165, 250, 0.08) 50%, transparent 70%)',
          filter: 'blur(4px)',
        }}
        animate={{
          scale: isClicking ? 0.75 : isPointer ? 1.3 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 400,
        }}
      />

      {/* 2. Micro Glowing Precision Spark (Tiny, crisp, and non-intrusive) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 7 : 5,
          height: isPointer ? 7 : 5,
          backgroundColor: isPointer ? '#2563EB' : '#60A5FA',
          boxShadow: isPointer
            ? '0 0 10px #2563EB, 0 0 20px rgba(37, 99, 235, 0.7)'
            : '0 0 8px rgba(37, 99, 235, 0.8), 0 0 14px rgba(96, 165, 250, 0.5)',
        }}
        animate={{
          scale: isClicking ? 1.5 : isPointer ? 1.25 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.12,
        }}
      />

      {/* 3. Subtle Click Ripple Wave */}
      {ripple && (
        <motion.div
          key={ripple.id}
          initial={{ opacity: 0.7, scale: 0.2 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed rounded-full pointer-events-none border border-electric-accent bg-electric-accent/15"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: 32,
            height: 32,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </div>
  );
}

