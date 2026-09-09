import { z } from 'zod'
import { postSchema } from './post.schemas'

export const feedPostsResponseSchema = z.object({
  items: z.array(postSchema),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
})
