import { useQuery } from '@tanstack/react-query'
import { getCurrentSubscription } from '@/lib/api'
import { CurrentSubscriptionResponse } from '@/lib/model'
import { subscriptionKeys } from '@/lib/subscriptions'

export const useCurrentSubscription = () => {
  return useQuery<CurrentSubscriptionResponse, Error>({
    queryKey: subscriptionKeys.current(),
    queryFn: getCurrentSubscription,
  })
}
