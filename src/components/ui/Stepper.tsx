import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface StepperProps {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  hint?: string
  suffix?: string
}

export function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  hint,
  suffix,
}: StepperProps) {
  return (
    <div className="rounded-2xl border border-fog/10 bg-ink/35 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-fog">{label}</p>
          {hint ? <p className="mt-0.5 text-sm text-fog-mute">{hint}</p> : null}
        </div>
        <div className="flex items-center gap-2">
          <StepButton
            aria-label={`Decrease ${label}`}
            disabled={value <= min}
            onClick={() => onChange(Math.max(min, value - 1))}
          >
            −
          </StepButton>
          <span className="min-w-10 text-center font-display text-xl font-bold tabular-nums text-gold">
            {value}
            {suffix}
          </span>
          <StepButton
            aria-label={`Increase ${label}`}
            disabled={value >= max}
            onClick={() => onChange(Math.min(max, value + 1))}
          >
            +
          </StepButton>
        </div>
      </div>
    </div>
  )
}

function StepButton({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
  'aria-label': string
}) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-xl border border-fog/10 bg-smoke text-lg text-fog transition-colors hover:bg-smoke-strong disabled:opacity-35',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
