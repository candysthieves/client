import { z } from 'zod'

export const imageSchema = z.object({
  fileId: z.uuid(),
  url: z.url(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
})
