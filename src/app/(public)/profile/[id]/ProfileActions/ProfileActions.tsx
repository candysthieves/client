import type { ViewerStatus } from '@/lib/model'
import { OwnerProfileActions } from '@/app/(public)/profile/[id]/ProfileActions/OwnerProfileActions/OwnerProfileActions'
import { UserProfileActions } from '@/app/(public)/profile/[id]/ProfileActions/UserProfileActions/UserProfileActions'

type ProfileActionsProps = {
  status: ViewerStatus
}

export function ProfileActions({ status }: ProfileActionsProps) {
  switch (status) {
    case 'owner':
      return <OwnerProfileActions />

    case 'user':
      return <UserProfileActions />
  }
}
