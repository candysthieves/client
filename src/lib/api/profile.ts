import type { ProfilePostsResponse, UserProfile } from '@/lib/model'
import { request } from './request'

const toUserPath = (userId: string) => `/users/${encodeURIComponent(userId)}`

export const PROFILE_POSTS_PAGE_SIZE = 8

export const getUserProfile = (userId: string): Promise<UserProfile> =>
  request<UserProfile>(`${toUserPath(userId)}/profile`)

export const getUserPosts = (userId: string, cursor?: string): Promise<ProfilePostsResponse> => {
  const searchParams = new URLSearchParams({ limit: String(PROFILE_POSTS_PAGE_SIZE) })

  if (cursor) {
    searchParams.set('cursor', cursor)
  }

  return request<ProfilePostsResponse>(`${toUserPath(userId)}/posts?${searchParams.toString()}`)
}
