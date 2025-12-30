# Changelog

All notable changes to this project will be documented in this file.

## [Latest] - 2025-01-XX

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

