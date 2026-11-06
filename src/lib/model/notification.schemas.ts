import { z } from 'zod'

export const notificationTypeSchema = z.enum([
  'subscription',
  'payment',
  'message',
  'like',
  'comment',
])

export const notificationSchema = z.object({
  id: z.string(),
  type: notificationTypeSchema,
  title: z.string(),
  message: z.string(),
  createdAt: z.string(),
  isRead: z.boolean(),
})
