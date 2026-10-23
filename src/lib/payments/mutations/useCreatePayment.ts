import { useMutation } from '@tanstack/react-query'
import { createPayment } from '@/lib/api'
import { PaymentSessionRequest, PaymentSessionResponse } from '@/lib/model'

export const useCreatePayment = () => {
  return useMutation<PaymentSessionResponse, Error, PaymentSessionRequest>({
    mutationFn: paymentData => createPayment(paymentData),

    // onSuccess: (data) => console.log('Success!', data),
    // onError: (error) => console.error('Error', error),
  })
}
