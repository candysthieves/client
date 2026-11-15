import { BillPay, Typography } from '@candy.thieves/ui-kit-lumos'
import s from './PaymentsTab.module.scss'

export const PaymentsEmptyState = () => {
  return (
    <section className={s.empty} aria-label={'Payment history'}>
      <BillPay size={48} color={'var(--color-dark-300)'} />

      <Typography
        className={s.emptyTitle}
        variant={'h2'}
        color={'var(--color-light-100)'}
        align={'center'}
      >
        {'No payments yet'}
      </Typography>

      <Typography variant={'body1'} color={'var(--color-light-900)'} align={'center'}>
        {'Your payment history will appear here.'}
      </Typography>
    </section>
  )
}
