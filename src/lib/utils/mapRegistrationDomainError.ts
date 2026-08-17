import { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import {
  DOMAIN_ERROR_EMAIL_ALREADY_EXISTS_MESSAGE,
  DOMAIN_ERROR_PASSWORDS_DONT_MATCH_MESSAGE,
  DOMAIN_ERROR_USERNAME_ALREADY_EXISTS_MESSAGE,
  RegistrationRequest,
} from '@/lib/model'
import { isValidRegistrationField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

/**
 * Specific auth/registration Domain errors:
 */
export function mapRegistrationDomainError(
  error: ApiError,
  setError: UseFormSetError<RegistrationRequest>
): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  if (!error.data.errorsMessages.length) {
    return false
  }

  const { field } = error.data.errorsMessages[0]

  if (!isValidRegistrationField(field)) {
    return false
  }

  switch (error.data.code) {
    case ErrorStatus.EmailAlreadyExists:
      setError('email', {
        type: 'server',
        message: DOMAIN_ERROR_EMAIL_ALREADY_EXISTS_MESSAGE,
      })
      return true
    case ErrorStatus.UsernameAlreadyExists:
      setError('username', {
        type: 'server',
        message: DOMAIN_ERROR_USERNAME_ALREADY_EXISTS_MESSAGE,
      })
      return true
    case ErrorStatus.PasswordsNotMatch:
      setError('passwordConfirmation', {
        type: 'server',
        message: DOMAIN_ERROR_PASSWORDS_DONT_MATCH_MESSAGE,
      })
      return true
    // setError(field, {
    //   type: 'server',
    //   message,
    // })
    // return true

    default:
      return false
  }
}

// EmailAlreadyExists = 23,
// UsernameAlreadyExists = 30,
// PasswordsNotMatch = 53,
