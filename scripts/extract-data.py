#!/usr/bin/env python3
"""
Data Extraction Script for Year in Review Presentation
Extracts and processes Brilliant.org user data for 2025
"""

import json
import os
from datetime import datetime
from collections import defaultdict
from pathlib import Path

# Base directory containing analytics and production folders
BASE_DIR = Path(__file__).parent.parent.parent
ANALYTICS_DIR = BASE_DIR / "analytics"
PRODUCTION_DIR = BASE_DIR / "production"
OUTPUT_DIR = BASE_DIR / "year-in-review" / "src" / "data"

def parse_ndjson(file_path):
    """Parse newline-delimited JSON file"""
    data = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line:
                    try:
                        data.append(json.loads(line))
                    except json.JSONDecodeError:
                        continue
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    return data

def is_2025_date(date_str):
    """Check if date string is in 2025"""
    if not date_str:
        return False
    try:
        # Handle various date formats
        if 'T' in date_str:
            dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        else:
            dt = datetime.strptime(date_str, '%Y-%m-%d')
        return dt.year == 2025
    except:
        return False

def extract_lessons():
    """Extract lesson completion data"""
    lessons = []
    file_path = PRODUCTION_DIR / "courses_lessonuserstate.json"
    
    if not file_path.exists():
        return lessons
    
    data = parse_ndjson(file_path)
    for item in data:
        completed_ts = item.get('completed_ts')
        if completed_ts and is_2025_date(completed_ts):
            lessons.append({
                'id': item.get('id'),
                'lesson_info_id': item.get('lesson_info_id'),
                'completed_ts': completed_ts,
                'started_ts': item.get('started_ts'),
                'blocks_completed': item.get('blocks_completed', 0),
                'blocks_total': item.get('blocks_total', 0),
            })
    
    return lessons

def extract_problems():
    """Extract problem interaction data"""
    problems = []
    file_path = PRODUCTION_DIR / "stats_userprobleminteraction.json"
    
    if not file_path.exists():
        return problems
    
    data = parse_ndjson(file_path)
    for item in data:
        ts = item.get('ts')
        if ts and is_2025_date(ts):
            # action: 1 = start, 2 = complete
            problems.append({
                'id': item.get('id'),
                'problem_id': item.get('problem_id'),
                'category_id': item.get('category_id'),
                'action': item.get('action'),  # 1 = start, 2 = complete
                'problem_type': item.get('problem_type'),
                'ts': ts,
            })
    
    return problems

def extract_practice_sets():
    """Extract practice set completion data"""
    practice_sets = []
    file_path = PRODUCTION_DIR / "practice_practiceuserstate.json"
    
    if not file_path.exists():
        return practice_sets
    
    data = parse_ndjson(file_path)
    for item in data:
        completed_ts = item.get('completed_ts')
        if completed_ts and is_2025_date(completed_ts):
            progress_data = item.get('progress_data', {})
            problems = progress_data.get('problems', [])
            correct = sum(1 for p in problems if p.get('state') == 'correct')
            total = len(problems)
            
            practice_sets.append({
                'id': item.get('id'),
                'practice_set_id': item.get('practice_set_id'),
                'completed_ts': completed_ts,
                'started_ts': item.get('started_ts'),
                'best_score': item.get('best_score'),
                'problems_completed': item.get('problems_completed', 0),
                'problems_total': item.get('problems_total', 0),
                'correct': correct,
                'total': total,
            })
    
    return practice_sets

def extract_streaks():
    """Extract streak data"""
    streaks = []
    file_path = PRODUCTION_DIR / "profile_streakrecord.json"
    
    if not file_path.exists():
        return streaks
    
    data = parse_ndjson(file_path)
    for item in data:
        start_date = item.get('start_date')
        end_date = item.get('end_date')
        
        # Check if streak overlaps with 2025
        if start_date and is_2025_date(start_date):
            streaks.append({
                'id': item.get('id'),
                'start_date': start_date,
                'end_date': end_date,
            })
        elif end_date and is_2025_date(end_date):
            streaks.append({
                'id': item.get('id'),
                'start_date': start_date,
                'end_date': end_date,
            })
    
    return streaks

def extract_courses():
    """Extract course progress data"""
    courses = []
    file_path = PRODUCTION_DIR / "courses_courseuserstate.json"
    
    if not file_path.exists():
        return courses
    
    data = parse_ndjson(file_path)
    for item in data:
        last_active_ts = item.get('last_active_ts')
        started_ts = item.get('started_ts')
        
        # Include if active in 2025
        if (last_active_ts and is_2025_date(last_active_ts)) or \
           (started_ts and is_2025_date(started_ts)):
            
            course_progress = item.get('_course_progress') or {}
            if course_progress is None:
                course_progress = {}
            levels = course_progress.get('levels', []) if isinstance(course_progress, dict) else []
            
            # Count completed lessons
            completed_lessons = 0
            total_lessons = 0
            for level in levels:
                progress_nodes = level.get('progress_nodes', [])
                for node in progress_nodes:
                    lesson = node.get('lesson', {})
                    if lesson:
                        total_lessons += 1
                        if lesson.get('completed_ts'):
                            completed_lessons += 1
            
            courses.append({
                'id': item.get('id'),
                'course_info_id': item.get('course_info_id'),
                'percent_complete': item.get('percent_complete', 0),
                'started_ts': started_ts,
                'last_active_ts': last_active_ts,
                'completed_lessons': completed_lessons,
                'total_lessons': total_lessons,
            })
    
    return courses

def extract_student_actions():
    """Extract student action events"""
    actions = []
    file_path = ANALYTICS_DIR / "stg_events__student_action.json"
    
    if not file_path.exists():
        return actions
    
    data = parse_ndjson(file_path)
    for item in data:
        created_at = item.get('created_at')
        if created_at and is_2025_date(created_at):
            actions.append({
                'action': item.get('action'),
                'course_id': item.get('course_id'),
                'lesson_id': item.get('lesson_id'),
                'answer_is_correct': item.get('answer_is_correct'),
                'created_at': created_at,
            })
    
    return actions

def calculate_statistics(lessons, problems, practice_sets, streaks, courses, actions):
    """Calculate summary statistics"""
    stats = {
        'total_lessons_completed': len([l for l in lessons if l.get('completed_ts')]),
        'total_problems_attempted': len([p for p in problems if p.get('action') == 1]),
        'total_problems_completed': len([p for p in problems if p.get('action') == 2]),
        'total_practice_sets': len(practice_sets),
        'total_courses_active': len(courses),
    }
    
    # Calculate accuracy from practice sets
    total_correct = sum(ps.get('correct', 0) for ps in practice_sets)
    total_problems = sum(ps.get('total', 0) for ps in practice_sets)
    stats['accuracy_percentage'] = round((total_correct / total_problems * 100) if total_problems > 0 else 0, 1)
    
    # Calculate streaks
    if streaks:
        streak_lengths = []
        for streak in streaks:
            if streak.get('start_date') and streak.get('end_date'):
                try:
                    start = datetime.strptime(streak['start_date'], '%Y-%m-%d')
                    end = datetime.strptime(streak['end_date'], '%Y-%m-%d')
                    length = (end - start).days + 1
                    streak_lengths.append(length)
                except:
                    pass
        stats['longest_streak'] = max(streak_lengths) if streak_lengths else 0
        stats['total_streaks'] = len(streaks)
    else:
        stats['longest_streak'] = 0
        stats['total_streaks'] = 0
    
    # Daily activity
    daily_activity = defaultdict(int)
    for lesson in lessons:
        if lesson.get('completed_ts'):
            date = lesson['completed_ts'][:10]  # Extract YYYY-MM-DD
            daily_activity[date] += 1
    
    for ps in practice_sets:
        if ps.get('completed_ts'):
            date = ps['completed_ts'][:10]
            daily_activity[date] += 1
    
    stats['daily_activity'] = dict(sorted(daily_activity.items()))
    stats['active_days'] = len(daily_activity)
    
    # Monthly breakdown
    monthly_activity = defaultdict(int)
    for date_str in daily_activity.keys():
        month = date_str[:7]  # YYYY-MM
        monthly_activity[month] += daily_activity[date_str]
    
    stats['monthly_activity'] = dict(sorted(monthly_activity.items()))
    
    return stats

def generate_processed_data():
    """Main function to extract and process all data"""
    print("Starting data extraction...")
    
    # Extract data
    print("Extracting lessons...")
    lessons = extract_lessons()
    print(f"Found {len(lessons)} lessons")
    
    print("Extracting problems...")
    problems = extract_problems()
    print(f"Found {len(problems)} problem interactions")
    
    print("Extracting practice sets...")
    practice_sets = extract_practice_sets()
    print(f"Found {len(practice_sets)} practice sets")
    
    print("Extracting streaks...")
    streaks = extract_streaks()
    print(f"Found {len(streaks)} streaks")
    
    print("Extracting courses...")
    courses = extract_courses()
    print(f"Found {len(courses)} active courses")
    
    print("Extracting student actions...")
    actions = extract_student_actions()
    print(f"Found {len(actions)} student actions")
    
    # Calculate statistics
    print("Calculating statistics...")
    statistics = calculate_statistics(lessons, problems, practice_sets, streaks, courses, actions)
    
    # Prepare output
    processed_data = {
        'year': 2025,
        'summary': statistics,
        'lessons': lessons,
        'problems': problems[:1000],  # Limit for performance
        'practice_sets': practice_sets,
        'streaks': streaks,
        'courses': courses,
        'generated_at': datetime.now().isoformat(),
    }
    
    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Write output
    output_path = OUTPUT_DIR / "processed-data.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(processed_data, f, indent=2, ensure_ascii=False)
    
    print(f"\nData extraction complete!")
    print(f"Output written to: {output_path}")
    print(f"\nSummary:")
    print(f"  Lessons completed: {statistics['total_lessons_completed']}")
    print(f"  Problems completed: {statistics['total_problems_completed']}")
    print(f"  Practice sets: {statistics['total_practice_sets']}")
    print(f"  Active courses: {statistics['total_courses_active']}")
    print(f"  Longest streak: {statistics['longest_streak']} days")
    print(f"  Active days: {statistics['active_days']}")
    print(f"  Accuracy: {statistics['accuracy_percentage']}%")

if __name__ == "__main__":
    generate_processed_data()

