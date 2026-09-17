import { useQuery } from '@tanstack/react-query'
import { HOME_PAGE_REFETCH_INTERVAL_MS } from '@/constants'
import { getUsersCount } from '@/lib/api'
import { usersKeys } from '@/lib/users'

export const useUsersCount = () =>
  useQuery({
    queryKey: usersKeys.count(),
    queryFn: () => getUsersCount(),
    refetchInterval: HOME_PAGE_REFETCH_INTERVAL_MS,
    retry: false,
  })
