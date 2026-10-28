import { type RefObject, useEffect } from 'react'

const VIEW_THRESHOLD = 0.5 //50% элемента
const VIEW_DELAY_MS = 2000 //время просмотра элемента

export const useMarkAsViewed = (
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  onViewed: () => void
) => {
  useEffect(() => {
    const element = ref.current
    if (!enabled || !element) return

    let timerId: ReturnType<typeof setTimeout> | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerId = setTimeout(onViewed, VIEW_DELAY_MS)
        } else {
          clearTimeout(timerId)
        }
      },
      { threshold: VIEW_THRESHOLD }
    )

    observer.observe(element)

    return () => {
      clearTimeout(timerId)
      observer.disconnect()
    }
  }, [enabled, onViewed, ref])
}
