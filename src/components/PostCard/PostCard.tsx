'use client'

import { Avatar, Carousel, ReadMore, Typography } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { type MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import type { PostImage } from '@/lib/model'
import { useTimeAgo } from '@/lib/utils'
import s from './PostCard.module.scss'
import { useReadMoreClamp } from './useReadMoreClamp'

const EXPANDED_CAPTION_LINES = 8
const READ_MORE_EXPAND_LABEL = 'Show more'
const READ_MORE_COLLAPSE_LABEL = 'Hide'
const EXPANDED_CAPTION_ELLIPSIS = '..'
const INITIAL_COLLAPSED_LENGTH = 60

const IMAGE_WIDTH = 234
const IMAGE_HEIGHT = 240
const COLLAPSED_CAPTION_HEIGHT = 72 // .captionWrapper's fixed height (4.5rem), in px
const MIN_EXPANDED_IMAGE_HEIGHT = 60

type PostCardProps = {
  postId: string
  images: PostImage[]
  username: string
  createdAt: string
  caption: string
}

// Clicks on carousel controls (arrows, dots) shouldn't navigate the Link.
const isInteractiveElementTarget = (target: EventTarget | null) =>
  target instanceof Element && !!target.closest('button')

export const PostCard = ({ postId, images, username, createdAt, caption }: PostCardProps) => {
  const captionWrapperRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [imageWidth, setImageWidth] = useState(0)
  const timeAgo = useTimeAgo(createdAt)
  const validImages = useMemo(() => images.filter(image => image?.url), [images])
  const slides = useMemo(() => validImages.map(image => image.url), [validImages])

  const { maxLength, collapsedText, text, expandedHeight } = useReadMoreClamp(
    captionWrapperRef,
    `.${s.caption}`,
    caption,
    {
      collapsedReserve: `... ${READ_MORE_EXPAND_LABEL}`,
      expandedEllipsis: EXPANDED_CAPTION_ELLIPSIS,
      expandedLines: EXPANDED_CAPTION_LINES,
      expandedReserve: `${EXPANDED_CAPTION_ELLIPSIS} ${READ_MORE_COLLAPSE_LABEL}`,
      initialMaxLength: INITIAL_COLLAPSED_LENGTH,
    }
  )

  // Track width so the image can shrink by exactly as much as the caption grows.
  useEffect(() => {
    const element = imageWrapperRef.current

    if (!element) {
      return
    }

    const observer = new ResizeObserver(([entry]) => setImageWidth(entry.contentRect.width))

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const collapsedImageHeight = (imageWidth * IMAGE_HEIGHT) / IMAGE_WIDTH
  const expandedImageHeight = Math.max(
    MIN_EXPANDED_IMAGE_HEIGHT,
    collapsedImageHeight - (expandedHeight - COLLAPSED_CAPTION_HEIGHT)
  )

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isInteractiveElementTarget(event.target)) {
      event.preventDefault()
    }
  }

  if (validImages.length === 0) {
    return null
  }

  return (
    <div className={s.root} data-expanded={isExpanded}>
      <Link
        aria-label={`Open post by ${username}`}
        className={s.imageLink}
        href={`/?postId=${postId}`}
        onClick={handleClick}
      >
        <div
          className={s.imageWrapper}
          ref={imageWrapperRef}
          style={isExpanded && imageWidth ? { height: `${expandedImageHeight}px` } : undefined}
        >
          {/* Stays mounted while expanded (controls hidden via CSS) to keep the current slide. */}
          <Carousel controlsSize={'s'} slides={slides} />
        </div>
      </Link>

      <div className={s.userRow}>
        <Avatar className={s.avatar} userName={username} />
        <Typography className={s.username} noWrap title={username} variant={'h3'}>
          {username}
        </Typography>
      </div>

      <Typography className={s.time} color={'var(--color-light-900)'} variant={'caption1'}>
        {timeAgo}
      </Typography>

      <div className={s.captionWrapper} ref={captionWrapperRef}>
        <ReadMore
          className={s.caption}
          collapseLabel={READ_MORE_COLLAPSE_LABEL}
          expandLabel={READ_MORE_EXPAND_LABEL}
          maxLength={maxLength}
          onExpandedChange={setIsExpanded}
          text={isExpanded ? text : collapsedText}
        />
      </div>
    </div>
  )
}
