import {
  GetDeletedPostsResponse,
  GetDeletedPostsResponseSchema,
  ProfilePostsResponse,
  UserProfile,
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
  return GetDeletedPostsResponseSchema.parse(response)
}
