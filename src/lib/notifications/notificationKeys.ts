export const notificationKeys = {
  all: ['notifications'] as const,
  list: (pageSize?: number, cursor?: string) =>
    [...notificationKeys.all, 'list', pageSize, cursor] as const,
  unreadCount: () => [...notificationKeys.all, 'unread-count'] as const,
}
