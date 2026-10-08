import { getProfilePostsUrl, getProfileUrl } from '@/lib/api/profileUrls'
import { serverRequestValidated } from '@/lib/api/server/serverRequest'
import {
  profilePostsResponseSchema,
  type ProfilePostsResponse,
  userProfileSchema,
  type UserProfile,
} from '@/lib/model'

export const getServerUserProfile = async (userId: string): Promise<UserProfile> =>
  serverRequestValidated(getProfileUrl(userId), userProfileSchema)

export const getServerUserPosts = async (
  userId: string,
  cursor?: string
): Promise<ProfilePostsResponse> =>
  serverRequestValidated(getProfilePostsUrl(userId, cursor), profilePostsResponseSchema)
