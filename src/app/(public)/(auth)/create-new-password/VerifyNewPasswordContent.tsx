'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { ApiError } from '@/lib/api'
import { useValidatePasswordRecoveryCode } from '@/lib/auth'
import { mapNewPasswordConfirmationError } from '@/lib/utils/mapNewPasswordConfirmationError'

export const VerifyNewPasswordContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recoveryCode = searchParams.get('recoveryCode') ?? ''
  const { isSuccess, isError, error } = useValidatePasswordRecoveryCode(recoveryCode)

  useEffect(() => {
    if (!recoveryCode) {
      router.replace('/password-recovery-link-expired')
      return
    }

    if (isSuccess) {
      router.replace(`/new-password?recoveryCode=${encodeURIComponent(recoveryCode)}`)
      return
    }

    if (isError) {
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
  }, [recoveryCode, router, isSuccess, isError, error])

  return null
}
