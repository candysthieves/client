import Skeleton from 'react-loading-skeleton'
import s from './MainPage.module.scss'

type MainPageSkeletonProps = {
  limit?: number
}

export function MainPageSkeleton({ limit = 4 }: MainPageSkeletonProps) {
  return (
    <div className={s.postsGrid} aria-busy>
      {Array.from({ length: limit }).map((_, index) => (
        <div key={index} className={s.postCardSkeleton}>
          <Skeleton height={240} style={{ borderRadius: '12px' }} />

          <div
            style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <Skeleton width={'40%'} height={'1.25rem'} />
            <Skeleton width={'80%'} height={'1rem'} />
          </div>
        </div>
      ))}
    </div>
  )
}
