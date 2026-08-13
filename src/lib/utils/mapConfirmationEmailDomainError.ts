import { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import {
  DOMAIN_LOGIN_EMAIL_CONFIRM_ERROR_MESSAGE,
  DOMAIN_LOGIN_ERROR_MESSAGE,
  DOMAIN_LOGIN_NOT_FOUND_ERROR_MESSAGE,
  DOMAIN_RESEND_EMAIL_ALREADY_CONFIRMED_ERROR_MESSAGE,
  DOMAIN_RESEND_EMAIL_NOT_EXISTS_ERROR_MESSAGE,
  LoginRequest,
  ResendConfirmationEmailRequest,
} from '@/lib/model'
import { isValidLoginField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

/**
 * Specific auth/resend-confirmation-email Domain errors:
 */
export function mapConfirmationEmailDomainError(
  error: ApiError,
  setError: UseFormSetError<ResendConfirmationEmailRequest>
): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  const { field } = error.data.errorsMessages[0]

  if (field !== 'email') {
    return false
  }

  switch (error.data.code) {
    case ErrorStatus.EmailAlreadyConfirmed:
      setError(field, {
        type: 'server',
        message: DOMAIN_RESEND_EMAIL_ALREADY_CONFIRMED_ERROR_MESSAGE,
      })
      return true

    case ErrorStatus.EmailNotExists:
      setError(field, {
        type: 'server',
        message: DOMAIN_RESEND_EMAIL_NOT_EXISTS_ERROR_MESSAGE,
      })
      return true

    default:
      return false
  }
}

//   EmailNotExists = 21, resend confirm email
//   EmailAlreadyConfirmed = 20 resend confirm email
