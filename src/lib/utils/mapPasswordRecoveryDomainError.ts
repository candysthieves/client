import type { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import {
  DOMAIN_EMAIL_CONFIRM_ERROR_MESSAGE,
  DOMAIN_PASSWORD_RECOVERY_RECAPTCHA_INVALID_MESSAGE,
  DOMAIN_RESEND_EMAIL_NOT_EXISTS_ERROR_MESSAGE,
  PasswordRecoveryRequest,
} from '@/lib/model'
import { isValidPasswordRecoveryField } from '@/lib/utils/isValidField'
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

  if (!error.data.errorsMessages.length) {
    return false
  }

  const { field } = error.data.errorsMessages[0]

  if (!isValidPasswordRecoveryField(field)) {
    return false
  }
  console.log('error.data.code', error.data.code)
  switch (error.data.code) {
    case ErrorStatus.EmailNotExists:
      setError('email', {
        type: 'server',
        message: DOMAIN_RESEND_EMAIL_NOT_EXISTS_ERROR_MESSAGE,
      })
      return true
    case ErrorStatus.EmailNotConfirmed:
      setError('email', {
        type: 'server',
        message: DOMAIN_EMAIL_CONFIRM_ERROR_MESSAGE,
      })
      return true

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

// EmailNotExists = 21,
// EmailNotConfirmed = 22,
