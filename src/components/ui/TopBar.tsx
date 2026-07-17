import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from '../../lib/cn'

interface TopBarProps {
  title?: string
  onBack?: () => void
  right?: ReactNode
  className?: string
}

export function TopBar({ title, onBack, right, className }: TopBarProps) {
  return (
    <header className={cn('mb-6 flex items-center gap-3', className)}>
      {onBack ? (
        <IconButton aria-label="Go back" onClick={onBack}>
          <ArrowLeft className="size-5 rtl:rotate-180" strokeWidth={2.25} />
        </IconButton>
      ) : (
        <span className="size-11" />
      )}
      <div className="min-w-0 flex-1 text-center">
        {title ? (
          <p className="truncate font-display text-lg font-bold tracking-tight text-fog">
            {title}
          </p>
        ) : null}
      </div>
      <div className="flex min-w-11 justify-end">{right ?? <span className="size-11" />}</div>
    </header>
  )
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function IconButton({ children, className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-full border border-fog/10 bg-smoke text-fog transition-colors hover:bg-smoke-strong',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
