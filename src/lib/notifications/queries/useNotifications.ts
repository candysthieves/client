import { useQuery } from '@tanstack/react-query'
import { getAllNotifications } from '@/lib/api'
import { useAuth } from '@/lib/hooks/useAuth'
import { notificationKeys } from '../notificationKeys'

export const useNotifications = () => {
  const { isAuthenticated } = useAuth()

  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: () => getAllNotifications(),
    enabled: isAuthenticated,
  })
}
