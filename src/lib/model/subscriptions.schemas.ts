import { z } from 'zod'
import { accountTypeSchema } from '@/lib/model/auth.schemas'

export const subscriptionTypeSchema = z.enum(
  ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Test', ''],
  {
    error: 'Please select a subscription plan',
  }
)

export const checkoutSchema = z.object({
  accountType: accountTypeSchema,
  subscriptionPlan: subscriptionTypeSchema,
})

export const currencyTypeSchema = z.enum(['USD', 'EUR', 'RUB'])
export const priceUnitTypeSchema = z.enum(['CENT', 'KOPECK'])

export const availableAccountTypeSchema = z.object({
  type: accountTypeSchema,
})

export const availableAccountTypesResponseSchema = z.array(availableAccountTypeSchema)

export const subscriptionSchema = z.object({
  id: z.string(),
  tariff_name: subscriptionTypeSchema, // 'Daily', 'Weekly', 'Monthly'
  durationDays: z.number().positive(),
  price: z.number().int().positive(),
  currency: currencyTypeSchema, // 'USD', 'EUR', 'RUB'
})

export const subscriptionsResponseSchema = z.array(subscriptionSchema)

export const paymentServiceSchema = z.enum(['Yookassa', 'Stripe'])

export const createPaymentStateSchema = z.object({
  paymentService: paymentServiceSchema.nullable(),
  subscriptionData: checkoutSchema.nullable(),
})

export const paymentStatusSchema = z.enum(['Error', 'Success']).nullable()

export const subscriptionHistoryPaymentServiceSchema = z.enum(['STRIPE', 'YOOKASSA'])
export const subscriptionHistoryStatusSchema = z.enum([
  'pending',
  'succeeded',
  'canceled',
  'failed',
])

export const subscriptionHistoryItemSchema = z.object({
  id: z.string(),
  paymentDate: z.string().nullable(),
  subscriptionEndDate: z.string().nullable(),
  price: z.number().int().nonnegative(),
  currency: currencyTypeSchema,
  subscriptionName: subscriptionTypeSchema,
  subscriptionType: accountTypeSchema,
  paymentService: subscriptionHistoryPaymentServiceSchema,
  status: subscriptionHistoryStatusSchema,
})

export const subscriptionHistoryResponseSchema = z.object({
  items: z.array(subscriptionHistoryItemSchema),
  totalCount: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
})
