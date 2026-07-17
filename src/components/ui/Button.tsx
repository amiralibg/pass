import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'md' | 'lg' | 'xl'
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gold text-contrast shadow-[0_8px_0_0_#b89028] hover:translate-y-px hover:shadow-[0_7px_0_0_#b89028] active:translate-y-1 active:shadow-[0_4px_0_0_#b89028]',
  secondary:
    'bg-smoke-strong text-fog border border-fog/12 hover:bg-smoke',
  ghost: 'bg-transparent text-fog-dim hover:text-fog hover:bg-smoke',
  danger:
    'bg-spark text-fog shadow-[0_8px_0_0_#d63d2c] hover:translate-y-px hover:shadow-[0_7px_0_0_#d63d2c] active:translate-y-1 active:shadow-[0_4px_0_0_#d63d2c]',
}

const sizes = {
  md: 'h-11 px-5 text-[15px]',
  lg: 'min-h-[3.25rem] px-6 text-base',
  xl: 'min-h-[4rem] px-8 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'lg',
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold tracking-tight transition-[transform,box-shadow,background-color,color] duration-150 ease-out select-none disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
