import { useQuery } from '@tanstack/react-query'
import { notificationKeys } from '@/lib/notifications'

export function useUnreadCount() {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: () => ({ count: 0 }),
    initialData: { count: 0 },
    staleTime: Infinity,
  })
}
