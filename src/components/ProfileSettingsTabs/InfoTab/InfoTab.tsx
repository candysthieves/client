'use client'

import { ProfileAvatarEditor } from '@/components/ProfileAvatarEditor'
import { useAvatar } from '@/lib/avatar'
import { useMyProfile } from '@/lib/profile'
import { GeneralInformationForm } from './GeneralInformationForm'
import s from './InfoTab.module.scss'

export const InfoTab = () => {
  // Load errors are reported by the global query error handler (showGlobalError).
  const { data: profile, isPending: isProfileLoading } = useMyProfile()
  // my-profile response has no avatar, so the initial photo comes from /users/my-avatar.
  const { data: avatar } = useAvatar()

  return (
    <div className={s.layout}>
      <div className={s.photo}>
        <ProfileAvatarEditor avatarSource={avatar?.avatarUrl?.url ?? null} />
      </div>

      <GeneralInformationForm profile={profile} isProfileLoading={isProfileLoading} />

      <div className={s.divider} />
    </div>
  )
}
