import { z } from 'zod'
import { accountTypeSchema } from '@/lib/model/auth.schemas'
import { paymentServiceSchema } from '@/lib/model/payments.schemas'

export const subscriptionTypeSchema = z.enum(
  ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Test', ''],
  {
    error: 'Please select a subscription plan',
  }
)

export const checkoutSchema = z.object({
  accountType: accountTypeSchema,
  tariff: subscriptionTypeSchema,
})

export const currencyTypeSchema = z.enum(['USD', 'EUR', 'RUB'])

export const availableAccountTypeSchema = z.object({
  type: accountTypeSchema,
})

export const availableAccountTypesResponseSchema = z.array(availableAccountTypeSchema)

export const subscriptionSchema = z.object({
  id: z.string(),
  tariff_name: subscriptionTypeSchema,
  durationDays: z.number().positive(),
  price: z.number().int().positive(),
  currency: currencyTypeSchema,
})

export const subscriptionsResponseSchema = z.array(subscriptionSchema)

export const currentSubscriptionResponseSchema = z.object({
  expirationDate: z.string().nullable(),
  nextChangeDate: z.string().nullable(),
})

export const currentSubscriptionErrorFieldSchema = z.literal('subscription')

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
  paymentService: paymentServiceSchema,
  status: subscriptionHistoryStatusSchema,
})

export const subscriptionHistoryResponseSchema = z.object({
  items: z.array(subscriptionHistoryItemSchema),
  totalCount: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
})
