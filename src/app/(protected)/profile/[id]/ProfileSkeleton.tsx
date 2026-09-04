import s from './ProfileClient.module.scss'

const PROFILE_SKELETON_POSTS_COUNT = 8

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
        {Array.from({ length: PROFILE_SKELETON_POSTS_COUNT }, (_, index) => (
          <div className={s.skeletonPost} key={index} />
        ))}
      </div>
    </div>
  )
}
