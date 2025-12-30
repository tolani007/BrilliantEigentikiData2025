import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { ProcessedData } from './types';
import processedDataJson from './data/processed-data.json';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { PerformanceWrapper } from './components/PerformanceWrapper';
import { SectionWrapper, SectionTitle } from './components/ScrollSection';

// Lazy load components for better performance
const Hero = lazy(() => import('./components/Hero'));
const StatCard = lazy(() => import('./components/StatCard'));
const Timeline = lazy(() => import('./components/Timeline'));
const StreakDisplay = lazy(() => import('./components/StreakDisplay'));
const CourseCard = lazy(() => import('./components/CourseCard'));
const ProblemStats = lazy(() => import('./components/ProblemStats'));

const App: React.FC = () => {
  const [data, setData] = useState<ProcessedData | null>(null);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();
  
  // Enable smooth scrolling optimizations
  useSmoothScroll();

  useEffect(() => {
    // Load processed data with timeout fallback
    const loadData = async () => {
      try {
        // Simulate a small delay to ensure proper initialization
        await new Promise(resolve => setTimeout(resolve, 100));
        setData(processedDataJson as ProcessedData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    // Timeout after 5 seconds if data doesn't load
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn('Data loading timeout, attempting to continue...');
        try {
          setData(processedDataJson as ProcessedData);
        } catch (e) {
          console.error('Failed to load data:', e);
        }
        setLoading(false);
      }
    }, 5000);

    loadData();
    
    return () => clearTimeout(timeout);
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" style={{
        background: 'linear-gradient(135deg, rgba(52, 211, 153, 1) 0%, rgba(34, 197, 94, 1) 35%, rgba(16, 185, 129, 1) 70%, rgba(5, 150, 105, 1) 100%)'
      }}>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-white/60 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        <div className="text-white text-2xl font-semibold mt-4">Loading your year in review...</div>
        <div className="text-white text-sm mt-2 opacity-90">This may take a moment</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" style={{
        background: 'linear-gradient(135deg, rgba(52, 211, 153, 1) 0%, rgba(34, 197, 94, 1) 35%, rgba(16, 185, 129, 1) 70%, rgba(5, 150, 105, 1) 100%)'
      }}>
        <div className="text-white text-2xl font-semibold">No data available</div>
      </div>
    );
  }

  const { summary, streaks, courses } = data;

  return (
    <PerformanceWrapper>
      <div className={`min-h-screen transition-colors ${isDark ? 'dark' : ''}`}>
        <ThemeToggle />
      {/* Hero Section */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
        <Hero />
      </Suspense>

      {/* Overview Stats Section */}
      <SectionWrapper>
        <section className="py-20 px-4 bg-gradient-to-b from-green-50/50 via-white/30 to-white/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm transition-all">
          <div className="max-w-7xl mx-auto">
            <SectionTitle>
              Your 2025 Learning Summary
            </SectionTitle>
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          }>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Lessons Completed"
                value={summary.total_lessons_completed}
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
                color="brilliant-blue"
                delay={0}
              />
              <StatCard
                title="Problems Solved"
                value={summary.total_problems_completed}
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                color="duolingo-green"
                delay={0.1}
              />
              <StatCard
                title="Practice Sets"
                value={summary.total_practice_sets}
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
                color="orange"
                delay={0.2}
              />
              <StatCard
                title="Accuracy"
                value={summary.accuracy_percentage}
                suffix="%"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                }
                color="purple"
                delay={0.3}
              />
            </div>
          </Suspense>
          </div>
        </section>
      </SectionWrapper>

      {/* Timeline Section */}
      <SectionWrapper>
        <section className="py-20 px-4 bg-gradient-to-b from-white/50 via-green-50/30 to-white/50 dark:from-gray-800/50 dark:via-gray-900/30 dark:to-gray-800/50 backdrop-blur-sm transition-all">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>}>
              <Timeline
                dailyActivity={summary.daily_activity}
                monthlyActivity={summary.monthly_activity}
              />
            </Suspense>
          </div>
        </section>
      </SectionWrapper>

      {/* Problem Stats Section */}
      <SectionWrapper>
        <section className="py-20 px-4 bg-gradient-to-b from-green-50/50 via-white/30 to-white/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm transition-all">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>}>
              <ProblemStats
                totalAttempted={summary.total_problems_attempted}
                totalCompleted={summary.total_problems_completed}
                accuracy={summary.accuracy_percentage}
                monthlyActivity={summary.monthly_activity}
              />
            </Suspense>
          </div>
        </section>
      </SectionWrapper>

      {/* Streaks Section */}
      <SectionWrapper>
        <section className="py-20 px-4 bg-gradient-to-b from-white/50 via-green-50/30 to-white/50 dark:from-gray-800/50 dark:via-gray-900/30 dark:to-gray-800/50 backdrop-blur-sm transition-all">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>}>
              <StreakDisplay
                longestStreak={summary.longest_streak}
                totalStreaks={summary.total_streaks}
                streaks={streaks}
              />
            </Suspense>
          </div>
        </section>
      </SectionWrapper>

      {/* Courses Section */}
      <SectionWrapper>
        <section className="py-20 px-4 bg-gradient-to-b from-green-50/50 via-white/30 to-white/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm transition-all">
          <div className="max-w-7xl mx-auto">
            <SectionTitle>
              Your Active Courses
            </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Suspense key={course.id} fallback={<div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>}>
                <CourseCard course={course} index={index} />
              </Suspense>
            ))}
          </div>
        </div>
      </section>
      </SectionWrapper>

      {/* Closing Section */}
      <SectionWrapper>
        <section className="py-20 px-4 text-white transition-all" style={{
          background: 'linear-gradient(135deg, rgba(52, 211, 153, 1) 0%, rgba(34, 197, 94, 1) 35%, rgba(16, 185, 129, 1) 70%, rgba(5, 150, 105, 1) 100%)'
        }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Keep Learning!</h2>
          <p className="text-xl mb-8 text-white font-medium">
            You've made incredible progress this year. Keep up the amazing work and continue your learning journey!
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-white/90 dark:bg-white/20 rounded-lg p-4 backdrop-blur-md border border-white/50 dark:border-white/30 shadow-lg">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{summary.active_days}</div>
              <div className="text-sm text-gray-900 dark:text-white font-semibold">Active Days</div>
            </div>
            <div className="bg-white/90 dark:bg-white/20 rounded-lg p-4 backdrop-blur-md border border-white/50 dark:border-white/30 shadow-lg">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{summary.total_courses_active}</div>
              <div className="text-sm text-gray-900 dark:text-white font-semibold">Active Courses</div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </PerformanceWrapper>
  );
};

export default App;

