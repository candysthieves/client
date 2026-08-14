import type { UseFormSetError } from 'react-hook-form'
import { ApiError, ErrorStatus } from '@/lib/api'
import { RegistrationRequest, VALIDATION_ERROR_COMMON_MESSAGE } from '@/lib/model'
import { isErrorResponse } from './isErrorResponse'

export function mapRegistrationValidationError(
  error: ApiError,
  setError: UseFormSetError<RegistrationRequest>
): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  if (error.data.code !== ErrorStatus.ValidationError) {
    return false
  }

  for (const { field } of error.data.errorsMessages) {
    switch (field) {
      case 'email':
      case 'username':
      case 'password':
      case 'passwordConfirmation':
        setError(field, {
          type: 'server',
          message: VALIDATION_ERROR_COMMON_MESSAGE,
        })
        break
    }
  }

  return true
}
