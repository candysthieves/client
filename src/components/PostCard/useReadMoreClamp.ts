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
  /** Text to pass to ReadMore while collapsed — its cut point lands exactly at `maxLength`. */
  collapsedText: string
  text: string
  /** Max height (px) of the expanded text — the same for every post, so cards stay aligned. */
  expandedHeight: number
}

const HEIGHT_TOLERANCE_PX = 1

const sliceToWord = (text: string, length: number) => {
  const sliced = text.slice(0, length)
  const lastSpace = sliced.lastIndexOf(' ')

  return lastSpace === -1 ? sliced : sliced.slice(0, lastSpace)
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
  const [clamp, setClamp] = useState<ReadMoreClamp>({
    collapsedText: text,
    expandedHeight: 0,
    maxLength: initialMaxLength,
    text,
  })

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

      const { width, font, lineHeight, letterSpacing, wordBreak, overflowWrap } =
        getComputedStyle(target)

      measurer.style.width = width
      measurer.style.font = font
      measurer.style.lineHeight = lineHeight
      measurer.style.letterSpacing = letterSpacing
      measurer.style.wordBreak = wordBreak
      measurer.style.overflowWrap = overflowWrap

      const heightOf = (content: string) => {
        measurer.textContent = content

        return measurer.scrollHeight
      }

      const textFitsWithin = (maxHeight: number, reserve: string, charCount: number) =>
        heightOf(`${text.slice(0, charCount).trimEnd()}${reserve}`) <= maxHeight

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

      // Prefer cutting at a word boundary, but a word longer than a line is broken by
      // overflow-wrap, so backing off to the previous space would drop whole lines.
      const truncate = (length: number) => {
        const wordCut = sliceToWord(text, length)
        const charCut = text.slice(0, length).trimEnd()

        return heightOf(wordCut) < heightOf(charCut) ? charCut : wordCut
      }

      const expandedHeight = parseFloat(lineHeight) * expandedLines
      const expandedMaxHeight = expandedHeight + HEIGHT_TOLERANCE_PX
      const expandedLength = longestFittingLength(expandedMaxHeight, expandedReserve)
      const expandedText =
        expandedLength < text.length ? `${truncate(expandedLength)}${expandedEllipsis}` : text
      const isCollapsed =
        container.closest<HTMLElement>('[data-expanded]')?.dataset.expanded !== 'true'

      if (!isCollapsed) {
        setClamp(previous => ({ ...previous, expandedHeight, text: expandedText }))

        return
      }

      const collapsedLength = longestFittingLength(
        container.clientHeight + HEIGHT_TOLERANCE_PX,
        collapsedReserve
      )

      if (collapsedLength >= text.length) {
        setClamp({
          collapsedText: text,
          expandedHeight,
          maxLength: text.length,
          text: expandedText,
        })

        return
      }

      // ReadMore cuts at the last space before `maxLength`, so put one right at our cut point.
      const collapsedCut = truncate(collapsedLength)

      setClamp({
        collapsedText: `${collapsedCut} ${text.slice(collapsedCut.length).trimStart()}`,
        expandedHeight,
        maxLength: collapsedCut.length + 1,
        text: expandedText,
      })
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
