import { useCallback, useEffect, useRef, useState } from 'react'

export type TiltPermission = 'unsupported' | 'prompt' | 'granted' | 'denied'

interface DeviceMotionEventCtor {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

/**
 * Heads-Up-style tilt controls for phone-on-forehead play.
 *
 * We watch the screen-normal axis of gravity (`accelerationIncludingGravity.z`),
 * which is ~0 when the phone is held vertical against the forehead regardless of
 * portrait/landscape. Tilting the top of the phone down (screen toward the floor)
 * pushes z positive → "got it"; leaning it back (screen toward the ceiling)
 * pushes z negative → "pass". The gesture re-arms only after returning to
 * neutral, so one tilt fires once.
 */
export function useTilt({
  active,
  onGotIt,
  onSkip,
}: {
  active: boolean
  onGotIt: () => void
  onSkip: () => void
}) {
  const [permission, setPermission] = useState<TiltPermission>(() => {
    if (typeof window === 'undefined' || typeof DeviceMotionEvent === 'undefined') {
      return 'unsupported'
    }
    const ctor = DeviceMotionEvent as unknown as DeviceMotionEventCtor
    return typeof ctor.requestPermission === 'function' ? 'prompt' : 'granted'
  })

  const onGotItRef = useRef(onGotIt)
  const onSkipRef = useRef(onSkip)
  onGotItRef.current = onGotIt
  onSkipRef.current = onSkip

  const armedRef = useRef(true)
  const lastFireRef = useRef(0)

  const requestPermission = useCallback(async () => {
    if (typeof DeviceMotionEvent === 'undefined') {
      setPermission('unsupported')
      return 'unsupported' as const
    }
    const ctor = DeviceMotionEvent as unknown as DeviceMotionEventCtor
    if (typeof ctor.requestPermission === 'function') {
      try {
        const res = await ctor.requestPermission()
        const next = res === 'granted' ? 'granted' : 'denied'
        setPermission(next)
        return next
      } catch {
        setPermission('denied')
        return 'denied' as const
      }
    }
    setPermission('granted')
    return 'granted' as const
  }, [])

  useEffect(() => {
    if (!active || permission !== 'granted') return

    const NEUTRAL = 3.5 // m/s² — phone held roughly vertical
    const TRIGGER = 6.5 // m/s² — decisive tilt in either direction
    const COOLDOWN = 450 // ms between fires

    const handler = (e: DeviceMotionEvent) => {
      const z = e.accelerationIncludingGravity?.z
      if (z == null) return

      if (Math.abs(z) < NEUTRAL) {
        armedRef.current = true
        return
      }
      if (!armedRef.current) return
      if (Date.now() - lastFireRef.current < COOLDOWN) return

      if (z >= TRIGGER) {
        armedRef.current = false
        lastFireRef.current = Date.now()
        navigator.vibrate?.(30)
        onGotItRef.current()
      } else if (z <= -TRIGGER) {
        armedRef.current = false
        lastFireRef.current = Date.now()
        navigator.vibrate?.(60)
        onSkipRef.current()
      }
    }

    armedRef.current = true
    window.addEventListener('devicemotion', handler)
    return () => window.removeEventListener('devicemotion', handler)
  }, [active, permission])

  return { permission, requestPermission }
}
