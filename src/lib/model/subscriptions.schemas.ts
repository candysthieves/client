import { z } from 'zod'
import { accountTypeSchema } from '@/lib/model/auth.schemas'

export const subscriptionTypeSchema = z.enum(['Daily', 'Weekly', 'Monthly', 'Quarterly'], {
  error: 'Please select a subscription plan',
})

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
  durationDays: z.number().int().positive(),
  priceInMinorUnits: z.number().int().positive(),
  currency: currencyTypeSchema, // 'USD', 'EUR', 'RUB'
  priceUnit: priceUnitTypeSchema, // 'CENT', 'KOPECK'
})

export const subscriptionsResponseSchema = z.array(subscriptionSchema)

export const paymentServiceSchema = z.enum(['Yookassa', 'Stripe'])
