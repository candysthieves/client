export const postsKeys = {
  all: ['posts'] as const,
  post: (postId: string) => [...postsKeys.all, 'post', postId] as const,
}
