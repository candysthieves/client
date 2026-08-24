'use client'

import {
  Avatar,
  AvatarBlock,
  BookmarkOutline,
  Button,
  HeartOutline,
  Modal,
  PaperPlaneOutline,
  Scroll,
  Typography,
} from '@candy.thieves/ui-kit-lumos'
import { PostImagesCarousel } from '@/components/PostImagesCarousel/PostImagesCarousel'
import { getPostImageAreaStyle } from '@/lib/utils'
import { isAuthenticated } from '@/shared/config/isAuthenticated'
import { type Comment, mockComments, mockLikedByUsers, type Post } from './PostDetailsModal.mock'
import s from './PostDetailsModal.module.scss'

type Props = {
  post: Post
  open: boolean
  onClose: () => void
  onEdit: () => void
}

export const PostDetailsModal = ({ post, open, onClose, onEdit }: Props) => {
  const descriptionComment = post.description
    ? {
        id: 'post-description',
        username: post.userName,
        text: post.description,
        createdAt: '',
      }
    : null

  const renderComment = (comment: Comment, isDescription = false) => (
    <div key={comment.id} className={s.comment}>
      <Avatar userName={comment.username} src={comment.avatarUrl} size={'s'} delayMs={0} />

      <div className={s.commentBody}>
        <Typography variant={'subtitle2'} className={s.commentText}>
          {comment.username}&nbsp;
        </Typography>

        <Typography variant={'body1'} className={s.commentText}>
          {comment.text}
        </Typography>

        <div className={s.commentMeta}>
          <Typography variant={'caption1'} color={'var(--color-light-900)'}>
            {comment.createdAt}
          </Typography>

          {comment.likesCount ? (
            <Typography variant={'caption2'} color={'var(--color-light-900)'}>
              Like: {comment.likesCount}
            </Typography>
          ) : null}

          {isDescription ? null : (
            <button type={'button'} className={s.answerButton}>
              <Typography variant={'caption2'} color={'var(--color-light-900)'}>
                Answer
              </Typography>
            </button>
          )}
        </div>
      </div>

      <button type={'button'} aria-label={'Like'} className={s.actionButton}>
        <HeartOutline size={16} />
      </button>
    </div>
  )

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
          <div className={s.author}>
            <Avatar userName={post.userName} size={'s'} delayMs={0} />

            <Typography variant={'subtitle2'}>{post.userName}</Typography>

            {/* temporary placeholder for the future dropdown menu */}
            {isAuthenticated && (
              <Button type={'button'} variant={'text'} onClick={onEdit}>
                Edit Post
              </Button>
            )}
          </div>

          {/* Scrollable: author's description + comments */}
          <div className={`${s.scrollSection} ${!isAuthenticated ? s.scrollSectionGuest : ''}`}>
            <Scroll orientation={'vertical'}>
              <div className={s.commentsBlock}>
                {descriptionComment && renderComment(descriptionComment, true)}

                {mockComments.length === 0 ? (
                  <div className={s.emptyComments}>
                    <Typography variant={'body2'}>No comments yet</Typography>

                    <Typography variant={'caption1'} color={'var(--color-light-900)'}>
                      Be the first to comment
                    </Typography>
                  </div>
                ) : (
                  mockComments.map(comment => renderComment(comment))
                )}
              </div>
            </Scroll>
          </div>

          {/* Actions */}
          {isAuthenticated && (
            <div className={s.actions}>
              <div className={s.leftActions}>
                <button type={'button'} aria-label={'Like'} className={s.actionButton}>
                  <HeartOutline size={24} />
                </button>
                <button type={'button'} aria-label={'Share'} className={s.actionButton}>
                  <PaperPlaneOutline size={24} />
                </button>
              </div>

              <button type={'button'} aria-label={'Like'} className={s.actionButton}>
                <BookmarkOutline size={24} />
              </button>
            </div>
          )}

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
