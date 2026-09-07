export const LATEST_POSTS_LIMIT = 4

export const feedKeys = {
  all: ['feed'] as const,
  posts: (limit?: number) => [...feedKeys.all, 'posts', limit] as const,
}
