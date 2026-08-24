'use client'

import {
  Avatar,
  BookmarkOutline,
  Carousel,
  Close,
  EditOutline,
  HeartOutline,
  MessageCircleOutline,
  PaperPlaneOutline,
  Typography,
} from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import s from './MobilePostFeed.module.scss'
import { Post } from './mockData'

type Props = {
  posts: Post[]
  startIndex: number
  onClose: () => void
  onEdit: (index: number) => void
}

export const MobilePostFeed = ({ posts, startIndex, onClose, onEdit }: Props) => {
  const postRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    requestAnimationFrame(() => {
      postRefs.current[startIndex]?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      })
    })
  }, [startIndex])

  return (
    <>
      <button type={'button'} aria-label={'Close'} className={s.closeButton} onClick={onClose}>
        <Close size={24} />
      </button>

      <div className={s.slides}>
        {posts.map((post, index) => (
          <article
            key={post.postId}
            className={s.slide}
            ref={element => {
              postRefs.current[index] = element
            }}
          >
            <div className={s.author}>
              <Avatar userName={post.userName} size={'s'} delayMs={0} />

              <Typography variant={'subtitle2'}>{post.userName}</Typography>
            </div>
            <div className={s.imageArea}>
              {post.images.length > 1 ? (
                <Carousel
                  slides={post.images.map(image => (
                    <Image
                      key={image.url}
                      src={image.url}
                      alt={post.description || 'Post'}
                      width={image.width ?? 986}
                      height={image.height ?? 1130}
                      className={s.postImage}
                    />
                  ))}
                />
              ) : (
                <div className={s.imageFrame}>
                  <Image
                    src={post.images[0].url}
                    alt={post.description || 'Post'}
                    width={post.images[0].width ?? 986}
                    height={post.images[0].height ?? 1130}
                    className={s.postImage}
                  />
                </div>
              )}
            </div>
            <div className={s.actionsRow}>
              <div className={s.actionsGroup}>
                <button type={'button'} aria-label={'Like'} className={s.actionButton}>
                  <HeartOutline size={24} />
                </button>
                <button type={'button'} aria-label={'Comment'} className={s.actionButton}>
                  <MessageCircleOutline size={24} />
                </button>
                <button type={'button'} aria-label={'Share'} className={s.actionButton}>
                  <PaperPlaneOutline size={24} />
                </button>
              </div>

              <div className={s.actionsGroup}>
                <button
                  type={'button'}
                  aria-label={'Edit post'}
                  className={s.actionButton}
                  onClick={() => onEdit(index)}
                >
                  <EditOutline size={24} />
                </button>

                <button type={'button'} aria-label={'Save'} className={s.actionButton}>
                  <BookmarkOutline size={24} />
                </button>
              </div>
            </div>

            <div className={s.info}>
              <Typography variant={'caption1'} color={'var(--color-light-900)'}>
                {post.createdAt}
              </Typography>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
