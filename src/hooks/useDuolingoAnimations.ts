import { SpringConfig } from 'framer-motion';

// Duolingo-style spring animation configurations
export const duolingoSpring: SpringConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

export const duolingoBounce: SpringConfig = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
  mass: 0.7,
};

export const duolingoSmooth: SpringConfig = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
  mass: 1,
};

// Duolingo-style hover animations
export const duolingoHover = {
  scale: 1.05,
  y: -2,
  transition: duolingoSpring,
};

export const duolingoTap = {
  scale: 0.95,
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 20,
  },
};

// Duolingo-style entrance animations
export const duolingoFadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: duolingoSmooth,
};

export const duolingoScaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: duolingoBounce,
};

export const duolingoSlideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: duolingoSpring,
};

// Celebration animation (Duolingo-style)
export const duolingoCelebration = {
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 5, -5, 0],
  },
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
    duration: 0.6,
  },
};

