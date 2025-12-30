import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Course } from '../types';

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
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-white/20 dark:border-gray-700/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Course #{course.course_info_id}
        </h3>
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold`}>
          {course.percent_complete}%
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Progress</span>
          <span>{course.completed_lessons} / {course.total_lessons} lessons</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className={`h-full ${color} rounded-full`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${course.percent_complete}%` } : {}}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.05, ease: 'easeOut' }}
          />
        </div>
      </div>

      {course.last_active_ts && (
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Last active: {new Date(course.last_active_ts).toLocaleDateString()}
        </p>
      )}
    </motion.div>
  );
};

export default CourseCard;

