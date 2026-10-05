import {
  AddFriendButton,
  MessageButton,
  RemoveFriendButton,
} from '@/app/(public)/profile/[id]/ProfileActions/buttons'
import s from './ProfileActions.module.scss'

type ViewerProfileActionsProps = {
  isFriend: boolean
}

export function ViewerProfileActions({ isFriend }: ViewerProfileActionsProps) {
  return (
    <div className={s.actions}>
      {isFriend ? <RemoveFriendButton /> : <AddFriendButton />}
      <MessageButton />
    </div>
  )
}
