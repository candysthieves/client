export const postsKeys = {
  all: ['posts'] as const,
  byUser: (userId: string) => [...postsKeys.all, userId] as const,
  deletedByUser: (userId: string) => [...postsKeys.all, 'deleted', userId] as const,
}
