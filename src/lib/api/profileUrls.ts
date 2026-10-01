export const PROFILE_POSTS_PAGE_SIZE = 12

export const getProfileUrl = (userId: string) => `/users/profile/${encodeURIComponent(userId)}`

export const getProfilePostsUrl = (userId: string, cursor?: string) => {
  const searchParams = new URLSearchParams({
    limit: String(PROFILE_POSTS_PAGE_SIZE),
  })

  if (cursor) {
    searchParams.set('cursor', cursor)
  }

  return `/posts/user/${encodeURIComponent(userId)}?${searchParams.toString()}`
}
