import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Course } from '../types';
import { duolingoBounce, duolingoHover, duolingoTap } from '../hooks/useDuolingoAnimations';
import { playClickSound } from '../utils/sounds';

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const colors = [
    'bg-brilliant-blue',
    'bg-duolingo-green',
    'bg-accent-orange',
    'bg-accent-purple',
    'bg-accent-pink',
  ];
  const color = colors[index % colors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...duolingoBounce, delay: index * 0.03 }}
      whileHover={duolingoHover}
      whileTap={duolingoTap}
      onHoverStart={() => playClickSound()}
      className="bg-yellow-50/95 dark:bg-gray-950/95 backdrop-blur-xl rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-amber-200/50 dark:border-gray-800/50 relative overflow-hidden group cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
      }}
    >
      {/* Liquid glass shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
          Course #{course.course_info_id}
        </h3>
        <motion.div 
          className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold shadow-lg`}
          whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {course.percent_complete}%
        </motion.div>
      </div>
      
      <div className="mb-4 relative z-10">
        <div className="flex justify-between text-sm text-gray-900 dark:text-gray-300 mb-2 font-semibold group-hover:text-black dark:group-hover:text-white transition-colors">
          <span>Progress</span>
          <span>{course.completed_lessons} / {course.total_lessons} lessons</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden relative">
          <motion.div
            className={`h-full ${color} rounded-full relative`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${course.percent_complete}%` } : {}}
            transition={{ duration: 0.5, delay: 0.08 + index * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </motion.div>
        </div>
      </div>

      {course.last_active_ts && (
        <p className="text-xs text-gray-900 dark:text-gray-300 font-medium group-hover:text-black dark:group-hover:text-gray-100 transition-colors relative z-10">
          Last active: {new Date(course.last_active_ts).toLocaleDateString()}
        </p>
      )}
    </motion.div>
  );
};

export default CourseCard;

