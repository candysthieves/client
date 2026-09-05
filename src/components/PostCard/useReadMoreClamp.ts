import { type RefObject, useEffect, useState } from 'react'

type ReadMoreClampOptions = {
  expandedLines: number
  collapsedReserve: string
  expandedReserve: string
  expandedEllipsis: string
  initialMaxLength?: number
}

type ReadMoreClamp = {
  maxLength: number
  text: string
}

const HEIGHT_TOLERANCE_PX = 1

const truncateToWord = (text: string, length: number, ellipsis: string) => {
  const sliced = text.slice(0, length)
  const lastSpace = sliced.lastIndexOf(' ')

  return `${lastSpace === -1 ? sliced : sliced.slice(0, lastSpace)}${ellipsis}`
}

export const useReadMoreClamp = (
  containerRef: RefObject<HTMLElement | null>,
  textSelector: string,
  text: string,
  {
    expandedLines,
    collapsedReserve,
    expandedReserve,
    expandedEllipsis,
    initialMaxLength = text.length,
  }: ReadMoreClampOptions
): ReadMoreClamp => {
  const [clamp, setClamp] = useState<ReadMoreClamp>({ maxLength: initialMaxLength, text })

  useEffect(() => {
    const measurer = document.createElement('div')

    measurer.style.position = 'absolute'
    measurer.style.visibility = 'hidden'
    measurer.style.height = 'auto'
    measurer.style.whiteSpace = 'normal'
    document.body.append(measurer)

    const measure = () => {
      const container = containerRef.current
      const target = container?.querySelector<HTMLElement>(textSelector)

      if (!container || !target) {
        return
      }

      const { width, font, lineHeight, letterSpacing, wordBreak } = getComputedStyle(target)

      measurer.style.width = width
      measurer.style.font = font
      measurer.style.lineHeight = lineHeight
      measurer.style.letterSpacing = letterSpacing
      measurer.style.wordBreak = wordBreak

      const textFitsWithin = (maxHeight: number, reserve: string, charCount: number) => {
        measurer.textContent = `${text.slice(0, charCount).trimEnd()}${reserve}`

        return measurer.scrollHeight <= maxHeight
      }

      const longestFittingLength = (maxHeight: number, reserve: string) => {
        if (textFitsWithin(maxHeight, reserve, text.length)) {
          return text.length
        }

        let low = 0
        let high = text.length

        while (low < high) {
          const mid = Math.ceil((low + high) / 2)

          if (textFitsWithin(maxHeight, reserve, mid)) {
            low = mid
          } else {
            high = mid - 1
          }
        }

        return low
      }

      const expandedMaxHeight = parseFloat(lineHeight) * expandedLines + HEIGHT_TOLERANCE_PX
      const expandedLength = longestFittingLength(expandedMaxHeight, expandedReserve)
      const isCollapsed =
        container.closest<HTMLElement>('[data-expanded]')?.dataset.expanded !== 'true'

      setClamp(previous => ({
        maxLength: isCollapsed
          ? longestFittingLength(container.clientHeight + HEIGHT_TOLERANCE_PX, collapsedReserve)
          : previous.maxLength,
        text:
          expandedLength < text.length
            ? truncateToWord(text, expandedLength, expandedEllipsis)
            : text,
      }))
    }

    measure()

    const observer = new ResizeObserver(measure)

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    document.fonts.ready.then(measure)

    return () => {
      observer.disconnect()
      measurer.remove()
    }
  }, [
    containerRef,
    textSelector,
    text,
    expandedLines,
    collapsedReserve,
    expandedReserve,
    expandedEllipsis,
  ])

  return clamp
}
