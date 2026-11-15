import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelCurrentSubscription } from '@/lib/api'
import { authKeys } from '@/lib/auth'
import { subscriptionKeys } from '@/lib/subscriptions'

export function useCancelCurrentSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cancelCurrentSubscription,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() })
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all })
    },
  })
}
