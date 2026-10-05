import { Button } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import s from './ProfileActions.module.scss'

export function OwnerProfileActions() {
  return (
    <div className={s.buttons}>
      <Button as={Link} href={'/settings'} variant={'secondary'}>
        Profile Settings
      </Button>
    </div>
  )
}
