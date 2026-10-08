import { getProfileUrl, getProfilePostsUrl } from '@/lib/api/profileUrls'
import { requestValidated } from '@/lib/api/requestValidated'
import {
  DeletedPostItem,
  GetDeletedPostsResponse,
  MyProfileResponse,
  ProfilePostsResponse,
  UpdateMyProfileRequest,
  UserProfile,
  deletedPostItemSchema,
  getDeletedPostsResponseSchema,
  myProfileResponseSchema,
  userProfileSchema,
  profilePostsResponseSchema,
} from '@/lib/model'

export { PROFILE_POSTS_PAGE_SIZE } from '@/lib/api/profileUrls'

export const getUserProfile = (userId: string): Promise<UserProfile> =>
  requestValidated(getProfileUrl(userId), userProfileSchema)

export const getUserPosts = (userId: string, cursor?: string): Promise<ProfilePostsResponse> =>
  requestValidated(getProfilePostsUrl(userId, cursor), profilePostsResponseSchema)

export const getDeletedPosts = (): Promise<GetDeletedPostsResponse> =>
  requestValidated('/posts/deleted-posts', getDeletedPostsResponseSchema)

export const getDeletedPostById = (postId: string): Promise<DeletedPostItem> =>
  requestValidated(`/posts/deleted-posts/${encodeURIComponent(postId)}`, deletedPostItemSchema)

export const updateMyProfile = (body: UpdateMyProfileRequest): Promise<MyProfileResponse> =>
  requestValidated('/users/my-profile', myProfileResponseSchema, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

// Backend has no GET for the current user's profile: PATCH with an empty body returns it unchanged.
export const getMyProfile = (): Promise<MyProfileResponse> => updateMyProfile({})
