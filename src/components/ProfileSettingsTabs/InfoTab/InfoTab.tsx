'use client'

import { ProfileAvatarEditor } from '@/components/ProfileAvatarEditor'
import { useAvatar } from '@/lib/avatar'
import { useMyProfile } from '@/lib/profile'
import { GeneralInformationForm } from './GeneralInformationForm'

export const InfoTab = () => {
  // Load errors are reported by the global query error handler (showGlobalError).
  const { data: profile, isPending: isProfileLoading } = useMyProfile()
  // my-profile response has no avatar, so the initial photo comes from /users/my-avatar.
  const { data: avatar } = useAvatar()

  return (
    <GeneralInformationForm
      profile={profile}
      isProfileLoading={isProfileLoading}
      photoSlot={<ProfileAvatarEditor avatarSource={avatar?.avatarUrl?.url ?? null} />}
    />
  )
}
