import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'

interface FadeSwapProps {
  id: string
  children: ReactNode
  className?: string
}

export function FadeSwap({ id, children, className }: FadeSwapProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        className={className}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
