'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { ApiError, validatePasswordRecoveryCode } from '@/lib/api'

export const VerifyNewPasswordContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recoveryCode = searchParams.get('recoveryCode') ?? searchParams.get('code')

  const handleVerification = useCallback(async () => {
    if (!recoveryCode) {
      router.replace('/recovery-link-expired')
      return
    }

    try {
      await validatePasswordRecoveryCode({ recoveryCode })
      router.replace(`/new-password?recoveryCode=${encodeURIComponent(recoveryCode)}`)
    } catch (error) {
      if (error instanceof ApiError) {
        router.replace('/recovery-link-expired')
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
