import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
  delay?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  percentage,
  color = 'brilliant-blue',
  delay = 0,
}) => {
  const colorClasses: Record<string, string> = {
    'brilliant-blue': 'bg-brilliant-blue',
    'duolingo-green': 'bg-duolingo-green',
    'orange': 'bg-accent-orange',
    'purple': 'bg-accent-purple',
    'pink': 'bg-accent-pink',
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-600 font-semibold">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          className={`h-full ${colorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

