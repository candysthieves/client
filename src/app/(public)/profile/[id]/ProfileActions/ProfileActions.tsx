import type { ViewerStatus } from '@/lib/model'
import {
  OwnerProfileActions,
  UserProfileActions,
  FriendProfileActions,
} from '@/app/(public)/profile/[id]/ProfileActions'

type ProfileActionsProps = {
  status: ViewerStatus
}

export function ProfileActions({ status }: ProfileActionsProps) {
  switch (status) {
    case 'owner':
      return <OwnerProfileActions />

    case 'user':
      return <UserProfileActions />

    case 'friend':
      return <FriendProfileActions />
  }
}
