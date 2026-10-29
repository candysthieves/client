import { Cards, clsx } from '@candy.thieves/ui-kit-lumos'
import Skeleton from 'react-loading-skeleton'
import s from './CurrentSubscription.module.scss'

export const CurrentSubscriptionSkeleton = () => {
  return (
    <div className={s.currentSubscriptionSkeleton}>
      <Skeleton className={s.title} width={240} height={20} />

      <Cards className={clsx(s.subscriptionDates, s.subscriptionDatesSkeleton)}>
        <div className={s.dateItem}>
          <Skeleton width={90} height={18} />
          <Skeleton width={120} height={16} />
        </div>

        <div className={s.dateItem}>
          <Skeleton width={90} height={18} />
          <Skeleton width={120} height={16} />
        </div>
      </Cards>

      <Skeleton className={s.button} width={235} height={40} />
    </div>
  )
}
