import { z } from 'zod'

export const usersCountResponseSchema = z.object({
  count: z.number(),
})
