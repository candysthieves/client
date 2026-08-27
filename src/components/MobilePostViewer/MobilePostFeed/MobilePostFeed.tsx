'use client'

import { Avatar, AvatarBlock, Close, Typography } from '@candy.thieves/ui-kit-lumos'
import { useEffect, useRef } from 'react'
import { PostActionMenu } from '@/components/Post/PostActionMenu/PostActionMenu'
import { PostActions } from '@/components/Post/PostActions/PostActions'
import { PostImagesCarousel } from '@/components/PostImagesCarousel/PostImagesCarousel'
import { useIsMobileViewport } from '@/lib/hooks'
import { useAuth } from '@/lib/hooks/useAuth'
import { mockLikedByUsers, Post } from '@/mocks/posts'
import s from './MobilePostFeed.module.scss'

type Props = {
  posts: Post[]
  startIndex: number
  onClose: () => void
  onEdit: (index: number) => void
}

export const MobilePostFeed = ({ posts, startIndex, onClose, onEdit }: Props) => {
  const isMobile = useIsMobileViewport()
  const { user } = useAuth()
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
        {posts.map((post, index) => {
          const isAuthor = !!user && user.id === post.userId
          return (
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

                <PostActionMenu isAuthor={isAuthor} onEdit={() => onEdit(index)} />
              </div>
              <div className={s.imageArea}>
                <PostImagesCarousel images={post.images} alt={post.description} natural />
              </div>

              <PostActions showComments={isMobile} />

              <div className={s.info}>
                {post.description && (
                  <div className={s.description}>
                    <Typography variant={'body1'} color={'var(--color-light-100)'}>
                      {post.description}
                    </Typography>
                  </div>
                )}

                <div className={s.likes}>
                  <AvatarBlock users={mockLikedByUsers} />

                  <Typography variant={'body2'}>2 243 &quot;Like&quot;</Typography>
                </div>

                <Typography variant={'caption1'} color={'var(--color-light-900)'}>
                  {post.createdAt}
                </Typography>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
