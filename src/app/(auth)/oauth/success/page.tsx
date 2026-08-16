'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { ApiError, refreshToken } from '@/lib/api'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'

export default function OAuthSuccessPage() {
  const router = useRouter()

  const authenticate = useCallback(async () => {
    try {
      const { accessToken } = await refreshToken()

      localStorage.setItem(ACCESS_TOKEN_LS_KEY, accessToken)

      // Или вариант с cookies ?
      // document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=lax`

      router.replace('/') // или '/profile'
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('OAuth error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }

      router.replace('/sign-in')
    }
  }, [router]) // Зависимости: router

  useEffect(() => {
    authenticate()
  }, [authenticate])

  return null
}
