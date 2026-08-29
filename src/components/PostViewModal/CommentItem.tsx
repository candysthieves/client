import { Avatar, Typography } from '@candy.thieves/ui-kit-lumos'
import s from './PostViewModal.module.scss'

type CommentItemProps = {
  username: string
  text: string
  timeAgo: string
  avatarUrl?: string
  answersCount?: number
}

export const CommentItem = ({
  username,
  text,
  timeAgo,
  avatarUrl,
  answersCount,
}: CommentItemProps) => (
  <div className={s.comment}>
    <Avatar delayMs={0} size={'s'} src={avatarUrl} userName={username} />

    <div className={s.commentBody}>
      <Typography className={s.commentText} variant={'subtitle2'}>
        {username}&nbsp;
      </Typography>

      <Typography className={s.commentText} variant={'body1'}>
        {text}
      </Typography>

      <div className={s.commentMeta}>
        <Typography color={'var(--color-light-900)'} variant={'caption1'}>
          {timeAgo}
        </Typography>
      </div>

      {answersCount ? (
        <Typography className={s.answers} color={'var(--color-light-900)'} variant={'caption2'}>
          — View Answers ({answersCount})
        </Typography>
      ) : null}
    </div>
  </div>
)
