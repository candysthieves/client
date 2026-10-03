import { Button } from '@candy.thieves/ui-kit-lumos'
import s from './ProfileActions.module.scss'

export function UserProfileActions() {
  return (
    <div className={s.actions}>
      <Button onClick={() => {}} variant={'primary'}>
        Follow
      </Button>
      <Button onClick={() => {}} variant={'secondary'}>
        Send Message
      </Button>
    </div>
  )
}
