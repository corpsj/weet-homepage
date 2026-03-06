/**
 * Design System Tokens for weet:) Homepage
 * Centralized design values for colors, typography, spacing, and animations
 */

// Colors
export const colors = {
  primary: '#FEBD16',      // weet yellow
  primaryDark: '#E5A410',
  black: '#000000',
  white: '#FFFFFF',
  bg: {
    main: '#FFFFFF',
    section: '#F9FAFB',
    dark: '#111827',
  },
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
  },
  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
  },
} as const;

// Typography
export const typography = {
  hero: {
    size: 'clamp(2.5rem, 5vw, 4.5rem)',
    weight: 700,
    lineHeight: 1.1,
  },
  h1: {
    size: 'clamp(2rem, 4vw, 3.5rem)',
    weight: 700,
    lineHeight: 1.2,
  },
  h2: {
    size: 'clamp(1.5rem, 3vw, 2.5rem)',
    weight: 700,
    lineHeight: 1.3,
  },
  h3: {
    size: 'clamp(1.25rem, 2vw, 1.75rem)',
    weight: 600,
    lineHeight: 1.4,
  },
  body: {
    size: '1rem',
    weight: 400,
    lineHeight: 1.6,
  },
  caption: {
    size: '0.875rem',
    weight: 400,
    lineHeight: 1.5,
  },
  small: {
    size: '0.75rem',
    weight: 400,
    lineHeight: 1.5,
  },
} as const;

// Spacing (section padding)
export const spacing = {
  section: {
    mobile: '3rem',
    tablet: '5rem',
    desktop: '7rem',
  },
  container: {
    maxWidth: '1440px',
    padding: {
      mobile: '1rem',
      tablet: '2rem',
      desktop: '4rem',
    },
  },
} as const;

// Breakpoints
export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

// Animation config (durations in seconds, for framer-motion)
export const motion = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    reveal: 0.8,
  },
  ease: {
    default: [0.25, 0.1, 0.25, 1],
    smooth: [0.45, 0, 0.55, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
} as const;

// Z-indices
export const zIndex = {
  header: 100,
  mobileMenu: 200,
  modal: 300,
  floatingCTA: 400,
  chatbot: 500,
  skipNav: 9999,
} as const;
