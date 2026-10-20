import { useQuery } from '@tanstack/react-query'
import { getSubscriptionCosts } from '@/lib/api/subscriptions'
import { AccountType } from '@/lib/model'
import { subscriptionKeys } from '@/lib/subscriptions/subscriptionKeys'

export const useSubscriptionCosts = (accountType: AccountType) =>
  useQuery({
    queryKey: subscriptionKeys.costs(accountType),
    queryFn: () => getSubscriptionCosts(accountType),
  })
