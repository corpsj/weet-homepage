'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { pageTransition } from '@/lib/animations'

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
