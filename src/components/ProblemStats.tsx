import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ProblemStatsProps {
  totalAttempted: number;
  totalCompleted: number;
  accuracy: number;
  monthlyActivity?: Record<string, number>;
}

const ProblemStats: React.FC<ProblemStatsProps> = ({
  totalAttempted,
  totalCompleted,
  accuracy,
  monthlyActivity = {},
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Convert monthly activity to chart format
  const allMonths = [
    '2025-01', '2025-02', '2025-03', '2025-04',
    '2025-05', '2025-06', '2025-07', '2025-08',
    '2025-09', '2025-10', '2025-11', '2025-12',
  ];
  
  const monthlyData = allMonths.map((month) => {
    const monthName = new Date(month + '-01').toLocaleDateString('en-US', { month: 'short' });
    const count = monthlyActivity[month] || 0;
    return { month: monthName, problems: count };
  });

  const pieData = [
    { name: 'Correct', value: Math.round(totalCompleted * (accuracy / 100)) },
    { name: 'Incorrect', value: totalCompleted - Math.round(totalCompleted * (accuracy / 100)) },
  ];

  const COLORS = ['#58CC02', '#FF6B6B'];

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
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 relative z-10">Problem Solving Stats</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ scale: 1.05, y: -5, boxShadow: '0 20px 40px rgba(74, 144, 226, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-br from-brilliant-blue to-brilliant-darkBlue rounded-xl p-6 text-white cursor-pointer relative overflow-hidden group/card"
        >
          <div className="absolute inset-0 opacity-0 group-hover/card:opacity-20 transition-opacity duration-300 bg-white"></div>
          <div className="relative z-10">
            <div className="text-sm font-medium mb-2">Problems Attempted</div>
            <div className="text-4xl font-bold">{totalAttempted}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.05, ease: 'easeOut' }}
          whileHover={{ scale: 1.05, y: -5, boxShadow: '0 20px 40px rgba(88, 204, 2, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-br from-duolingo-green to-duolingo-darkGreen rounded-xl p-6 text-white cursor-pointer relative overflow-hidden group/card"
        >
          <div className="absolute inset-0 opacity-0 group-hover/card:opacity-20 transition-opacity duration-300 bg-white"></div>
          <div className="relative z-10">
            <div className="text-sm font-medium mb-2">Problems Completed</div>
            <div className="text-4xl font-bold">{totalCompleted}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          whileHover={{ scale: 1.05, y: -5, boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-br from-accent-orange to-orange-600 rounded-xl p-6 text-white cursor-pointer relative overflow-hidden group/card"
        >
          <div className="absolute inset-0 opacity-0 group-hover/card:opacity-20 transition-opacity duration-300 bg-white"></div>
          <div className="relative z-10">
            <div className="text-sm font-medium mb-2">Accuracy</div>
            <div className="text-4xl font-bold">{accuracy}%</div>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
          className="relative group/chart"
        >
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 relative z-10">Monthly Activity</h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                <XAxis dataKey="month" stroke="#6b7280" className="dark:stroke-gray-400" />
                <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="problems" 
                  fill="#4A90E2" 
                  radius={[8, 8, 0, 0]}
                  className="cursor-pointer transition-all hover:opacity-80"
                />
              </BarChart>
            </ResponsiveContainer>
            {/* Hover overlay effect */}
            <div className="absolute inset-0 opacity-0 group-hover/chart:opacity-10 transition-opacity duration-300 bg-gradient-to-t from-brilliant-blue/20 to-transparent pointer-events-none rounded-lg"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
          className="relative group/chart"
        >
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 relative z-10">Accuracy Breakdown</h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  className="cursor-pointer"
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="transition-all hover:opacity-80"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Hover overlay effect */}
            <div className="absolute inset-0 opacity-0 group-hover/chart:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-duolingo-green/20 to-transparent pointer-events-none rounded-lg"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProblemStats;

