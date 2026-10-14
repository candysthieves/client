'use client'

import { MainAvatar, Typography } from '@candy.thieves/ui-kit-lumos'
import type { UserProfile } from '@/lib/model'
import { ProfileActions } from '@/app/(public)/profile/[id]/ProfileActions/ProfileActions'
import s from './ProfileHeader.module.scss'

type ProfileHeaderProps = {
  profile: UserProfile
  userId: string
  isPersonalized: boolean
}

export function ProfileHeader({ profile, userId, isPersonalized }: ProfileHeaderProps) {
  return (
    <section className={s.profileHeader} aria-labelledby={'profile-name'}>
      <MainAvatar
        className={s.profileAvatar}
        userName={profile.username ?? userId}
        src={profile.avatarPreviewUrl?.url ?? ''}
        size={'xxl'}
        delayMs={0}
      />

      <div className={s.profileInfo}>
        <div className={s.profileTop}>
          <Typography id={'profile-name'} className={s.profileName} color={'white'} variant={'h1'}>
            {profile.username}
          </Typography>

          {isPersonalized && <ProfileActions status={profile.viewerStatus} />}
        </div>

        <dl className={s.stats}>
          <div className={s.stat}>
            <dd className={s.statValue}>{profile.publicationsCount ?? 0}</dd>

            <dt className={s.statLabel}>Publications</dt>
          </div>
        </dl>

        <Typography className={s.about} variant={'body1'}>
          {profile.description ?? ''}
        </Typography>
      </div>
    </section>
  )
}
