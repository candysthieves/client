import type { ViewerStatus } from '@/lib/model'
import { OwnerProfileActions } from '@/app/(public)/profile/[id]/ProfileActions'
import { ViewerProfileActions } from '@/app/(public)/profile/[id]/ProfileActions/ViewerProfileActions'

type ProfileActionsProps = {
  status: ViewerStatus
}

export function ProfileActions({ status }: ProfileActionsProps) {
  switch (status) {
    case 'owner':
      return <OwnerProfileActions />

    case 'user':
    case 'friend':
      return <ViewerProfileActions isFriend={status === 'friend'} />

    default:
      return null
  }
}
