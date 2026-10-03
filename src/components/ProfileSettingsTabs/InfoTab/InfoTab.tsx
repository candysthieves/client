'use client'

import { ProfileAvatarEditor } from '@/components/ProfileAvatarEditor'
import { useAuth } from '@/lib/hooks'
import { useProfile } from '@/lib/profile'

export const InfoTab = () => {
  // TODO: use here getMyProfile instead of next two qeuries:
  const { user } = useAuth()
  const {
    data: TEMPORARY_PROFILE_DATA,
    // isError: _isProfileError,
    // isLoading: _isProfileLoading,
  } = useProfile(user?.id ?? '')

  return (
    <div>
      <ProfileAvatarEditor avatarSource={TEMPORARY_PROFILE_DATA?.avatarUrl?.url ?? null} />
      {/*  TODO: add here profile general information form */}
    </div>
  )
}
