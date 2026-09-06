export const postsKeys = {
  all: ['posts'] as const,
  deletedByUser: (userId: string) => [...postsKeys.all, 'deleted', userId] as const,
  deletedPost: (postId: string) => [...postsKeys.all, 'deleted-post', postId] as const,
}
