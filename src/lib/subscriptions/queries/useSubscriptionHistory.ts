import { useQuery } from '@tanstack/react-query'
import { getSubscriptionHistory } from '@/lib/api/subscriptions'
import { subscriptionKeys } from '@/lib/subscriptions/subscriptionKeys'

export const useSubscriptionHistory = (page: number, pageSize: number) =>
  useQuery({
    queryKey: subscriptionKeys.history(page, pageSize),
    queryFn: () => getSubscriptionHistory(page, pageSize),
  })
