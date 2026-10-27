import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { UniversalLottie } from '@/components/UniversalLottie'
import s from './payment-result.module.scss'

export default function PaymentResult() {
  return (
    <main className={s.paymentResultContainer}>
      <div className={s.paymentResultContent}>
        <Typography variant={'h1'} className={s.title}>
          Thank you!
        </Typography>

        <Typography variant={'body1'} color={'var(--color-light-900)'} className={s.description}>
          We&apos;ve received your request. Your payment status will be confirmed shortly. This may
          take a few moments.
        </Typography>

        <UniversalLottie animationName={'payment'} className={s.animationWrapper} />
        <div className={s.actions}>
          <Button as={Link} href={'/settings?part=subscriptions'} variant={'primary'}>
            Try again
          </Button>
          <Button as={Link} href={'/'} variant={'outlined'}>
            Go to home
          </Button>
        </div>
      </div>
    </main>
  )
}
