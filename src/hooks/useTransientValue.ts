import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Guarda un valor que vuelve a `null` tras `durationMs`.
 * Llamar a `show` de nuevo reinicia el temporizador.
 */
export function useTransientValue<T>(durationMs: number): readonly [T | null, (value: T) => void] {
  const [value, setValue] = useState<T | null>(null)
  const timeoutRef = useRef<number | undefined>(undefined)

  const show = useCallback(
    (next: T) => {
      window.clearTimeout(timeoutRef.current)
      setValue(next)
      timeoutRef.current = window.setTimeout(() => setValue(null), durationMs)
    },
    [durationMs],
  )

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  return [value, show] as const
}
