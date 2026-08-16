import { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import {
  DOMAIN_LOGIN_EMAIL_CONFIRM_ERROR_MESSAGE,
  DOMAIN_LOGIN_ERROR_MESSAGE,
  DOMAIN_LOGIN_NOT_FOUND_ERROR_MESSAGE,
  LoginRequest,
} from '@/lib/model'
import { isValidErrorLoginField, isValidLoginField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

/**
 * Specific auth/login Domain errors:
 */
export function mapLoginDomainError(
  error: ApiError,
  setError: UseFormSetError<LoginRequest>
): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  if (!error.data.errorsMessages.length) {
    return false
  }

  const { field } = error.data.errorsMessages[0]
  console.log(field, isValidErrorLoginField(field))
  // if (!isValidLoginField(field) && field !== 'credentials') {
  if (!isValidErrorLoginField(field)) {
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

    // db record errors:
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

// EmailNotConfirmed = 22, login
// InvalidCredentials = 51, login

// db record errors:
// EmailNotExists = 21,
// UserNotFound = 33,
