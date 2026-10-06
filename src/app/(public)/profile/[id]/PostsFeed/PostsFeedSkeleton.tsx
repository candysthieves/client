import Skeleton from 'react-loading-skeleton'
import s from '../ProfileClient.module.scss'

type PostsFeedSkeletonProps = {
  count?: number
}

export function PostsFeedSkeleton({ count = 12 }: PostsFeedSkeletonProps) {
  return (
    <div className={s.postsGrid} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div className={s.postPreview} key={i}>
          <Skeleton className={s.skeletonFill} containerClassName={s.skeletonFillContainer} />
        </div>
      ))}
    </div>
  )
}
