import {
  DeletedPostItem,
  GetDeletedPostsResponse,
  ProfilePostsResponse,
  UserProfile,
  deletedPostItemSchema,
  getDeletedPostsResponseSchema,
} from '@/lib/model'
import { request } from './request'

export const PROFILE_POSTS_PAGE_SIZE = 12

export const getUserProfile = (userId: string): Promise<UserProfile> =>
  request<UserProfile>(`/users/profile/${encodeURIComponent(userId)}`)

export const getUserPosts = (userId: string, cursor?: string): Promise<ProfilePostsResponse> => {
  const searchParams = new URLSearchParams({
    limit: String(PROFILE_POSTS_PAGE_SIZE),
  })

  if (cursor) {
    searchParams.set('cursor', cursor)
  }

  return request<ProfilePostsResponse>(
    `/posts/user/${encodeURIComponent(userId)}?${searchParams.toString()}`
  )
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
