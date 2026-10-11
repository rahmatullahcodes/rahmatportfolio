import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for outer ring trail
  const springConfig = { damping: 26, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if touch device - if so, don't show custom cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable or interactive element
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

    const handleMouseDown = () => setIsClicking(true);
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
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Smooth Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-sky-400/60 pointer-events-none backdrop-blur-[1px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          backgroundColor: isPointer ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.04)',
          borderColor: isPointer ? '#38BDF8' : 'rgba(56, 189, 248, 0.45)',
          boxShadow: isPointer ? '0 0 20px rgba(56, 189, 248, 0.35)' : 'none',
        }}
        animate={{
          scale: isClicking ? 0.8 : isPointer ? 1.15 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 400,
        }}
      />

      {/* Inner Pinpoint Glow Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-sky-400 pointer-events-none shadow-glow-sm"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 6 : 5,
          height: isPointer ? 6 : 5,
        }}
        animate={{
          scale: isClicking ? 1.4 : isPointer ? 1.2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.1,
        }}
      />
    </div>
  );
}
