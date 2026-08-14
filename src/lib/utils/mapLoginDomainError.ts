import type { UseFormSetError } from 'react-hook-form'
import { ApiError, ErrorStatus } from '@/lib/api'
import {
  DOMAIN_LOGIN_EMAIL_CONFIRM_ERROR_MESSAGE,
  DOMAIN_LOGIN_ERROR_MESSAGE,
  DOMAIN_LOGIN_NOT_FOUND_ERROR_MESSAGE,
  LoginRequest,
} from '@/lib/model'
import { isErrorResponse } from './isErrorResponse'

export function mapLoginDomainError(
  error: ApiError,
  setError: UseFormSetError<LoginRequest>
): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  switch (error.data.code) {
    case ErrorStatus.EmailNotConfirmed:
      setError('email', {
        type: 'server',
        message: DOMAIN_LOGIN_EMAIL_CONFIRM_ERROR_MESSAGE,
      })
      return true

    case ErrorStatus.InvalidCredentials:
      setError('email', {
        type: 'server',
        message: DOMAIN_LOGIN_ERROR_MESSAGE,
      })
      setError('password', {
        type: 'server',
        message: DOMAIN_LOGIN_ERROR_MESSAGE,
      })
      return true

    case ErrorStatus.EmailNotExists:
      setError('email', {
        type: 'server',
        message: DOMAIN_LOGIN_NOT_FOUND_ERROR_MESSAGE,
      })
      return true

    case ErrorStatus.UserNotFound:
      setError('email', {
        type: 'server',
        message: DOMAIN_LOGIN_NOT_FOUND_ERROR_MESSAGE,
      })
      return true

    default:
      return false
  }
}
