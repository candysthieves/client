import {
  DeletedPostItem,
  GetDeletedPostsResponse,
  ProfilePostsResponse,
  UserProfile,
  deletedPostItemSchema,
  getDeletedPostsResponseSchema,
  userProfileSchema,
  profilePostsResponseSchema,
} from '@/lib/model'
import { request } from './request'

export const PROFILE_POSTS_PAGE_SIZE = 12

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const data = await request<unknown>(`/users/profile/${encodeURIComponent(userId)}`)

  return userProfileSchema.parse(data)
}

export const getUserPosts = async (
  userId: string,
  cursor?: string
): Promise<ProfilePostsResponse> => {
  const searchParams = new URLSearchParams({
    limit: String(PROFILE_POSTS_PAGE_SIZE),
  })

  if (cursor) {
    searchParams.set('cursor', cursor)
  }

  const data = await request<unknown>(
    `/posts/user/${encodeURIComponent(userId)}?${searchParams.toString()}`
  )

  return profilePostsResponseSchema.parse(data)
}

export const getDeletedPosts = async (): Promise<GetDeletedPostsResponse> => {
  const response = await request<unknown>('/posts/deleted-posts', {
    method: 'GET',
  })
  return getDeletedPostsResponseSchema.parse(response)
}
export const getDeletedPostById = async (postId: string): Promise<DeletedPostItem> => {
  const response = await request<unknown>(`/posts/deleted-posts/${postId}`, {
    method: 'GET',
  })
  return deletedPostItemSchema.parse(response)
}
