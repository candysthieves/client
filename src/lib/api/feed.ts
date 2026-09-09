import type { FeedPostsResponse, Post } from '@/lib/model'
import { request } from '@/lib/api/request'

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

  const response = await request<FeedPostsResponse>(`/posts/all-posts${resultQuery}`, init)
  return response.items
}
