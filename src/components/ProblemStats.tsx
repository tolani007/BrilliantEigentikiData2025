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
    <div ref={ref} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl transition-all border border-white/20 dark:border-gray-700/50">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Problem Solving Stats</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-gradient-to-br from-brilliant-blue to-brilliant-darkBlue rounded-xl p-6 text-white"
        >
          <div className="text-sm font-medium mb-2">Problems Attempted</div>
          <div className="text-4xl font-bold">{totalAttempted}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.05, ease: 'easeOut' }}
          className="bg-gradient-to-br from-duolingo-green to-duolingo-darkGreen rounded-xl p-6 text-white"
        >
          <div className="text-sm font-medium mb-2">Problems Completed</div>
          <div className="text-4xl font-bold">{totalCompleted}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          className="bg-gradient-to-br from-accent-orange to-orange-600 rounded-xl p-6 text-white"
        >
          <div className="text-sm font-medium mb-2">Accuracy</div>
          <div className="text-4xl font-bold">{accuracy}%</div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
        >
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Monthly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
              <XAxis dataKey="month" stroke="#6b7280" className="dark:stroke-gray-400" />
              <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
              <Tooltip />
              <Bar dataKey="problems" fill="#4A90E2" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
        >
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Accuracy Breakdown</h3>
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
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default ProblemStats;

