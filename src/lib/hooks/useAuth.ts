'use client'

import { useAuthMe } from '@/lib/auth'
import { UserResponse } from '@/lib/model'

type UseAuthReturn = {
  user: null | UserResponse
  isLoading: boolean
  isAuthenticated: boolean
  isHydrated: boolean
}

export function useAuth(): UseAuthReturn {
  const { data: user = null, isLoading, isHydrated } = useAuthMe()

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isHydrated,
    // isAuthenticated: true,
  }
}
