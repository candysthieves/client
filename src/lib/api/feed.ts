import { request } from '@/lib/api/request'
import { FeedPostsResponse, feedPostsResponseSchema, Post } from '@/lib/model'

type GetAllPostsParams = {
  limit?: number
}

export const getAllPosts = async (
  { limit }: GetAllPostsParams = {},
  init?: RequestInit
): Promise<Post[]> => {
  const searchParams = new URLSearchParams()

  if (limit) {
    searchParams.set('limit', String(limit))
  }

  const query = searchParams.toString()
  const resultQuery = query ? `?${query}` : ''

  const response = await request<unknown>(`/posts/all-posts${resultQuery}`, init)

  const data: FeedPostsResponse = feedPostsResponseSchema.parse(response)

  return data.items
}
