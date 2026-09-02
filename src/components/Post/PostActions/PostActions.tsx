import {
  BookmarkOutline,
  HeartOutline,
  MessageCircleOutline,
  PaperPlaneOutline,
} from '@candy.thieves/ui-kit-lumos'
import s from './PostActions.module.scss'

type Props = {
  showComments?: boolean
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
  onSave?: () => void
}

export const PostActions = ({
  showComments = false,
  onLike,
  onComment,
  onShare,
  onSave,
}: Props) => (
  <div className={s.actions}>
    <div className={s.leftActions}>
      <button type={'button'} aria-label={'Like'} className={s.actionButton} onClick={onLike}>
        <HeartOutline size={24} />
      </button>

      {showComments && (
        <button
          type={'button'}
          aria-label={'Comments'}
          className={s.actionButton}
          onClick={onComment}
        >
          <MessageCircleOutline size={24} />
        </button>
      )}

      <button type={'button'} aria-label={'Share'} className={s.actionButton} onClick={onShare}>
        <PaperPlaneOutline size={24} />
      </button>
    </div>

    <button type={'button'} aria-label={'Save'} className={s.actionButton} onClick={onSave}>
      <BookmarkOutline size={24} />
    </button>
  </div>
)
