import { Cards, Typography } from '@candy.thieves/ui-kit-lumos'
import { SubscriptionHistoryItem } from '@/lib/model'
import { formatPaymentDate, formatPrice } from '@/lib/utils'
import s from './PaymentsTab.module.scss'

type PaymentsListMobileProps = {
  items: SubscriptionHistoryItem[]
}

export const PaymentsListMobile = ({ items }: PaymentsListMobileProps) => {
  return (
    <div className={s.cardsWrapper}>
      {items.map(item => (
        <Cards className={s.card} key={item.id}>
          <div className={s.cardRow}>
            <Typography variant={'body2'} color={'var(--color-light-100)'}>
              {'Date of payment:'}
            </Typography>
            <Typography variant={'body3'} color={'var(--color-light-100)'}>
              {formatPaymentDate(item.paymentDate)}
            </Typography>
          </div>

          <div className={s.cardRow}>
            <Typography variant={'body2'} color={'var(--color-light-100)'}>
              {'End date of subscription:'}
            </Typography>
            <Typography variant={'body3'} color={'var(--color-light-100)'}>
              {formatPaymentDate(item.subscriptionEndDate)}
            </Typography>
          </div>

          <div className={s.cardRow}>
            <Typography variant={'body2'} color={'var(--color-light-100)'}>
              {'Subscription type:'}
            </Typography>
            <Typography variant={'body3'} color={'var(--color-light-100)'}>
              {item.subscriptionName}
            </Typography>
          </div>

          <div className={s.cardRow}>
            <Typography variant={'body2'} color={'var(--color-light-100)'}>
              {'Price'}
            </Typography>
            <Typography variant={'body3'} color={'var(--color-light-100)'}>
              {formatPrice(item.priceInMinorUnits, item.currency)}
            </Typography>
          </div>

          <div className={s.cardRow}>
            <Typography variant={'body2'} color={'var(--color-light-100)'}>
              {'Payment Type:'}
            </Typography>
            <Typography variant={'body3'} color={'var(--color-light-100)'}>
              {item.paymentService}
            </Typography>
          </div>
        </Cards>
      ))}
    </div>
  )
}
