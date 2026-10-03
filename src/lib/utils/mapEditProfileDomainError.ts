import type { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { DOMAIN_ERROR_USERNAME_ALREADY_EXISTS_MESSAGE, EditProfileRequest } from '@/lib/model'
import { isValidEditProfileField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

/**
 * Specific users/my-profile Domain errors:
 */
export function mapEditProfileDomainError(
  error: ApiError,
  setError: UseFormSetError<EditProfileRequest>
): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  if (!error.data.errorsMessages.length) {
    return false
  }

  const { field } = error.data.errorsMessages[0]

  if (!isValidEditProfileField(field)) {
    return false
  }

  switch (error.data.code) {
    case ErrorStatus.UsernameAlreadyExists:
      setError('username', {
        type: 'server',
        message: DOMAIN_ERROR_USERNAME_ALREADY_EXISTS_MESSAGE,
      })
      return true

    default:
      return false
  }
}

// UsernameAlreadyExists = 30, users/my-profile
