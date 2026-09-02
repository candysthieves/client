import { useQuery } from '@tanstack/react-query'
import { getUsersCount } from '@/lib/api'
import { usersKeys } from '@/lib/users'

export function useUsersCount() {
  return useQuery({
    queryKey: usersKeys.count(),
    queryFn: getUsersCount,
  })
}
