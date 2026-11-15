import { Typography } from '@candy.thieves/ui-kit-lumos'
import s from './PaymentsTab.module.scss'

export const PaymentsError = () => {
  return (
    <section className={s.error} role={'alert'}>
      <Typography variant={'h2'} color={'var(--color-light-100)'} align={'center'}>
        {'Unable to load payment history'}
      </Typography>
      <Typography variant={'body1'} color={'var(--color-light-900)'} align={'center'}>
        {'Please try again later.'}
      </Typography>
    </section>
  )
}
