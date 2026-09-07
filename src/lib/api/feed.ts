import type { FeedPost, FeedPostsResponse } from '@/lib/model'
import type { Post } from '@/mocks/posts'
import { request } from '@/lib/api/request'

type GetAllPostsParams = {
  limit?: number
}

const toPost = (feedPost: FeedPost): Post => {
  const willBeDeletedIn = feedPost.willBeDeleted ? new Date(feedPost.willBeDeleted) : null

  return {
    postId: feedPost.id,
    description: feedPost.description,
    images: feedPost.images,
    preview: feedPost.preview,
    userId: feedPost.author.id,
    userName: feedPost.author.username,
    createdAt: feedPost.createdAt,
    willBeDeletedIn,
  }
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
  const posts = response.items.map(toPost)

  // The backend ignores `limit` and always returns more than asked — slice
  // defensively so callers actually get what they requested.
  return limit ? posts.slice(0, limit) : posts
}
