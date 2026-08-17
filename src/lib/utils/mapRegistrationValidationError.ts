import { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { RegistrationRequest, VALIDATION_ERROR_COMMON_MESSAGE } from '@/lib/model'
import { isValidRegistrationField } from '@/lib/utils/isValidField'
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

  if (!error.data.errorsMessages.length) {
    return false
  }

  if (error.data.code !== ErrorStatus.ValidationError) {
    return false
  }

  // for (const { field, message } of error.data.errorsMessages) {
  for (const { field } of error.data.errorsMessages) {
    if (isValidRegistrationField(field)) {
      switch (field) {
        case 'email':
        case 'username':
        case 'password':
        case 'passwordConfirmation': // not used
        case 'isTermsAccepted':
          setError(field, {
            type: 'server',
            // message,
            message: VALIDATION_ERROR_COMMON_MESSAGE,
          })
          break
      }
    }
  }
  return true
}

// ValidationError = 50
