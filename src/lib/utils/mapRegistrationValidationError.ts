import { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { RegistrationRequest, VALIDATION_ERROR_COMMON_MESSAGE } from '@/lib/model'
import { isErrorResponse } from './isErrorResponse'

/**
 * Form validation common error:
 */
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

  // for (const { field, message } of error.data.errorsMessages) {
  for (const { field } of error.data.errorsMessages) {
    switch (field) {
      case 'email':
      case 'username':
      case 'password':
      case 'passwordConfirmation':
        setError(field, {
          type: 'server',
          // message,
          message: VALIDATION_ERROR_COMMON_MESSAGE,
        })
        break
    }
  }
  return true
}

// ValidationError = 50
