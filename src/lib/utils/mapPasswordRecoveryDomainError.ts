import type { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import {
  DOMAIN_PASSWORD_RECOVERY_RECAPTCHA_INVALID_MESSAGE,
  PasswordRecoveryRequest,
} from '@/lib/model'
import { isErrorResponse } from './isErrorResponse'

/**
 * Specific auth/password-recovery Domain errors:
 */
export function mapPasswordRecoveryDomainError(
  error: ApiError,
  setError: UseFormSetError<PasswordRecoveryRequest>
): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  switch (error.data.code) {
    case ErrorStatus.RecaptchaInvalid:
      setError('recaptchaToken', {
        type: 'server',
        message: DOMAIN_PASSWORD_RECOVERY_RECAPTCHA_INVALID_MESSAGE,
      })
      return true

    default:
      return false
  }
}
