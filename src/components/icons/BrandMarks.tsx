import type { SVGProps } from 'react'
import { cn } from '../../lib/cn'

type IconProps = SVGProps<SVGSVGElement> & { className?: string }

/** Pass mark — three seats around a table */
export function PassMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <rect width="64" height="64" rx="16" fill="#0C0D10" />
      <path
        d="M14 42c9-14 27-14 36 0"
        stroke="#E2B03A"
        strokeWidth="3.75"
        strokeLinecap="round"
      />
      <circle cx="18" cy="30" r="4.75" fill="#E8EEF8" />
      <circle cx="32" cy="22" r="4.75" fill="#3DDEB0" />
      <circle cx="46" cy="30" r="4.75" fill="#E8EEF8" />
    </svg>
  )
}

export function PassLogo({ className }: { className?: string }) {
  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <PassMark className="size-11" />
      <span className="font-display text-3xl font-extrabold tracking-tight text-fog">
        Pass
      </span>
    </div>
  )
}

export function ImpostorMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <rect width="56" height="56" rx="16" fill="#E2B03A" fillOpacity="0.12" />
      <circle cx="22" cy="24" r="3" fill="#E8EEF8" />
      <circle cx="34" cy="24" r="3" fill="#E8EEF8" />
      <path
        d="M20 34c2.2-4.5 13.8-4.5 16 0"
        stroke="#E2B03A"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M38 16l5-5M43 16l-5-5"
        stroke="#FF5A45"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function FuseMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <rect width="56" height="56" rx="16" fill="#FF5A45" fillOpacity="0.12" />
      <circle cx="28" cy="32" r="11" fill="#FF5A45" />
      <circle cx="24" cy="28" r="3.5" fill="#fff" fillOpacity="0.22" />
      <path
        d="M28 21V14"
        stroke="#E2B03A"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M28 14c3.2-.4 4.8-2.8 4-5.2"
        stroke="#3DDEB0"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx="33" cy="7.5" r="2.5" fill="#FF5A45" />
    </svg>
  )
}

export function HotSeatMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <rect width="56" height="56" rx="16" fill="#FF8A4C" fillOpacity="0.12" />
      {/* Spotlight seat */}
      <path
        d="M18 40c0-6 4.5-10 10-10s10 4 10 10"
        stroke="#FF8A4C"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="28" cy="22" r="6" fill="#FF8A4C" fillOpacity="0.35" stroke="#FF8A4C" strokeWidth="2.25" />
      {/* Timer ticks */}
      <path
        d="M28 8v3M40 14l-2.2 2.2M16 14l2.2 2.2"
        stroke="#E2B03A"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SpyMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <rect width="56" height="56" rx="16" fill="#3DDEB0" fillOpacity="0.12" />
      {/* Map pin */}
      <path
        d="M28 12c-5.5 0-10 4.3-10 9.6 0 7.2 10 18.4 10 18.4s10-11.2 10-18.4C38 16.3 33.5 12 28 12z"
        stroke="#3DDEB0"
        strokeWidth="2.5"
        fill="#3DDEB0"
        fillOpacity="0.2"
      />
      <circle cx="28" cy="21.5" r="3.25" fill="#E8EEF8" />
      {/* Question mark for the spy */}
      <path
        d="M42 38c0-2.2 1.6-3.5 3.4-3.5 1.7 0 3.1 1.1 3.1 2.8 0 1.4-1 2.1-2.1 2.8-.9.6-1.4 1.1-1.4 2.1v.4"
        stroke="#FF5A45"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx="45.4" cy="46.2" r="1.35" fill="#FF5A45" />
    </svg>
  )
}

export function StoryMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <rect width="56" height="56" rx="16" fill="#5AA8D8" fillOpacity="0.12" />
      <path
        d="M16 18h18c2.2 0 4 1.8 4 4v16c0 1.1-.9 2-2 2H18c-2.2 0-4-1.8-4-4V20c0-1.1.9-2 2-2z"
        stroke="#5AA8D8"
        strokeWidth="2.5"
        fill="#5AA8D8"
        fillOpacity="0.15"
      />
      <path
        d="M20 24h12M20 30h10M20 36h7"
        stroke="#E8EEF8"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx="42" cy="16" r="4" fill="#E2B03A" />
    </svg>
  )
}

export function BondMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <rect width="56" height="56" rx="16" fill="#E87A9A" fillOpacity="0.12" />
      <circle cx="22" cy="24" r="6" stroke="#E87A9A" strokeWidth="2.5" fill="#E87A9A" fillOpacity="0.2" />
      <circle cx="34" cy="24" r="6" stroke="#E87A9A" strokeWidth="2.5" fill="#E87A9A" fillOpacity="0.2" />
      <path
        d="M16 40c2.5-5 8-7.5 12-7.5S37.5 35 40 40"
        stroke="#E87A9A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M28 14l1.2 2.4 2.6.4-1.9 1.8.5 2.6L28 20l-2.4 1.2.5-2.6-1.9-1.8 2.6-.4L28 14z"
        fill="#E2B03A"
      />
    </svg>
  )
}

export function LikelyMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <rect width="56" height="56" rx="16" fill="#E2B03A" fillOpacity="0.12" />
      <circle cx="28" cy="28" r="12" stroke="#E2B03A" strokeWidth="2.5" fill="#E2B03A" fillOpacity="0.12" />
      <path
        d="M28 18v10l7 4"
        stroke="#E8EEF8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 14c2.5 1 4 3.2 4 5.8"
        stroke="#FF5A45"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ActMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <rect width="56" height="56" rx="16" fill="#3DDEB0" fillOpacity="0.12" />
      <circle cx="28" cy="18" r="6" stroke="#3DDEB0" strokeWidth="2.5" fill="#3DDEB0" fillOpacity="0.2" />
      <path
        d="M14 42c1.5-7 7-11 14-11s12.5 4 14 11"
        stroke="#3DDEB0"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M40 20l4-2M40 26l4 1M14 20l-4-2M14 26l-4 1"
        stroke="#E2B03A"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function TruthDareMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <rect width="56" height="56" rx="16" fill="#E87A9A" fillOpacity="0.12" />
      <path
        d="M28 40s-11-6.5-11-14a6.5 6.5 0 0 1 11-4.7A6.5 6.5 0 0 1 39 26c0 7.5-11 14-11 14z"
        stroke="#E87A9A"
        strokeWidth="2.5"
        fill="#E87A9A"
        fillOpacity="0.2"
        strokeLinejoin="round"
      />
      <path
        d="M25 25c0-1.6 1.3-3 3-3s3 1.1 3 2.6c0 2-3 2.4-3 4M28 33.5h.02"
        stroke="#E8EEF8"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BombMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient id="passBombGrad" x1="36" y1="40" x2="90" y2="100">
          <stop stopColor="#FF7A68" />
          <stop offset="1" stopColor="#D63D2C" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="68" r="36" fill="url(#passBombGrad)" />
      <circle cx="48" cy="56" r="8" fill="#fff" fillOpacity="0.18" />
      <path
        d="M60 32V22"
        stroke="#E2B03A"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M60 22c6-1 9-6 7-12"
        stroke="#3DDEB0"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="68" cy="8" r="4" fill="#FF5A45" />
    </svg>
  )
}
