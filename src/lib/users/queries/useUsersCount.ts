import { useQuery } from '@tanstack/react-query'
import { getUsersCount } from '@/lib/api'
import { usersKeys } from '@/lib/users'

export const useUsersCount = () =>
  useQuery({
    queryKey: usersKeys.count(),
    queryFn: () => getUsersCount(),
    retry: false,
  })
