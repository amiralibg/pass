import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface ScreenProps {
  children: ReactNode
  className?: string
  wide?: boolean
}

export function Screen({ children, className, wide }: ScreenProps) {
  return (
    <div className="relative min-h-dvh night-surface overflow-hidden">
      <div className="night-noise absolute inset-0" aria-hidden />
      <div
        className={cn(
          'relative z-10 mx-auto flex min-h-dvh w-full flex-col safe-pad',
          wide ? 'max-w-3xl' : 'max-w-lg',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
