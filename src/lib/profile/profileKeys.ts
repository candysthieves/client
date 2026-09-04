export const profileKeys = {
  all: ['profiles'] as const,
  detail: (userId: string) => [...profileKeys.all, userId] as const,
  posts: (userId: string) => [...profileKeys.detail(userId), 'posts'] as const,
}
