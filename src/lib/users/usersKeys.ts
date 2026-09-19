export const usersKeys = {
  all: ['users'] as const,
  count: () => [...usersKeys.all, 'count'] as const,
}
