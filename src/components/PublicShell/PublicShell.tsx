'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useAuth } from '@/lib/hooks/useAuth'

export const PublicShell = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { isAuthenticated, isLoading, isHydrated } = useAuth()

  useEffect(() => {
    if (isHydrated && !isLoading && isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, isHydrated, isLoading, router])

  if (!isHydrated || isLoading) {
    return <div>Loading..</div>
  }

  if (isAuthenticated) {
    return null
  }

  return children
}
