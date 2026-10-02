import { Button } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import type { ViewerStatus } from '@/lib/model'

type ProfileActionsProps = {
  status: ViewerStatus
  userId: string
}

export function ProfileActions({ status, userId }: ProfileActionsProps) {
  switch (status) {
    case 'owner':
      return (
        <Button as={Link} href={'/settings'} variant={'secondary'}>
          Profile Settings
        </Button>
      )

    case 'user':
      return null

    case 'friend':
      return <Button variant={'secondary'}>Remove friend</Button>
  }
}
