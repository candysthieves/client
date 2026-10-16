'use client'

import { useState } from 'react'
import { CheckoutForm } from '@/components/CheckoutForm'
import { CreatePaymentModal } from '@/components/CheckoutForm/CreatePaymentModal/CreatePaymentModal'
import { CheckoutFormData, CreatePaymentState, PaymentService } from '@/lib/model'

export const initialPaymentState: CreatePaymentState = {
  paymentService: null,
  subscriptionData: null,
}

export const SubscriptionsTab = () => {
  const [paymentState, setPaymentState] = useState<CreatePaymentState>(initialPaymentState)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const openConfirm = () => setIsConfirmOpen(true)
  const closeConfirm = () => {
    setPaymentState(initialPaymentState)
    setIsConfirmOpen(false)
  }

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
    // await createPayment({
    //   service: paymentState.paymentService,
    //   ...paymentState.subscriptionData,
    // })

    closeConfirm()
    console.log('sendServicePaymentRequest', paymentState)
  }

  return (
    <>
      <CheckoutForm onSubmit={onSubmitHandler} />

      <CreatePaymentModal
        open={isConfirmOpen}
        onCloseClick={closeConfirm}
        onConfirm={sendServicePaymentRequest}
      />
    </>
  )
}
