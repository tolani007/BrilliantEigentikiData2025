import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StreakDisplayProps {
  longestStreak: number;
  totalStreaks: number;
  streaks: Array<{ start_date: string; end_date: string }>;
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({
  longestStreak,
  totalStreaks,
  streaks,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Calculate streak days for visualization
  const streakDays = streaks.map((streak) => {
    const start = new Date(streak.start_date);
    const end = new Date(streak.end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return { ...streak, days };
  });

  return (
    <div ref={ref} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl transition-all border border-white/20 dark:border-gray-700/50">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Learning Streaks</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-gradient-to-br from-duolingo-green to-duolingo-darkGreen rounded-xl p-6 text-white"
        >
          <div className="text-sm font-medium mb-2">Longest Streak</div>
          <div className="text-5xl font-bold">{longestStreak}</div>
          <div className="text-sm mt-2">days in a row</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          className="bg-gradient-to-br from-brilliant-blue to-brilliant-darkBlue rounded-xl p-6 text-white"
        >
          <div className="text-sm font-medium mb-2">Total Streaks</div>
          <div className="text-5xl font-bold">{totalStreaks}</div>
          <div className="text-sm mt-2">streak periods</div>
        </motion.div>
      </div>

      {/* Streak visualization */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Streak Timeline</h3>
        <div className="space-y-3">
          {streakDays.slice(0, 5).map((streak, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
              className="flex items-center"
            >
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-duolingo-green h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${Math.min((streak.days / longestStreak) * 100, 100)}%` } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.05, ease: 'easeOut' }}
                />
              </div>
              <span className="ml-4 text-sm text-gray-600 dark:text-gray-400 font-medium min-w-[100px]">
                {streak.days} days
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreakDisplay;

