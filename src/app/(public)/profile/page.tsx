'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/lib/hooks'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user?.id) {
      router.replace(`/profile/${user.id}`)
    } else if (!localStorage.getItem(ACCESS_TOKEN_LS_KEY)) {
      router.replace('/')
    }
  }, [router, user?.id])

  return null
}
