import Skeleton from 'react-loading-skeleton'
import { ProfileActionsSkeleton } from '@/app/(public)/profile/[id]/ProfileActions/ProfileActionsSkeleton'
import s from '../ProfileClient.module.scss'

type ProfileHeaderSkeletonProps = {
  userId: string
}

export function ProfileHeaderSkeleton({ userId }: ProfileHeaderSkeletonProps) {
  return (
    <section className={s.profileHeader} aria-busy>
      <Skeleton circle className={s.skeletonFill} containerClassName={s.profileAvatar} />

      <div className={s.profileInfo}>
        <div className={s.profileTop}>
          <Skeleton width={'40%'} height={'2rem'} />
          <ProfileActionsSkeleton userId={userId} />
        </div>

        <div className={s.stats}>
          <Skeleton width={'5rem'} height={'2.5rem'} />
        </div>

        <div className={s.about}>
          <Skeleton width={'7rem'} containerClassName={s.aboutLabel} />
          <Skeleton count={2} />
        </div>
      </div>
    </section>
  )
}
