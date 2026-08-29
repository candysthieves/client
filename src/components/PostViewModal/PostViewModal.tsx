'use client'

import {
  Avatar,
  AvatarBlock,
  Carousel,
  Modal,
  Scroll,
  Typography,
} from '@candy.thieves/ui-kit-lumos'
import type { MockPost } from '@/components/MainPage/mockPosts'
import { CommentItem } from './CommentItem'
import s from './PostViewModal.module.scss'

type PostViewModalProps = {
  post: MockPost | null
  onClose: () => void
}

export const PostViewModal = ({ post, onClose }: PostViewModalProps) => {
  if (!post) {
    return null
  }

  return (
    <Modal closeButtonOutside fullSize onClose={onClose} open size={'xl'}>
      <div className={s.container}>
        <div className={s.imageArea}>
          <Carousel controlsSize={'l'} slides={post.images} />
        </div>

        <div className={s.info}>
          <div className={s.header}>
            <Avatar delayMs={0} size={'s'} userName={post.username} />
            <Typography variant={'subtitle2'}>{post.username}</Typography>
          </div>

          <div className={s.commentsArea}>
            <Scroll orientation={'vertical'}>
              <div className={s.commentsList}>
                <CommentItem text={post.caption} timeAgo={post.timeAgo} username={post.username} />

                {post.comments.map(comment => (
                  <CommentItem key={comment.id} {...comment} />
                ))}
              </div>
            </Scroll>
          </div>

          <div className={s.footer}>
            <div className={s.likes}>
              <AvatarBlock users={post.likedByUsers} />

              <Typography variant={'body2'}>
                {post.likesCount.toLocaleString('en-US')} &quot;Like&quot;
              </Typography>
            </div>

            <Typography color={'var(--color-light-900)'} variant={'caption1'}>
              {post.date}
            </Typography>
          </div>
        </div>
      </div>
    </Modal>
  )
}
