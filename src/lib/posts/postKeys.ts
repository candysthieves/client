export const postsKeys = {
  all: ['posts'] as const,
  detail: (postId: string) => [...postsKeys.all, 'detail', postId] as const,
  deletedByUser: (userId: string) => [...postsKeys.all, 'deleted', userId] as const,
  deletedPost: (postId: string) => [...postsKeys.all, 'deleted-post', postId] as const,
}
