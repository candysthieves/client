import { Button } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'

export function OwnerProfileActions() {
  return (
    <Button as={Link} href={'/settings'} variant={'secondary'}>
      Profile Settings
    </Button>
  )
}
