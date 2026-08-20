'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { isAuthenticated, isLoading } from '@/components/ProtectedShell' // TEMPORARY
import { useAuth } from '@/lib/hooks/useAuth'

export const PublicShell = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  // const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  // if (isAuthenticated) {
  //   return null
  // }

  return children
}
