import { Cards, Checkbox, Tooltip, Typography } from '@candy.thieves/ui-kit-lumos'
import { ToastError, ToastSuccess } from '@/components'
import {
  SUBSCRIPTION_AUTO_RENEW_OFF_EXPIRED_MESSAGE,
  SUBSCRIPTION_AUTO_RENEW_OFF_MESSAGE,
} from '@/constants'
import { ApiError } from '@/lib/api'
import {
  CURRENT_SUBSCRIPTION_CANCEL_SUCCESS_MESSAGE,
  CURRENT_SUBSCRIPTION_CANCEL_SUCCESS_TITLE,
} from '@/lib/model'
import { useCancelCurrentSubscription } from '@/lib/subscriptions/mutations/useCancelCurrentSubscription'
import { useCurrentSubscription } from '@/lib/subscriptions/queries/useCurrentSubscription'
import { isErrorResponse } from '@/lib/utils'
import { mapCurrentSubscriptionDomainError } from '@/lib/utils/mapCurrentSubscriptionDomainError'
import s from './CurrentSubscription.module.scss'

export const CurrentSubscription = () => {
  const { data: currentSubscription, isLoading: isCurrentSubscriptionLoading } =
    useCurrentSubscription()
  const { mutate: cancelCurrentSubscription, isPending: isCurrentSubscriptionCanceling } =
    useCancelCurrentSubscription()

  const isLoading = isCurrentSubscriptionLoading || isCurrentSubscriptionCanceling

  const isActiveSubscription = currentSubscription?.expirationDate
  const isAutoRenewableSubscription = currentSubscription?.nextChangeDate

  // const isActiveSubscription = '22.12.2002'
  // const isAutoRenewableSubscription = false
  // const isAutoRenewableSubscription = '23.12.2002'

  if (isLoading) return <div>Загрузка подписки...</div>
  if (!isActiveSubscription) return null

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

  const tooltipMessage = !isAutoRenewableSubscription
    ? `${SUBSCRIPTION_AUTO_RENEW_OFF_EXPIRED_MESSAGE} ${isActiveSubscription}`
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
            {isActiveSubscription}
          </Typography>
        </div>

        <div className={s.dateItem}>
          <Typography
            variant={'body1'}
            color={
              isAutoRenewableSubscription ? 'var(--color-light-900)' : 'var(--color-danger-500)'
            }
          >
            Next payment
          </Typography>
          <Typography variant={'caption2'} color={'var(--color-light-100)'}>
            {isAutoRenewableSubscription
              ? isAutoRenewableSubscription
              : SUBSCRIPTION_AUTO_RENEW_OFF_MESSAGE}
          </Typography>
        </div>
      </Cards>

      <Tooltip content={tooltipMessage}>
        <Checkbox
          id={'autoRenewalCheckbox'}
          label={'Auto - Renewal'}
          disabled={!isAutoRenewableSubscription || isLoading}
          checked={!!isAutoRenewableSubscription}
          onCheckedChange={disabledSubscriptionAutoRenew}
          className={s.renewalCheckbox}
        />
      </Tooltip>
    </div>
  )
}
