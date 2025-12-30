export interface ProcessedData {
  year: number;
  summary: SummaryStats;
  lessons: Lesson[];
  problems: Problem[];
  practice_sets: PracticeSet[];
  streaks: Streak[];
  courses: Course[];
  generated_at: string;
}

export interface SummaryStats {
  total_lessons_completed: number;
  total_problems_attempted: number;
  total_problems_completed: number;
  total_practice_sets: number;
  total_courses_active: number;
  accuracy_percentage: number;
  longest_streak: number;
  total_streaks: number;
  daily_activity: Record<string, number>;
  monthly_activity: Record<string, number>;
  active_days: number;
}

export interface Lesson {
  id: number;
  lesson_info_id: number;
  completed_ts: string;
  started_ts?: string;
  blocks_completed: number;
  blocks_total: number;
}

export interface Problem {
  id: number;
  problem_id: number;
  category_id: number;
  action: number;
  problem_type: number;
  ts: string;
}

export interface PracticeSet {
  id: number;
  practice_set_id: number;
  completed_ts: string;
  started_ts?: string;
  best_score: number | null;
  problems_completed: number;
  problems_total: number;
  correct: number;
  total: number;
}

export interface Streak {
  id: number;
  start_date: string;
  end_date: string;
}

export interface Course {
  id: number;
  course_info_id: number;
  percent_complete: number;
  started_ts?: string;
  last_active_ts?: string;
  completed_lessons: number;
  total_lessons: number;
}


