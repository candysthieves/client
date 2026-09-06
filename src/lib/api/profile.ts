import type { ProfilePostsResponse, UserProfile } from '@/lib/model'
import { profilePostsResponseSchema } from '@/lib/model'
import { request } from './request'

const toUserPath = (userId: string) => `/users/${encodeURIComponent(userId)}`

export const getUserProfile = (userId: string): Promise<UserProfile> =>
  request<UserProfile>(`${toUserPath(userId)}/profile`)

export const getUserPosts = async (userId: string): Promise<ProfilePostsResponse> => {
  const response = await request<unknown>(`${toUserPath(userId)}/posts`)

  return profilePostsResponseSchema.parse(response)
}
