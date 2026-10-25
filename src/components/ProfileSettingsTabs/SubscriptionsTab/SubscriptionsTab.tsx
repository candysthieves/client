'use client'

import { CircularProgress } from '@candy.thieves/ui-kit-lumos'
import { useState } from 'react'
import { ToastError } from '@/components'
import { CheckoutForm } from '@/components/CheckoutForm'
import { CreatePaymentModal } from '@/components/CheckoutForm/CreatePaymentModal/CreatePaymentModal'
import { NotificationModal } from '@/components/CheckoutForm/NotificationModal/NotificationModal'
import { CurrentSubscription } from '@/components/CurrentSubscription'
import { ApiError } from '@/lib/api'
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
  const [paymentState, setPaymentState] = useState<CreatePaymentState>(initialPaymentState)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null)
  const { mutate: sendPaymentRequest, isPending: isPaymentSending } = useCreatePayment()

  const openConfirm = () => setIsConfirmOpen(true)
  const closeConfirm = () => {
    setPaymentState(initialPaymentState)
    setIsConfirmOpen(false)
  }

  const closeNotification = () => setPaymentStatus(null)

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
          setPaymentStatus('Error')
          return
        }

        // URL is valid -> redirect to this URL
        closeConfirm()
        setPaymentStatus('Success')

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
        setPaymentStatus('Error')

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

  return (
    <div className={s.subscriptionContent}>
      <CurrentSubscription />
      <CheckoutForm onSubmitAction={onSubmitHandler} />

      <NotificationModal
        open={!!paymentStatus}
        status={paymentStatus}
        onConfirm={closeNotification}
        onCloseClick={closeNotification}
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
