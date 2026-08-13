import { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { DOMAIN_ERROR_COMMON_MESSAGE, RegistrationRequest } from '@/lib/model'
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

  const { field } = error.data.errorsMessages[0]

  if (!isValidRegistrationField(field)) {
    return false
  }

  switch (error.data.code) {
    case ErrorStatus.EmailAlreadyExists:
    case ErrorStatus.UsernameAlreadyExists:
    case ErrorStatus.PasswordsNotMatch:
      setError(field, {
        type: 'server',
        message: DOMAIN_ERROR_COMMON_MESSAGE,
      })
      return true

    default:
      return false
  }
}

// EmailAlreadyExists = 23,
// UsernameAlreadyExists = 30,
// PasswordsNotMatch = 53,
