import { Button } from '@candy.thieves/ui-kit-lumos'
import s from './ProfileActions.module.scss'

export function FriendProfileActions() {
  return (
    <div className={s.actions}>
      <Button onClick={() => {}} variant={'outlined'}>
        Unfollow
      </Button>
      <Button onClick={() => {}} variant={'secondary'}>
        Send Message
      </Button>
    </div>
  )
}
