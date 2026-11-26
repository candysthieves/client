import { useInfiniteQuery } from '@tanstack/react-query'
import { getAllNotifications } from '@/lib/api'
import { useAuth } from '@/lib/hooks/useAuth'
import { NOTIFICATIONS_PAGE_SIZE } from '@/lib/model'
import { notificationKeys } from '../notificationKeys'

export const useNotifications = () => {
  const { isAuthenticated } = useAuth()

  return useInfiniteQuery({
    queryKey: notificationKeys.list(),
    queryFn: ({ pageParam }) =>
      getAllNotifications({ pageSize: NOTIFICATIONS_PAGE_SIZE, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage =>
      lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
    select: data => data.pages.flatMap(page => page.items),
    enabled: isAuthenticated,
    refetchOnWindowFocus: 'always',
  })
}
