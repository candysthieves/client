'use client'
import {
  ActionMenu,
  Avatar,
  AvatarBlock,
  Button,
  EditOutline,
  Modal,
  Scroll,
  TrashOutline,
  Typography,
} from '@candy.thieves/ui-kit-lumos'
import { PostActions } from '@/components/Post/PostActions/PostActions'
import { PostComments } from '@/components/Post/PostComments/PostComments'
import { PostImagesCarousel } from '@/components/PostImagesCarousel/PostImagesCarousel'
import { useIsMobileViewport } from '@/lib/hooks'
import { useAuth } from '@/lib/hooks/useAuth'
import { getPostImageAreaStyle } from '@/lib/utils'
import { mockComments, mockLikedByUsers, type Post } from './PostDetailsModal.mock'
import s from './PostDetailsModal.module.scss'

type Props = {
  post: Post
  open: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

export const PostDetailsModal = ({ post, open, onClose, onEdit, onDelete }: Props) => {
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

            {isAuthor && (
              <ActionMenu
                ariaLabel={'Open post actions'}
                items={[
                  {
                    icon: <EditOutline size={24} />,
                    id: 'edit-post',
                    label: 'Edit Post',
                    onSelect: onEdit,
                  },
                  {
                    icon: <TrashOutline size={24} />,
                    id: 'delete-post',
                    label: 'Delete Post',
                    onSelect: onDelete,
                  },
                ]}
              />
            )}
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
