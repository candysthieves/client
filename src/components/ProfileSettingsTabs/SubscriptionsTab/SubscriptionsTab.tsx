'use client'

import { useState } from 'react'
import { CheckoutForm } from '@/components/CheckoutForm'
import { CreatePaymentModal } from '@/components/CheckoutForm/CreatePaymentModal/CreatePaymentModal'
import { NotificationModal } from '@/components/CheckoutForm/NotificationModal/NotificationModal'
import { CheckoutFormData, CreatePaymentState, PaymentService, PaymentStatus } from '@/lib/model'

export const initialPaymentState: CreatePaymentState = {
  paymentService: null,
  subscriptionData: null,
}

export const SubscriptionsTab = () => {
  const [paymentState, setPaymentState] = useState<CreatePaymentState>(initialPaymentState)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null)

  const openConfirm = () => setIsConfirmOpen(true)
  const closeConfirm = () => {
    setPaymentState(initialPaymentState)
    setIsConfirmOpen(false)
  }

  const closeNotification = () => setPaymentStatus(null)

  const onSubmitHandler = (data: CheckoutFormData, paymentProvider: PaymentService) => {
    setPaymentState({
      paymentService: paymentProvider,
      subscriptionData: data,
    })
    openConfirm()
    console.log(`Send request to ${paymentProvider}:`, data)
  }

  const sendServicePaymentRequest = async () => {
    if (!paymentState.paymentService || !paymentState.subscriptionData) return

    // TODO: add logic for payment service request sending
    // try {
    //   await createPayment({
    //     service: paymentState.paymentService,
    //     ...paymentState.subscriptionData,
    //   })
    //   setPaymentStatus('Success')
    // } catch {
    //   setPaymentStatus('Error')
    // }

    closeConfirm()
    console.log('sendServicePaymentRequest', paymentState)
  }

  return (
    <>
      <CheckoutForm onSubmit={onSubmitHandler} />

      <NotificationModal
        open={!!paymentStatus}
        status={paymentStatus}
        onConfirm={closeNotification}
        onCloseClick={closeNotification}
      />

      <CreatePaymentModal
        open={isConfirmOpen}
        onConfirm={sendServicePaymentRequest}
        onCloseClick={closeConfirm}
      />
    </>
  )
}
