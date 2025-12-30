import React from 'react';
import { motion } from 'framer-motion';

const BrilliantLogo: React.FC = () => {
  return (
    <motion.div
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
      {/* 3D Container */}
      <div
        className="relative inline-block"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateY(-8deg) rotateX(8deg)',
        }}
      >
        {/* Brilliant Logo SVG - Stylized B */}
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
          animate={{
            rotateY: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))',
            transform: 'translateZ(30px)',
          }}
        >
          {/* Background circle with gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <filter id="logoShadow">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.4"/>
            </filter>
          </defs>
          
          {/* Outer circle with 3D depth */}
          <circle
            cx="60"
            cy="60"
            r="58"
            fill="url(#logoGradient)"
            filter="url(#logoShadow)"
          />
          
          {/* Stylized B letter */}
          <path
            d="M 35 25 L 35 95 L 70 95 Q 85 95 85 80 L 85 70 Q 85 60 75 60 L 85 60 Q 95 60 95 50 L 95 40 Q 95 25 80 25 Z M 50 45 L 70 45 Q 75 45 75 50 L 75 55 Q 75 60 70 60 L 50 60 Z M 50 65 L 75 65 Q 80 65 80 70 L 80 75 Q 80 80 75 80 L 50 80 Z"
            fill="white"
          />
        </motion.svg>
        
        {/* 3D shine/highlight effect */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent rounded-full pointer-events-none"
          style={{
            transform: 'translateZ(40px)',
            mixBlendMode: 'overlay',
            borderRadius: '50%',
            width: '120px',
            height: '120px',
          }}
        />
        
        {/* Glow effect */}
        <div
          className="absolute inset-0 bg-green-400/20 rounded-full blur-xl pointer-events-none"
          style={{
            transform: 'translateZ(10px) scale(1.2)',
            width: '120px',
            height: '120px',
            top: '50%',
            left: '50%',
            marginTop: '-60px',
            marginLeft: '-60px',
          }}
        />
      </div>
    </motion.div>
  );
};

export default BrilliantLogo;

