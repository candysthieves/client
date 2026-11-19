import { type RefObject, useEffect, useRef } from 'react'

const VIEW_THRESHOLD = 0.5
const VIEW_DELAY_MS = 2000

export const useMarkAsViewed = (
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  onViewed: () => void
) => {
  const onViewedRef = useRef(onViewed)
  const hasFiredRef = useRef(false)

  useEffect(() => {
    onViewedRef.current = onViewed
  }, [onViewed])

  useEffect(() => {
    const element = ref.current

    if (!enabled || !element || hasFiredRef.current) return

    let timerId: ReturnType<typeof setTimeout> | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timerId)

        if (!entry.isIntersecting || hasFiredRef.current) return

        timerId = setTimeout(() => {
          hasFiredRef.current = true
          onViewedRef.current()
        }, VIEW_DELAY_MS)
      },
      { threshold: VIEW_THRESHOLD }
    )

    observer.observe(element)

    return () => {
      clearTimeout(timerId)
      observer.disconnect()
    }
  }, [enabled, ref])
}
