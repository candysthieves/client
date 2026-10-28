import { useQuery } from '@tanstack/react-query'
import { getSubscriptionHistory } from '@/lib/api/subscriptions'
import { subscriptionKeys } from '@/lib/subscriptions/subscriptionKeys'

export const useSubscriptionHistory = () =>
  useQuery({
    queryKey: subscriptionKeys.history(),
    queryFn: getSubscriptionHistory,
  })
