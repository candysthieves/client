'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useAuth } from '@/lib/hooks/useAuth'

export const PublicShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, isLoading, isHydrated } = useAuth()
  const isAvailableToAuthenticatedUser = pathname === '/privacy-policy'

  useEffect(() => {
    if (isHydrated && !isLoading && isAuthenticated && !isAvailableToAuthenticatedUser) {
      router.replace('/')
    }
  }, [isAuthenticated, isAvailableToAuthenticatedUser, isHydrated, isLoading, router])

  if (!isHydrated || isLoading) {
    return <div>Loading..</div>
  }

  if (isAuthenticated && !isAvailableToAuthenticatedUser) {
    return null
  }

  return children
}
