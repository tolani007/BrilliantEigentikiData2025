# Changelog

All notable changes to this project will be documented in this file.

## [Latest] - 2025-01-XX

### Fixed
- **Text contrast in light mode**: Fixed all text visibility issues
  - "Explore Your Stats" button text now explicitly uses `text-gray-900` for maximum contrast
  - All StatCard text updated from gray-700/800 to gray-900
  - CourseCard text enhanced (gray-800/700 → gray-900)
  - Timeline text improved (gray-700/800 → gray-900)
  - ProgressBar label text contrast fixed
  - Closing section cards maintain white text on semi-transparent backgrounds
- **Contrast rules applied**:
  - Dark text (gray-900/black) on light backgrounds
  - White text on dark/colored backgrounds
  - Proper dark mode support maintained

### Added
- **Duolingo-style animations**: Implemented bouncy spring animations throughout the site
  - Spring-based transitions with optimized stiffness and damping
  - Playful hover and tap animations
  - Celebration animations for achievements
- **Sound effects**: Added Web Audio API-based sound system
  - Click sounds for button interactions
  - Success sounds for achievements and completions
  - Hover sounds for interactive elements
  - Card flip sounds for visual feedback
- **Enhanced button visibility**: Improved "Explore Your Stats" button with solid white background and dark text
- **Animation hooks**: Created `useDuolingoAnimations.ts` with reusable Duolingo-style animation configurations

### Changed
- **Button design**: "Explore Your Stats" button now has:
  - Solid white background (`bg-white`) instead of transparent
  - Dark text (`text-gray-900`) for maximum contrast
  - Bold font weight for better visibility
  - Duolingo-style spring animations
- **Text visibility improvements**:
  - Fixed loading screen text opacity
  - Improved closing section text contrast
  - Enhanced all button text visibility
- **Animation system**: Replaced standard easing with Duolingo-style spring animations
  - `duolingoSpring`: Standard spring (stiffness: 300, damping: 20)
  - `duolingoBounce`: Bouncy spring (stiffness: 400, damping: 15)
  - `duolingoSmooth`: Smooth spring (stiffness: 200, damping: 25)

### Technical
- Created `src/utils/sounds.ts` for sound effect management
- Created `src/hooks/useDuolingoAnimations.ts` for animation configurations
- Integrated sound effects into all interactive components
- Applied Duolingo-style animations to StatCard, CourseCard, Timeline, and ProblemStats

## Previous Updates - 2025-01-XX

### Added
- **Scroll-triggered animations**: Added smooth scroll animations to all sections using `SectionWrapper` and `SectionTitle` components
- **Enhanced text contrast**: Improved text visibility across all components by updating color classes from gray-600/500 to gray-800/900
- **Optimized animation performance**: Reduced animation durations and optimized easing functions for faster, smoother animations
- **Liquid glass effects**: Enhanced glassmorphism with shimmer effects on hover
- **Improved loading states**: Better loading screen with animated spinner

### Changed
- **Animation speeds**: Reduced animation durations from 0.4-0.6s to 0.25-0.35s for snappier feel
- **Easing functions**: Updated to faster cubic-bezier curves `[0.25, 0.1, 0.25, 1]` for smoother animations
- **Text contrast**: 
  - Headings: Changed from `text-gray-800` to `text-gray-900` for better visibility
  - Body text: Changed from `text-gray-600/500` to `text-gray-800/700` for better readability
  - Dark mode: Improved contrast with `text-gray-200/300` instead of `text-gray-400`
- **Scroll animations**: Optimized scroll-triggered animations with better performance using `will-change` properties

### Performance
- Reduced animation steps in counting animations (30 → 25)
- Faster animation durations across all components
- Optimized scroll detection margins (-50px → -100px)
- Added `will-change` properties for better GPU acceleration

### Fixed
- Text visibility issues on light backgrounds
- Animation performance on low-end devices
- Scroll animation timing and smoothness

## Previous Updates

### UI Enhancements
- Added liquid glass shimmer effects
- Enhanced hover interactions on all data visualizations
- Improved touch feedback
- Added 3D Brilliant logo with heartbeat effect

### Deployment
- Fixed Vercel deployment configuration
- Added deployment documentation
- Updated README with live deployment URL

