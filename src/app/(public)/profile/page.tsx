'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/lib/hooks'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, isHydrated } = useAuth()

  useEffect(() => {
    if (!isHydrated || isLoading) return

    if (isAuthenticated && user?.id) {
      router.replace(`/profile/${user.id}`)
    } else {
      router.replace('/')
    }
  }, [isAuthenticated, isHydrated, isLoading, router, user?.id])

  return null
}
