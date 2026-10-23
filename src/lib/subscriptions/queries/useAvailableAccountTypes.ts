import { useQuery } from '@tanstack/react-query'
import { getAvailableAccountTypes } from '@/lib/api'
import { subscriptionKeys } from '@/lib/subscriptions/subscriptionKeys'

export const useAvailableAccountTypes = () =>
  useQuery({
    queryKey: subscriptionKeys.types(),
    queryFn: getAvailableAccountTypes,
  })
