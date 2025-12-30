import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BrilliantLogo: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate relative position from center of logo
        const relativeX = (e.clientX - centerX) / (rect.width / 2);
        const relativeY = (e.clientY - centerY) / (rect.height / 2);
        
        // Limit eye movement to stay within the eye area
        // Adjust maxDistance based on logo size (smaller = more subtle movement)
        const maxDistance = 0.12; // 12% of logo size for subtle tracking
        const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
        
        let eyeX = relativeX;
        let eyeY = relativeY;
        
        if (distance > maxDistance) {
          eyeX = (relativeX / distance) * maxDistance;
          eyeY = (relativeY / distance) * maxDistance;
        }
        
        // Convert to pixels (eye movement radius ~35px for 128px logo)
        const eyeRadius = 35;
        setEyePosition({
          x: eyeX * eyeRadius,
          y: eyeY * eyeRadius,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={logoRef}
      className="relative mb-8"
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Logo Container with Eye Tracking */}
      <div className="relative inline-block">
        <motion.img
          src="/brilliant-logo.png"
          alt="Brilliant Logo"
          className="w-32 h-32 md:w-40 md:h-40 relative z-10"
          style={{
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))',
            display: 'block',
          }}
          onError={(e) => {
            console.error('Failed to load logo image');
          }}
          animate={{
            rotateY: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Animated Eye - positioned over the eye in the logo */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: '#000',
            // Position at center of logo (adjust these percentages based on actual eye position in logo)
            // For a typical logo, eye is usually slightly above center
            left: '50%',
            top: '42%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
            boxShadow: '0 0 4px rgba(0,0,0,0.3)',
          }}
          animate={{
            x: eyePosition.x,
            y: eyePosition.y,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            mass: 0.4,
          }}
        />
      </div>
      
      {/* Glow effect */}
      <div
        className="absolute inset-0 bg-green-400/20 rounded-full blur-xl pointer-events-none"
        style={{
          width: '128px',
          height: '128px',
          top: '50%',
          left: '50%',
          marginTop: '-64px',
          marginLeft: '-64px',
          transform: 'translateZ(10px) scale(1.2)',
        }}
      />
    </motion.div>
  );
};

export default BrilliantLogo;
