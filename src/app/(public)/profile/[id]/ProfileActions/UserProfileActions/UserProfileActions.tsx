import { Button } from '@candy.thieves/ui-kit-lumos'
import s from './UserProfileActions.module.scss'

export function UserProfileActions() {
  return (
    <div className={s.actions}>
      <Button variant={'primary'}>Follow</Button>
      <Button variant={'secondary'}>Send Message</Button>
    </div>
  )
}
