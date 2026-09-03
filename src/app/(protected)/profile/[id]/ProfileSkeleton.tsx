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
        {Array.from({ length: 8 }, (_, index) => (
          <div className={s.skeletonPost} key={index} />
        ))}
      </div>
    </div>
  )
}
