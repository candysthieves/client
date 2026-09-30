import { requestValidated } from '@/lib/api/requestValidated'
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

export const PROFILE_POSTS_PAGE_SIZE = 12

export const getUserProfile = (userId: string): Promise<UserProfile> =>
  requestValidated(`/users/profile/${encodeURIComponent(userId)}`, userProfileSchema)

export const getUserPosts = (userId: string, cursor?: string): Promise<ProfilePostsResponse> => {
  const searchParams = new URLSearchParams({
    limit: String(PROFILE_POSTS_PAGE_SIZE),
  })

  if (cursor) {
    searchParams.set('cursor', cursor)
  }

  return requestValidated(
    `/posts/user/${encodeURIComponent(userId)}?${searchParams.toString()}`,
    profilePostsResponseSchema
  )
}

export const getDeletedPosts = (): Promise<GetDeletedPostsResponse> =>
  requestValidated('/posts/deleted-posts', getDeletedPostsResponseSchema, {
    method: 'GET',
  })

export const getDeletedPostById = (postId: string): Promise<DeletedPostItem> =>
  requestValidated(`/posts/deleted-posts/${encodeURIComponent(postId)}`, deletedPostItemSchema, {
    method: 'GET',
  })
