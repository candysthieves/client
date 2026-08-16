'use client'

import { createContext, ReactNode, useEffect, useState } from 'react'
import { authMe } from '@/lib/api'
import { ACCESS_TOKEN_LS_KEY, UserResponse } from '@/lib/model'

type AuthContextValue = {
  user: null | UserResponse
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
})

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<null | UserResponse>(null) // Temporary solution
  const [isLoading, setIsLoading] = useState(true) // Temporary solution

  useEffect(() => {
    const restoreUser = async () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_LS_KEY)

      if (!accessToken) {
        setIsLoading(false)
        return
      }

      try {
        const user = await authMe()
        setUser(user)
      } catch (error) {
        console.error(error)
        localStorage.removeItem(ACCESS_TOKEN_LS_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    restoreUser()
  }, [])

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>
}
