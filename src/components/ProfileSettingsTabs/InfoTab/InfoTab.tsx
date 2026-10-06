'use client'

import { ProfileAvatarEditor } from '@/components/ProfileAvatarEditor'
import { TestLocationForm } from '@/components/ProfileLocationSelect/TestLocationForm'
import { useAuth } from '@/lib/hooks'
import { useProfile } from '@/lib/profile'
import s from './InfoTab.module.scss'

export const InfoTab = () => {
  // TODO: use here getMyProfile instead of next two qeuries:
  const { user } = useAuth()
  const {
    data: TEMPORARY_PROFILE_DATA,
    // isError: _isProfileError,
    // isLoading: _isProfileLoading,
  } = useProfile(user?.id ?? '')

  return (
    <div className={s.infoContainer}>
      <div className={s.column}>
        <ProfileAvatarEditor avatarSource={TEMPORARY_PROFILE_DATA?.avatarUrl?.url ?? null} />
      </div>
      {/*  TODO: add here profile general information form (change SCSS styles)*/}
      <div className={s.column}>
        <TestLocationForm />
      </div>
    </div>
  )
}
