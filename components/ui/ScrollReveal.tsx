'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, fadeIn, slideInLeft, slideInRight } from '@/lib/animations'
import type { Variants } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

const variantMap: Record<NonNullable<ScrollRevealProps['direction']>, Variants> = {
  up: fadeUp,
  down: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  left: slideInLeft,
  right: slideInRight,
  none: fadeIn,
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  once = true,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? fadeIn : variantMap[direction]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      custom={delay}
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </motion.div>
  )
}
