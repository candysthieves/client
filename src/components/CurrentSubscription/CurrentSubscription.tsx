import { Button, Cards, clsx, Tooltip, Typography } from '@candy.thieves/ui-kit-lumos'
import { ToastError, ToastSuccess } from '@/components'
import { CurrentSubscriptionSkeleton } from '@/components/CurrentSubscription/CurrentSubscriptionSkeleton'
import { SUBSCRIPTION_AUTO_RENEW_OFF_EXPIRED_MESSAGE } from '@/constants'
import { ApiError } from '@/lib/api'
import {
  CURRENT_SUBSCRIPTION_CANCEL_SUCCESS_MESSAGE,
  CURRENT_SUBSCRIPTION_CANCEL_SUCCESS_TITLE,
} from '@/lib/model'
import { useCancelCurrentSubscription } from '@/lib/subscriptions/mutations/useCancelCurrentSubscription'
import { useCurrentSubscription } from '@/lib/subscriptions/queries/useCurrentSubscription'
import { formatDate, isErrorResponse } from '@/lib/utils'
import { mapCurrentSubscriptionDomainError } from '@/lib/utils/mapCurrentSubscriptionDomainError'
import s from './CurrentSubscription.module.scss'

export const CurrentSubscription = () => {
  const { data: currentSubscription, isLoading: isCurrentSubscriptionLoading } =
    useCurrentSubscription()
  const { mutate: cancelCurrentSubscription, isPending: isCurrentSubscriptionCanceling } =
    useCancelCurrentSubscription()

  const isLoading = isCurrentSubscriptionLoading || isCurrentSubscriptionCanceling

  const activeSubscription = currentSubscription?.expirationDate
  const autoRenewableSubscription = currentSubscription?.nextChangeDate

  if (isLoading) return <CurrentSubscriptionSkeleton />
  if (!activeSubscription) return null

  const formattedSubscriptionExpirationDate = formatDate(currentSubscription?.expirationDate, {
    timeZone: 'UTC',
  })

  const formattedSubscriptionNextPaymentDate = formatDate(autoRenewableSubscription, {
    fallback: '\u2014',
    timeZone: 'UTC',
  })

  const disabledSubscriptionAutoRenew = () => {
    cancelCurrentSubscription(undefined, {
      onSuccess: () => {
        ToastSuccess({
          title: CURRENT_SUBSCRIPTION_CANCEL_SUCCESS_TITLE,
          message: CURRENT_SUBSCRIPTION_CANCEL_SUCCESS_MESSAGE,
        })
      },
      onError: error => {
        if (error instanceof ApiError && isErrorResponse(error.data)) {
          const isDomainError = mapCurrentSubscriptionDomainError(error)

          if (isDomainError) {
            ToastError({
              title: 'Domain Error',
              messages: error.data.errorsMessages,
            })
          }
          return
        }
        ToastError({ messages: 'Something went wrong. Please try again.' })
      },
    })
  }

  const tooltipMessage = !autoRenewableSubscription
    ? `${SUBSCRIPTION_AUTO_RENEW_OFF_EXPIRED_MESSAGE} ${formattedSubscriptionExpirationDate}`
    : ''

  return (
    <div className={s.currentSubscription}>
      <Typography
        className={s.title}
        variant={'h3'}
        color={'var(--color-light-100)'}
        mb={'0.375rem'}
      >
        Current Subscription:
      </Typography>

      <Cards className={s.subscriptionDates}>
        <div className={s.dateItem}>
          <Typography variant={'body1'} color={'var(--color-light-900)'}>
            Expire at
          </Typography>
          <Typography variant={'caption2'} color={'var(--color-light-100)'}>
            {formattedSubscriptionExpirationDate}
          </Typography>
        </div>

        <div className={s.dateItem}>
          <Typography
            variant={'body1'}
            color={autoRenewableSubscription ? 'var(--color-light-900)' : 'var(--color-danger-500)'}
          >
            Next payment
          </Typography>
          <Typography variant={'caption2'} color={'var(--color-light-100)'} className={s.dateValue}>
            {autoRenewableSubscription ? formattedSubscriptionNextPaymentDate : '\u2014'}
          </Typography>
        </div>
      </Cards>

      <Tooltip content={tooltipMessage}>
        <div className={clsx(!autoRenewableSubscription && s.disabled)}>
          <Button
            id={'autoRenewalCheckbox'}
            variant={autoRenewableSubscription ? 'primary' : 'outlined'}
            color={'var(--color-light-100)'}
            onClick={disabledSubscriptionAutoRenew}
            disabled={!autoRenewableSubscription || isLoading}
          >
            {autoRenewableSubscription ? 'Auto - Renewal enabled' : 'Auto - Renewal disabled'}
          </Button>
        </div>
      </Tooltip>
    </div>
  )
}
