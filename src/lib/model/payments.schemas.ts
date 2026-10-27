import { z } from 'zod'

export const paymentServiceSchema = z.enum(['YOOKASSA', 'STRIPE'])

export const paymentStatusSchema = z.enum(['Error', 'Success']).nullable()

export const paymentSessionRequestSchema = z.object({
  tariffId: z.string(),
  provider: paymentServiceSchema,
})

export const createPaymentStateSchema = paymentSessionRequestSchema.extend({
  provider: paymentSessionRequestSchema.shape.provider.nullable(),
})

export const paymentSessionResponseSchema = z.object({
  paymentId: z.string(),
  paymentUrl: z.url({ protocol: /^https?$/ }),
})

export const paymentErrorFieldSchema = z.enum(['provider', 'token', 'tariffId'])

export const paymentProcessedEventSchema = z.object({
  userId: z.string('Invalid userID format in payment processed SSE response'),
  status: z.string('Invalid status format in payment processed SSE response'), // TODO change later
})
