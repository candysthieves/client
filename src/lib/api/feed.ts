import { requestValidated } from '@/lib/api/requestValidated'
import { feedPostsResponseSchema, Post } from '@/lib/model'

type GetAllPostsParams = {
  limit?: number
}

export const getAllPosts = (
  { limit }: GetAllPostsParams = {},
  init?: RequestInit
): Promise<Post[]> => {
  const searchParams = new URLSearchParams()

  if (limit) {
    searchParams.set('limit', String(limit))
  }

  const query = searchParams.toString()
  const resultQuery = query ? `?${query}` : ''

  return requestValidated(`/posts/all-posts${resultQuery}`, feedPostsResponseSchema, init).then(
    data => data.items
  )
}
