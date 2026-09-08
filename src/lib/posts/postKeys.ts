export const postsKeys = {
  all: ['posts'] as const,
  detail: (postId: string) => [...postsKeys.all, 'detail', postId] as const,
}
