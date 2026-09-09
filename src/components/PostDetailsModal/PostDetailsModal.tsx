'use client'
import { Avatar, AvatarBlock, Button, Modal, Scroll, Typography } from '@candy.thieves/ui-kit-lumos'
import type { Post, UserProfile } from '@/lib/model'
import { PostActionMenu } from '@/components/Post/PostActionMenu/PostActionMenu'
import { PostActions } from '@/components/Post/PostActions/PostActions'
import { PostComments } from '@/components/Post/PostComments/PostComments'
import { PostImagesCarousel } from '@/components/PostImagesCarousel/PostImagesCarousel'
import { useIsMobileViewport } from '@/lib/hooks'
import { useAuth } from '@/lib/hooks/useAuth'
import { getPostImageAreaStyle } from '@/lib/utils'
import { formatPostDate } from '@/lib/utils/formatPostDate'
import { mockComments, mockLikedByUsers } from '@/mocks/posts'
import s from './PostDetailsModal.module.scss'

type Props = {
  post: Post
  open: boolean
  userProfile: UserProfile
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
  canEdit: boolean
  deleteLabel?: string
}

export const PostDetailsModal = ({
  post,
  open,
  userProfile,
  onClose,
  onEdit,
  onDelete,
  canEdit = true,
  deleteLabel,
}: Props) => {
  const { id: userId, username: profileUserName = userId, avatarPreviewUrl } = userProfile
  const { user, isAuthenticated } = useAuth()
  const isMobileViewport = useIsMobileViewport()
  const isAuthor = !!user && user.id === (post.author?.id ?? userProfile.id)
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
          <PostImagesCarousel images={post.images} alt={post.description} />
        </div>

        <div className={s.postInfo}>
          {/* Header */}
          <div className={s.postHeader}>
            <div className={s.author}>
              <Avatar
                userName={profileUserName}
                size={'s'}
                delayMs={0}
                src={avatarPreviewUrl?.url || ''}
              />

              <Typography variant={'subtitle2'}>{profileUserName}</Typography>
            </div>

            <PostActionMenu
              isAuthor={isAuthor}
              onEdit={onEdit}
              onDelete={onDelete}
              canEdit={canEdit}
              deleteLabel={deleteLabel}
            />
          </div>

          {/* Scrollable: author's description + comments */}
          <div className={`${s.scrollSection} ${!isAuthenticated ? s.scrollSectionGuest : ''}`}>
            <Scroll orientation={'vertical'}>
              <PostComments post={post} comments={mockComments} />
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
                {formatPostDate(post.createdAt)}
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
