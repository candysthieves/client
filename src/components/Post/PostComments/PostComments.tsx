import { Avatar, HeartOutline, Typography } from '@candy.thieves/ui-kit-lumos'
import type { Comment, Post } from '@/lib/model'
import { useProfile } from '@/lib/profile'
import s from './PostComments.module.scss'

type Props = {
  post: Post
  comments: Comment[]
}

export const PostComments = ({ post, comments }: Props) => {
  // TODO add userName and users avatar url (REFACTOR LATER)
  const { data: userProfileData } = useProfile(post.author.id)

  const descriptionComment: Comment | null = post.description
    ? {
        id: 'post-description',
        username: post.author.username, // check name (from user profile or from post comments)
        text: post.description,
        createdAt: '',
        avatarUrl: userProfileData?.avatarPreviewUrl?.url ?? '', // set avatarUrl (REFACTOR LATER)
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
    <div className={s.commentsBlock}>
      {descriptionComment && renderComment(descriptionComment, true)}

      {comments.length === 0 ? (
        <div className={s.emptyComments}>
          <Typography variant={'body2'}>No comments yet</Typography>

          <Typography variant={'caption1'} color={'var(--color-light-900)'}>
            Be the first to comment
          </Typography>
        </div>
      ) : (
        comments.map(comment => renderComment(comment))
      )}
    </div>
  )
}
