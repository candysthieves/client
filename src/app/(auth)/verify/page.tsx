'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { ApiError, registrationConfirmation } from '@/lib/api'
import { mapRegistrationConfirmationError } from '@/lib/utils/mapRegistrationConfirmationError'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')

  const handleVerification = useCallback(async () => {
    /**
     * If user opened link /verify by himself without code
     */
    if (!code) {
      router.replace('/verification-expired')
      return
    }

    try {
      await registrationConfirmation({ code })
      router.replace('/verification-success')
    } catch (error) {
      if (error instanceof ApiError) {
        const redirectTo = mapRegistrationConfirmationError(error)
        if (redirectTo) {
          router.replace(redirectTo)
          return
        }
      }
      // здесь уже можно показать generic error
      console.error(error)
      throw error
    }
  }, [code, router])

  useEffect(() => {
    void handleVerification()
  }, [handleVerification])

  return null
}
