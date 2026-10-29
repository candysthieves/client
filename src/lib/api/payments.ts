import { requestValidated } from '@/lib/api/requestValidated'
import {
  PaymentSessionRequest,
  PaymentSessionResponse,
  paymentSessionResponseSchema,
} from '@/lib/model'

export const createPayment = (
  paymentData: PaymentSessionRequest
): Promise<PaymentSessionResponse> =>
  requestValidated('/payments', paymentSessionResponseSchema, {
    method: 'POST',
    body: JSON.stringify(paymentData),
  })
