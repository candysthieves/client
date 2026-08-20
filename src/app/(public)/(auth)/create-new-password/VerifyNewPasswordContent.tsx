'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { ApiError, validatePasswordRecoveryCode } from '@/lib/api'
import { mapNewPasswordConfirmationError } from '@/lib/utils/mapNewPasswordConfirmationError'

export const VerifyNewPasswordContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recoveryCode = searchParams.get('recoveryCode') ?? ''

  const handleVerification = useCallback(async () => {
    if (!recoveryCode) {
      router.replace('/password-recovery-link-expired')
      return
    }

    try {
      await validatePasswordRecoveryCode({ recoveryCode })
      router.replace(`/new-password?recoveryCode=${encodeURIComponent(recoveryCode)}`)
    } catch (error) {
      if (error instanceof ApiError) {
        const redirectTo = mapNewPasswordConfirmationError(error)
        if (typeof redirectTo === 'string') {
          router.replace(redirectTo)
        }
        return
      }
      console.error(error)
      throw error
    }
  }, [recoveryCode, router])

  useEffect(() => {
    void handleVerification()
  }, [handleVerification])

  return null
}
