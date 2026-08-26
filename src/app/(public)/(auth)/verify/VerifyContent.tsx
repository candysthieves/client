'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { ApiError } from '@/lib/api'
import { useRegistrationConfirmation } from '@/lib/auth'
import { mapRegistrationConfirmationError } from '@/lib/utils'

export const VerifyContent = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code') ?? ''
  const { mutate: confirmRegistration } = useRegistrationConfirmation()

  const handleVerification = useCallback(() => {
    /**
     * If user opened link /verify by himself without code
     */
    if (!code) {
      router.replace('/verification-expired')
      return
    }

    confirmRegistration(
      { code },
      {
        onSuccess: () => {
          router.replace('/verification-success')
        },
        onError: error => {
          if (error instanceof ApiError) {
            const redirectTo = mapRegistrationConfirmationError(error)
            if (typeof redirectTo === 'string') {
              router.replace(redirectTo)
              return
            }
          }
          console.error(error)
          throw error
        },
      }
    )
  }, [code, router, confirmRegistration])

  useEffect(() => {
    handleVerification()
  }, [handleVerification])

  return null
}

// ConfirmationCodeExpired = 40,
// ConfirmationCodeInvalid = 41,
