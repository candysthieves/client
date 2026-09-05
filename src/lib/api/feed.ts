import type { Post } from '@/mocks/posts'
import { request } from '@/lib/api/request'

type FeedPostImage = {
  fileId: string
  url: string
  width?: number
  height?: number
}

type FeedPostAuthor = {
  id: string
  username: string
}

type FeedPost = {
  id: string
  description?: string
  images: FeedPostImage[]
  preview: FeedPostImage
  createdAt: string
  willBeDeleted: null | string
  author: FeedPostAuthor
}

type FeedPostsResponse = {
  items: FeedPost[]
  nextCursor: null | string
  hasNextPage: boolean
}

type GetAllPostsParams = {
  cursor?: string
  limit?: number
}

const toPost = (feedPost: FeedPost): Post => ({
  postId: feedPost.id,
  description: feedPost.description,
  images: feedPost.images,
  preview: feedPost.preview,
  userId: feedPost.author.id,
  userName: feedPost.author.username,
  createdAt: feedPost.createdAt,
  willBeDeletedIn: feedPost.willBeDeleted ? new Date(feedPost.willBeDeleted) : null,
})

export const getAllPosts = async (
  { cursor, limit }: GetAllPostsParams = {},
  init?: RequestInit
): Promise<Post[]> => {
  const searchParams = new URLSearchParams()

  if (cursor) {
    searchParams.set('cursor', cursor)
  }

  if (limit) {
    searchParams.set('limit', String(limit))
  }

  const query = searchParams.toString()
  const response = await request<FeedPostsResponse>(
    `/posts/all-posts${query ? `?${query}` : ''}`,
    init
  )

  return response.items.map(toPost)
}
