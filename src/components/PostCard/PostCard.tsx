'use client'

import { Avatar, Carousel, ReadMore, Typography } from '@candy.thieves/ui-kit-lumos'
import { type KeyboardEvent, type MouseEvent, useRef, useState } from 'react'
import s from './PostCard.module.scss'
import { useReadMoreClamp } from './useReadMoreClamp'

const EXPANDED_CAPTION_LINES = 8
const READ_MORE_EXPAND_LABEL = 'Show more'
const READ_MORE_COLLAPSE_LABEL = 'Hide'
const EXPANDED_CAPTION_ELLIPSIS = '..'
const INITIAL_COLLAPSED_LENGTH = 60

type PostCardProps = {
  images: string[]
  username: string
  timeAgo: string
  caption: string
  onOpen: () => void
}

const isInteractiveElementTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement && !!target.closest('a, button')

export const PostCard = ({ images, username, timeAgo, caption, onOpen }: PostCardProps) => {
  const captionWrapperRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const showCarouselControls = !isExpanded

  const { maxLength, text } = useReadMoreClamp(captionWrapperRef, `.${s.caption}`, caption, {
    collapsedReserve: `... ${READ_MORE_EXPAND_LABEL}`,
    expandedEllipsis: EXPANDED_CAPTION_ELLIPSIS,
    expandedLines: EXPANDED_CAPTION_LINES,
    expandedReserve: `${EXPANDED_CAPTION_ELLIPSIS} ${READ_MORE_COLLAPSE_LABEL}`,
    initialMaxLength: INITIAL_COLLAPSED_LENGTH,
  })

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!isInteractiveElementTarget(event.target)) {
      onOpen()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isInteractiveElementTarget(event.target)) {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen()
    }
  }

  return (
    <div
      aria-label={`Open post by ${username}`}
      className={s.root}
      data-expanded={isExpanded}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={'button'}
      tabIndex={0}
    >
      <div className={s.imageWrapper}>
        {showCarouselControls ? (
          <Carousel controlsSize={'s'} slides={images} />
        ) : (
          <img alt={username} className={s.image} src={images[0]} />
        )}
      </div>

      <div className={s.userRow}>
        <Avatar userName={username} />
        <Typography variant={'h3'}>{username}</Typography>
      </div>

      <Typography className={s.time} variant={'caption1'}>
        {timeAgo}
      </Typography>

      <div className={s.captionWrapper} ref={captionWrapperRef}>
        <ReadMore
          className={s.caption}
          collapseLabel={READ_MORE_COLLAPSE_LABEL}
          expandLabel={READ_MORE_EXPAND_LABEL}
          maxLength={maxLength}
          onExpandedChange={setIsExpanded}
          text={text}
        />
      </div>
    </div>
  )
}
