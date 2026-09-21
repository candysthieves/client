import { PROFILE_POSTS_PAGE_SIZE } from '@/lib/api'
import s from './ProfileClient.module.scss'

export function ProfileSkeleton() {
  return (
    <div className={s.skeleton} aria-busy={'true'} aria-label={'Loading profile'}>
      <div className={s.skeletonAvatar} />
      <div className={s.skeletonContent}>
        <div className={s.skeletonLine} />
        <div className={s.skeletonLineShort} />
        <div className={s.skeletonText} />
      </div>
      <div className={s.skeletonGrid}>
        {Array.from({ length: PROFILE_POSTS_PAGE_SIZE }, (_, index) => (
          <div className={s.skeletonPost} key={index} />
        ))}
      </div>
    </div>
  )
}
