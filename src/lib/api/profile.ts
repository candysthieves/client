import {
  DeletedPostItem,
  GetDeletedPostsResponse,
  ProfilePostsResponse,
  UserProfile,
  deletedPostItemSchema,
  getDeletedPostsResponseSchema,
} from '@/lib/model'
import { request } from './request'

const toUserPath = (userId: string) => `/users/${encodeURIComponent(userId)}`

export const getUserProfile = (userId: string): Promise<UserProfile> =>
  request<UserProfile>(`${toUserPath(userId)}/profile`)

export const getUserPosts = (userId: string): Promise<ProfilePostsResponse> =>
  request<ProfilePostsResponse>(`${toUserPath(userId)}/posts`)

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
