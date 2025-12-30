import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import BrilliantLogo from './BrilliantLogo';
import { getParticleCount, shouldReduceAnimations } from '../utils/performance';
import { duolingoBounce, duolingoHover, duolingoTap } from '../hooks/useDuolingoAnimations';
import { playClickSound } from '../utils/sounds';

const Hero: React.FC = () => {
  const particleCount = useMemo(() => getParticleCount(8), []);
  const reduceMotion = shouldReduceAnimations();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, rgba(52, 211, 153, 1) 0%, rgba(34, 197, 94, 1) 35%, rgba(16, 185, 129, 1) 70%, rgba(5, 150, 105, 1) 100%)'
    }}>
      {/* Animated background elements - optimized for smooth performance */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/20 rounded-full backdrop-blur-sm"
            style={{
              left: `${(i * 12.5) % 100}%`,
              top: `${(i * 15) % 100}%`,
            }}
            animate={reduceMotion ? {} : {
              y: [0, -30, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={reduceMotion ? {} : {
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Brilliant Logo with 3D effect */}
        <BrilliantLogo />
        
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0.1 } : { duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-4"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? { duration: 0.1 } : { delay: 0.15, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            2025
          </motion.h1>
        </motion.div>

        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0.1 } : { delay: 0.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-2">
            Year in Review
          </h2>
        </motion.div>

        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduceMotion ? { duration: 0.1 } : { delay: 0.45, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-xl md:text-2xl text-white font-medium mb-8 drop-shadow-lg">
            Your Brilliant Learning Journey
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0.1 } : { delay: 0.6, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="flex justify-center"
        >
          <motion.button
            className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg shadow-2xl border-2 border-white/50 hover:bg-gray-50 transition-all relative overflow-hidden group"
            whileHover={duolingoHover}
            whileTap={duolingoTap}
            onHoverStart={() => playClickSound()}
            onClick={() => {
              playClickSound();
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }}
            animate={{
              boxShadow: [
                '0 10px 30px rgba(0, 0, 0, 0.2)',
                '0 15px 35px rgba(0, 0, 0, 0.25)',
                '0 10px 30px rgba(0, 0, 0, 0.2)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="relative z-10 drop-shadow-sm font-extrabold text-gray-900">Explore Your Stats</span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={reduceMotion ? {} : { y: [0, 10, 0] }}
        transition={reduceMotion ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default Hero;

