import { z } from 'zod'
import { postSchema } from '@/lib/model/post.schemas'

export const feedPostsResponseSchema = z.object({
  items: z.array(postSchema),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
})
