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
  const response = await request<FeedPostsResponse>(
    `/posts/all-posts${query ? `?${query}` : ''}`,
    init
  )

  // The backend ignores `limit` and always returns more than asked — slice
  // defensively so callers actually get what they requested.
  return limit ? response.items.slice(0, limit) : response.items
}
