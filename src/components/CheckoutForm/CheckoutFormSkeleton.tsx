import { Cards } from '@candy.thieves/ui-kit-lumos'
import Skeleton from 'react-loading-skeleton'
import s from './CheckoutForm.module.scss'

export const AccountFormSkeleton = () => {
  return (
    <div className={s.subscriptionForm}>
      {/* Account type */}
      <div className={s.accountContent}>
        <Skeleton className={s.title} width={110} height={25} />

        <Cards className={s.subscriptionRadioSkeleton}>
          <div className={s.options}>
            <Skeleton width={140} height={28} borderRadius={4} />
            <Skeleton width={140} height={28} borderRadius={4} />
          </div>
        </Cards>
      </div>
    </div>
  )
}

export const CostsFormSkeleton = () => {
  return (
    <div className={s.costsForm}>
      {/* Subscription costs */}
      <div className={s.costsContent}>
        <Skeleton className={s.title} width={190} height={25} />

        <Cards className={s.subscriptionRadio}>
          <div className={s.options}>
            <Skeleton width={140} height={28} borderRadius={4} />
            <Skeleton width={140} height={28} borderRadius={4} />
            <Skeleton width={140} height={28} borderRadius={4} />
            <Skeleton width={140} height={28} borderRadius={4} />
            <Skeleton width={140} height={28} borderRadius={4} />
            <Skeleton width={140} height={28} borderRadius={4} />
          </div>
        </Cards>
      </div>

      {/* Payment providers */}
      <div className={s.subscriptionControls}>
        <Skeleton width={65} height={45} borderRadius={6} />
        <Skeleton width={24} height={16} />
        <Skeleton width={65} height={45} borderRadius={6} />
      </div>
    </div>
  )
}
