import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { GameDefinition } from '../../games/types'

type Accent = GameDefinition['accent']

interface OptionCardProps {
  selected: boolean
  onSelect: () => void
  title: ReactNode
  hint?: ReactNode
  /** Accent when selected — spicy options should pass 'spark'. */
  accent?: Accent
  className?: string
}

const selectedByAccent: Record<Accent, string> = {
  gold: 'border-gold/50 bg-gold/15',
  spark: 'border-spark/50 bg-spark/15',
  mint: 'border-mint/50 bg-mint/15',
  ember: 'border-ember/50 bg-ember/15',
  sky: 'border-sky/50 bg-sky/15',
  rose: 'border-rose/50 bg-rose/15',
}

/**
 * Standard selectable card for setup screens — pack, mode and heat pickers
 * all share this look so every game's setup reads the same.
 */
export function OptionCard({
  selected,
  onSelect,
  title,
  hint,
  accent = 'gold',
  className,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'rounded-2xl border px-4 py-3 text-start transition-colors',
        selected
          ? cn(selectedByAccent[accent], 'text-fog')
          : 'border-fog/10 bg-ink/25 text-fog-dim hover:border-fog/20',
        className,
      )}
    >
      <span className="block font-semibold text-fog">{title}</span>
      {hint ? (
        <span className="mt-0.5 block text-xs text-fog-mute">{hint}</span>
      ) : null}
    </button>
  )
}
