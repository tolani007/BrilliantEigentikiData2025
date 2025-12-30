import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { duolingoHover, duolingoTap } from '../hooks/useDuolingoAnimations';
import { playClickSound } from '../utils/sounds';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={() => {
        playClickSound();
        toggleTheme();
      }}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-yellow-50/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg hover:shadow-xl transition-all border border-amber-200/50 dark:border-gray-800/50"
      whileHover={duolingoHover}
      whileTap={duolingoTap}
      onHoverStart={() => playClickSound()}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-gray-900 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </motion.button>
  );
};

export default ThemeToggle;

