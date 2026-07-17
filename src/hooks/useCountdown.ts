import { useEffect, useRef, useState } from 'react'

/**
 * Countdown keyed by endsAt. Remaining time is derived from Date.now()
 * so a freshly armed timer never reports done=true on the first paint
 * (which previously instant-exploded Fuse on every hold).
 */
export function useCountdown(endsAt: number | null) {
  const [, setTick] = useState(0)

  useEffect(() => {
    if (endsAt == null) return
    const id = window.setInterval(() => setTick((n) => n + 1), 100)
    return () => window.clearInterval(id)
  }, [endsAt])

  const remainingMs = endsAt == null ? 0 : Math.max(0, endsAt - Date.now())

  return {
    remainingMs,
    remainingSec: Math.ceil(remainingMs / 1000),
    done: endsAt != null && remainingMs <= 0,
  }
}

/** Fires onExpire once per endsAt value when the timer elapses. */
export function useOnExpire(
  endsAt: number | null,
  active: boolean,
  onExpire: () => void,
) {
  const handledFor = useRef<number | null>(null)
  const { done } = useCountdown(active ? endsAt : null)

  useEffect(() => {
    if (!active || endsAt == null) {
      if (!active) handledFor.current = null
      return
    }
    if (!done) return
    if (handledFor.current === endsAt) return
    handledFor.current = endsAt
    onExpire()
  }, [active, done, endsAt, onExpire])
}

export function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
