'use client'
import { Avatar, AvatarBlock, Button, Modal, Scroll, Typography } from '@candy.thieves/ui-kit-lumos'
import { PostActionMenu } from '@/components/Post/PostActionMenu/PostActionMenu'
import { PostActions } from '@/components/Post/PostActions/PostActions'
import { PostComments } from '@/components/Post/PostComments/PostComments'
import { PostImagesCarousel } from '@/components/PostImagesCarousel/PostImagesCarousel'
import { useIsMobileViewport } from '@/lib/hooks'
import { useAuth } from '@/lib/hooks/useAuth'
import { getPostImageAreaStyle } from '@/lib/utils'
import { mockComments, mockLikedByUsers, type Post } from '@/mocks/posts'
import s from './PostDetailsModal.module.scss'

type Props = {
  post: Post
  open: boolean
  onClose: () => void
  onEdit: () => void
}

export const PostDetailsModal = ({ post, open, onClose, onEdit }: Props) => {
  const { user, isAuthenticated } = useAuth()
  const isMobileViewport = useIsMobileViewport()
  const isAuthor = !!user && user.id === post.userId

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={'xl'}
      closeButtonOutside
      fullSize
      className={s.modal}
    >
      <div className={s.postContainer} style={getPostImageAreaStyle(post.images[0])}>
        <div className={s.postImageContainer}>
          <PostImagesCarousel images={post.images} alt={post.description || 'Post'} />
        </div>

        <div className={s.postInfo}>
          {/* Header */}
          <div className={s.postHeader}>
            <div className={s.author}>
              <Avatar userName={post.userName} size={'s'} delayMs={0} />

              <Typography variant={'subtitle2'}>{post.userName}</Typography>
            </div>

            <PostActionMenu isAuthor={isAuthor} onEdit={onEdit} />
          </div>

          {/* Scrollable: author's description + comments */}
          <div className={`${s.scrollSection} ${!isAuthenticated ? s.scrollSectionGuest : ''}`}>
            <Scroll orientation={'vertical'}>
              <PostComments comments={mockComments} isAuthenticated={isAuthenticated} post={post} />
            </Scroll>
          </div>

          {/* Actions */}
          {isAuthenticated && <PostActions showComments={isMobileViewport} />}

          {/* Footer: likes + date */}
          <div className={`${s.postFooter} ${!isAuthenticated ? s.postFooterGuest : ''}`}>
            <div className={s.likes}>
              <AvatarBlock users={mockLikedByUsers} />

              <Typography variant={'body2'}>2 243 &quot;Like&quot;</Typography>
            </div>

            <div className={s.date}>
              <Typography variant={'caption1'} color={'var(--color-light-900)'}>
                July 3, 2021
              </Typography>
            </div>
          </div>

          {/* Comment input */}
          {isAuthenticated && (
            <div className={s.commentForm}>
              <input className={s.commentInput} placeholder={'Add a Comment...'} />

              <Button type={'button'} variant={'text'}>
                Publish
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
