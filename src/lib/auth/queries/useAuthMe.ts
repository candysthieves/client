import { useQuery } from '@tanstack/react-query'
import { authMe } from '@/lib/api'
import { authKeys } from '@/lib/auth'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'

export function useAuthMe() {
  // Commented due to Hydration Mismatch
  // const token = typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_LS_KEY) : null

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authMe,
    retry: false,
    // enabled: !!token, // check if refresh token will not work properly
  })
}

// обновляем после операций, которые меняют authentication state.
