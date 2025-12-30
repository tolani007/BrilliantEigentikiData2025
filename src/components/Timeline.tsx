import React, { useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { duolingoBounce, duolingoHover, duolingoTap } from '../hooks/useDuolingoAnimations';
import { playClickSound } from '../utils/sounds';

interface TimelineProps {
  dailyActivity: Record<string, number>;
  monthlyActivity: Record<string, number>;
}

const Timeline: React.FC<TimelineProps> = ({ dailyActivity, monthlyActivity }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isDark } = useTheme();

  // Memoize calculations for performance
  const { monthlyArray, maxCount, dailyArray, maxDailyCount } = useMemo(() => {
    const monthly = Object.entries(monthlyActivity)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));
    
    const maxMonthly = Math.max(...monthly.map(m => m.count), 1);
    
    const daily = Object.entries(dailyActivity)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(0, 35);
    
    const maxDaily = Math.max(...daily.map(([, count]) => count), 1);
    
    return {
      monthlyArray: monthly,
      maxCount: maxMonthly,
      dailyArray: daily,
      maxDailyCount: maxDaily,
    };
  }, [monthlyActivity, dailyActivity]);

  const getActivityLevel = (count: number) => {
    if (count === 0) return { label: 'No activity', color: 'bg-gray-200 dark:bg-gray-700' };
    if (count <= 2) return { label: 'Light activity', color: 'bg-green-200 dark:bg-green-800' };
    if (count <= 5) return { label: 'Moderate activity', color: 'bg-green-400 dark:bg-green-600' };
    if (count <= 10) return { label: 'High activity', color: 'bg-green-600 dark:bg-green-500' };
    return { label: 'Very high activity', color: 'bg-green-700 dark:bg-green-400' };
  };

  return (
    <motion.div 
      ref={ref} 
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl transition-all border border-white/30 dark:border-gray-700/50 relative overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Liquid glass shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 relative z-10">Activity Timeline</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4 relative z-10">Monthly Overview</h3>
        <div className="grid grid-cols-12 gap-2">
          {monthlyArray.map((item, index) => {
            const monthName = new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' });
            const height = (item.count / maxCount) * 100;
            
            return (
              <motion.div
                key={item.month}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.25, delay: index * 0.02, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col items-center"
              >
                  <motion.div 
                  className="w-full bg-gray-200 dark:bg-gray-700 rounded-b-lg overflow-hidden relative group/bar cursor-pointer" 
                  style={{ height: '150px' }}
                  whileHover={{ scale: 1.05, transition: duolingoBounce }}
                  onHoverStart={() => playClickSound()}
                >
                  <motion.div
                    className="w-full bg-gradient-to-b from-brilliant-blue to-brilliant-lightBlue rounded-b-lg absolute bottom-0 group-hover/bar:from-brilliant-lightBlue group-hover/bar:to-brilliant-blue transition-all duration-300"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${height}%` } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.02, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover/bar:opacity-30 transition-opacity duration-300 bg-gradient-to-t from-transparent via-white/50 to-transparent"></div>
                </motion.div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mt-2 font-semibold">{monthName}</div>
                <div className="text-xs text-gray-800 dark:text-gray-200 font-bold">{item.count}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4 relative z-10">Activity Heatmap</h3>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dailyArray.map(([date, count], index) => {
            const activity = getActivityLevel(count);
            const dateObj = new Date(date);
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            
            return (
              <motion.div
                key={date}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.15, delay: index * 0.003, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ 
                  scale: 1.15, 
                  zIndex: 10,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  transition: duolingoBounce
                }}
                whileTap={duolingoTap}
                onHoverStart={() => playClickSound()}
                className={`aspect-square ${activity.color} rounded relative group cursor-pointer transition-all border-2 border-transparent hover:border-white/50 dark:hover:border-gray-300/50`}
                title={`${dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}: ${count} ${count === 1 ? 'activity' : 'activities'} - ${activity.label}`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-0 group-hover:scale-110">
                  {count > 0 && count}
                </div>
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-30 transition-opacity duration-200 bg-white blur-sm"></div>
                {index < 7 && (
                  <div className="absolute -top-5 left-0 right-0 text-center text-xs text-gray-800 dark:text-gray-300 font-semibold">
                    {dayName}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-800 dark:text-gray-300 font-medium relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <span>No activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-200 dark:bg-green-800 rounded"></div>
              <span>Light (1-2)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 dark:bg-green-600 rounded"></div>
              <span>Moderate (3-5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 dark:bg-green-500 rounded"></div>
              <span>High (6-10)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-700 dark:bg-green-400 rounded"></div>
              <span>Very High (11+)</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;

