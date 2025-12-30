import React, { useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

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
    <div ref={ref} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl transition-all border border-white/20 dark:border-gray-700/50">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Activity Timeline</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Monthly Overview</h3>
        <div className="grid grid-cols-12 gap-2">
          {monthlyArray.map((item, index) => {
            const monthName = new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' });
            const height = (item.count / maxCount) * 100;
            
            return (
              <motion.div
                key={item.month}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="flex flex-col items-center"
              >
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-b-lg overflow-hidden relative" style={{ height: '150px' }}>
                  <motion.div
                    className="w-full bg-gradient-to-b from-brilliant-blue to-brilliant-lightBlue rounded-b-lg absolute bottom-0"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${height}%` } : {}}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.03, ease: 'easeOut' }}
                  />
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium">{monthName}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 font-semibold">{item.count}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Activity Heatmap</h3>
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
                transition={{ duration: 0.2, delay: index * 0.005 }}
                className={`aspect-square ${activity.color} rounded relative group cursor-pointer`}
                title={`${dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}: ${count} ${count === 1 ? 'activity' : 'activities'} - ${activity.label}`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  {count > 0 && count}
                </div>
                {index < 7 && (
                  <div className="absolute -top-5 left-0 right-0 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {dayName}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
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
    </div>
  );
};

export default Timeline;

