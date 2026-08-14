import type { UseFormSetError } from 'react-hook-form'
import { ApiError, ErrorStatus } from '@/lib/api'
import { DOMAIN_ERROR_COMMON_MESSAGE, RegistrationRequest } from '@/lib/model'
import { isValidRegistrationField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

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
