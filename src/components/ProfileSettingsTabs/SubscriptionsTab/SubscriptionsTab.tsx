'use client'

import { CircularProgress } from '@candy.thieves/ui-kit-lumos'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { ToastError, ToastSuccess } from '@/components'
import { CheckoutForm } from '@/components/CheckoutForm'
import { CreatePaymentModal } from '@/components/CheckoutForm/CreatePaymentModal/CreatePaymentModal'
import { PaymentProcessedNotificationModal } from '@/components/CheckoutForm/PaymentProcessedNotificationModal/PaymentProcessedNotificationModal'
import { RedirectToPaymentServiceNotificationModal } from '@/components/CheckoutForm/RedirectToPaymentServiceNotificationModal/RedirectToPaymentServiceNotificationModal'
import { CurrentSubscription } from '@/components/CurrentSubscription'
import { PAYMENT_ERROR_TOAST, PAYMENT_SUCCESS_TOAST } from '@/constants'
import { ApiError } from '@/lib/api'
import { authKeys } from '@/lib/auth'
import { useAuth, usePaymentEvents } from '@/lib/hooks'
import { CreatePaymentState, PaymentSessionRequest, PaymentStatus } from '@/lib/model'
import { useCreatePayment } from '@/lib/payments'
import {
  isErrorResponse,
  isValidUrl,
  mapPaymentDomainError,
  mapPaymentValidationError,
} from '@/lib/utils'
import s from './SubscriptionsTab.module.scss'

export const initialPaymentState: CreatePaymentState = {
  provider: null,
  tariffId: '',
}

export const SubscriptionsTab = () => {
  const { user } = useAuth()
  const [paymentState, setPaymentState] = useState<CreatePaymentState>(initialPaymentState)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const [paymentSessionStatus, setPaymentSessionStatus] = useState<PaymentStatus>(null)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null)

  const { mutate: sendPaymentRequest, isPending: isPaymentSending } = useCreatePayment()
  const queryClient = useQueryClient()

  const openConfirm = () => setIsConfirmOpen(true)
  const closeConfirm = () => {
    setPaymentState(initialPaymentState)
    setIsConfirmOpen(false)
  }

  const closeRedirectToPaymentServiceNotification = () => setPaymentSessionStatus(null)
  const closePaymentProcessedNotification = () => setPaymentStatus(null)

  const onSubmitHandler = (data: PaymentSessionRequest) => {
    setPaymentState({
      provider: data.provider,
      tariffId: data.tariffId,
    })
    // Pass updated state data to confirm payment Modal window
    openConfirm()
  }

  const sendServicePaymentRequest = async () => {
    if (!paymentState.provider || !paymentState.tariffId) return

    const payload: PaymentSessionRequest = {
      provider: paymentState.provider,
      tariffId: paymentState.tariffId,
    }

    // Open payment service link in new tab
    const newWindow = window.open('', '_blank')

    sendPaymentRequest(payload, {
      onSuccess: data => {
        if (!isValidUrl(data.paymentUrl)) {
          newWindow?.close()
          closeConfirm()
          setPaymentSessionStatus('Error')
          return
        }

        // URL is valid -> redirect to this URL
        closeConfirm()
        setPaymentSessionStatus('Success')

        if (newWindow) {
          newWindow.location.href = data.paymentUrl
        } else {
          // If the new tab blocked by browser, open link in the current tab
          window.location.href = data.paymentUrl
        }
      },
      onError: error => {
        newWindow?.close()
        closeConfirm()
        setPaymentSessionStatus('Error')

        if (error instanceof ApiError && isErrorResponse(error.data)) {
          const isValidationError = mapPaymentValidationError(error)
          const isDomainError = mapPaymentDomainError(error)

          if (isValidationError) {
            ToastError({
              title: 'Validation Error',
              messages: error.data.errorsMessages,
            })
          } else if (isDomainError) {
            // Show domain errors
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

  // Invalidate GET meAuth, payments history requests when SSE message came with success,
  // then close RedirectToPaymentServiceNotificationModal window
  // and open PaymentProcessedNotificationModal
  const handlePaymentProcessed = useCallback(
    async (userId: string, status: string) => {
      if (userId !== user?.id) {
        return
      }

      if (status === 'Success') {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: authKeys.me() }),
          // queryClient.invalidateQueries({ queryKey: subscriptionKeys.costs(accountType) }), // delete
          // queryClient.invalidateQueries({ queryKey: subscriptionKeys.history() }), // TODO add later
        ])

        setPaymentStatus(status) // setPaymentStatus('Success') - move setPaymentStatus(status) under closeRedirectToPaymentServiceNotification()

        ToastSuccess({
          title: 'Success!',
          message: PAYMENT_SUCCESS_TOAST,
        })
      } else if (status === 'Error') {
        ToastError({
          title: 'Error!',
          messages: PAYMENT_ERROR_TOAST,
        })

        setPaymentStatus(status) // setPaymentStatus('Error') - move setPaymentStatus(status) under closeRedirectToPaymentServiceNotification()
      }

      closeRedirectToPaymentServiceNotification()
    },
    [queryClient, user?.id]
  )

  usePaymentEvents({ handlePaymentProcessed })

  return (
    <div className={s.subscriptionContent}>
      <CurrentSubscription />
      <CheckoutForm onSubmitAction={onSubmitHandler} />

      <RedirectToPaymentServiceNotificationModal
        open={!!paymentSessionStatus}
        status={paymentSessionStatus}
        onConfirm={closeRedirectToPaymentServiceNotification}
        onCloseClick={closeRedirectToPaymentServiceNotification}
      />

      <PaymentProcessedNotificationModal
        open={!!paymentStatus}
        status={paymentStatus}
        onConfirm={closePaymentProcessedNotification}
        onCloseClick={closePaymentProcessedNotification}
      />

      <CreatePaymentModal
        open={isConfirmOpen}
        isLoading={isPaymentSending}
        onConfirm={sendServicePaymentRequest}
        onCloseClick={isPaymentSending ? undefined : closeConfirm}
      />

      {isPaymentSending && (
        <CircularProgress size={'lg'} color={'success'} className={s.loadSpinner} />
      )}
    </div>
  )
}
