'use client'

import { Avatar, AvatarBlock, Button, Close, Typography } from '@candy.thieves/ui-kit-lumos'
import { useEffect, useRef } from 'react'
import { PostActionMenu } from '@/components/Post/PostActionMenu/PostActionMenu'
import { PostActions } from '@/components/Post/PostActions/PostActions'
import { PostImagesCarousel } from '@/components/PostImagesCarousel/PostImagesCarousel'
import { useIsMobileViewport } from '@/lib/hooks'
import { useAuth } from '@/lib/hooks/useAuth'
import { UserProfile } from '@/lib/model'
import { formatPostDate } from '@/lib/utils/formatPostDate'
import { mockLikedByUsers, Post } from '@/mocks/posts'
import s from './MobilePostFeed.module.scss'

type Props = {
  posts: Post[]
  userProfile: UserProfile
  startIndex: number
  onClose: () => void
  onDelete: (postId: string) => void
  onEdit: (index: number) => void
}

export const MobilePostFeed = ({
  posts,
  userProfile,
  startIndex,
  onClose,
  onDelete,
  onEdit,
}: Props) => {
  const { id: userId, username: profileUserName = userId, avatarPreviewUrl } = userProfile

  const isMobile = useIsMobileViewport()
  const { isAuthenticated } = useAuth()
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
      <Button type={'button'} aria-label={'Close'} className={s.closeButton} onClick={onClose}>
        <Close size={24} />
      </Button>

      <div className={s.slides}>
        {posts.map((post, index) => {
          return (
            <article
              key={post.postId}
              className={s.slide}
              ref={element => {
                postRefs.current[index] = element
              }}
            >
              <div className={s.author}>
                <Avatar
                  userName={profileUserName}
                  size={'s'}
                  delayMs={0}
                  src={avatarPreviewUrl?.url || ''}
                />

                <Typography variant={'subtitle2'}>{profileUserName}</Typography>

                {/* TODO: When the posts backend is connected, restore `const isAuthor = !!user && user.id === post.userId` and pass isAuthor here. */}
                <PostActionMenu
                  isAuthor={isAuthenticated}
                  onEdit={() => onEdit(index)}
                  onDelete={() => onDelete(post.postId)}
                />
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
                  {formatPostDate(post.createdAt)}
                </Typography>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
