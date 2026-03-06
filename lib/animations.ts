/**
 * Framer Motion Animation Variants
 * Shared animation presets for consistent motion across the site
 */

import { motion as motionConfig } from './design-tokens';

// Fade animations
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionConfig.duration.normal },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionConfig.duration.normal },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: motionConfig.duration.normal },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: motionConfig.duration.normal },
  },
};

// Scale animation
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionConfig.duration.normal },
  },
};

// Stagger animations for lists
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionConfig.duration.fast },
  },
};

// Scroll reveal animation
export const scrollReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionConfig.duration.reveal,
      ease: motionConfig.ease.smooth,
    },
  },
};
