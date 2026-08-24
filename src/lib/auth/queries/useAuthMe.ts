import { useQuery } from '@tanstack/react-query'
import { authMe } from '@/lib/api'
import { authKeys } from '@/lib/auth'

export function useAuthMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authMe,
    retry: false,
  })
}

// обновляем после операций, которые меняют authentication state.
