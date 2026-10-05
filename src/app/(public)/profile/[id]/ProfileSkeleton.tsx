import Skeleton from 'react-loading-skeleton'
import s from './ProfilePostSkeleton.module.scss'

interface ProfilePostSkeletonProps {
  variant: 'posts-grid' | 'profile'
  count?: number
}

export function ProfileSkeleton({ variant, count = 1 }: ProfilePostSkeletonProps) {
  // 1. Скелетон для Шапки Профиля
  if (variant === 'profile') {
    return (
      <div className={s.profileHeaderSkeleton}>
        {/* Аватар */}
        <div className={s.avatarSkeleton}>
          <Skeleton circle height={'100%'} width={'100%'} />
        </div>

        {/* Инфо (Имя, Кнопки, Статистика, О себе) */}
        <div className={s.infoSkeleton}>
          <div className={s.topSkeleton}>
            <Skeleton width={'40%'} height={'2rem'} />
            {/* Имитируем максимальное состояние (место под две кнопки) */}
            <div className={s.buttonsSkeletonGroup}>
              <Skeleton width={'7rem'} height={'2.25rem'} />
              <Skeleton width={'8rem'} height={'2.25rem'} />
            </div>
          </div>

          <div className={s.statsSkeleton}>
            <Skeleton
              width={'4rem'}
              height={'1.5rem'}
              count={3}
              containerClassName={s.statsContainer}
            />
          </div>

          <div className={s.aboutSkeleton}>
            <Skeleton width={'7rem'} height={'1.2rem'} style={{ marginBottom: '0.5rem' }} />
            <Skeleton count={2} width={'100%'} />
          </div>
        </div>
      </div>
    )
  }

  // 2. Скелетон для Сетки Постов Профиля
  if (variant === 'posts-grid') {
    return (
      <div className={s.postsGridSkeleton}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={s.postPreviewSkeleton}>
            <Skeleton
              height={'100%'}
              width={'100%'}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        ))}
      </div>
    )
  }

  // 3. Скелетон для Ленты Новостей (Feed)
  // return (
  //   <div className={s.feedContainerSkeleton}>
  //     {Array.from({ length: count }).map((_, index) => (
  //       <div key={index} className={s.feedItemSkeleton}>
  //         <div className={s.feedHeaderSkeleton}>
  //           <Skeleton circle width={40} height={40} />
  //           <Skeleton width="30%" height={16} />
  //         </div>
  //         <Skeleton height={300} style={{ margin: '1rem 0' }} />
  //         <Skeleton count={2} />
  //       </div>
  //     ))}
  //   </div>
  // )
}
