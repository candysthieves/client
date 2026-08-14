import type { UseFormSetError } from 'react-hook-form'
import { ApiError, ErrorStatus } from '@/lib/api'
import {
  DOMAIN_RESEND_EMAIL_ALREADY_CONFIRMED_ERROR_MESSAGE,
  DOMAIN_RESEND_EMAIL_NOT_EXISTS_ERROR_MESSAGE,
  ResendConfirmationEmailRequest,
} from '@/lib/model'
import { isErrorResponse } from './isErrorResponse'

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
