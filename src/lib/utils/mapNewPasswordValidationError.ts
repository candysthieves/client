import type { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { NewPasswordRequest, VALIDATION_ERROR_COMMON_MESSAGE } from '@/lib/model'
import { isValidNewPasswordField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

export function mapNewPasswordValidationError(
  error: ApiError,
  setError: UseFormSetError<NewPasswordRequest>
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

  let hasValidationError = false

  error.data.errorsMessages.forEach(({ field }) => {
    if (field === 'password') {
      setError('newPassword', {
        type: 'server',
        // message,
        message: VALIDATION_ERROR_COMMON_MESSAGE,
      })
      hasValidationError = true
      return
    }

    if (isValidNewPasswordField(field)) {
      setError(field, {
        type: 'server',
        // message,
        message: VALIDATION_ERROR_COMMON_MESSAGE,
      })
      hasValidationError = true
    }
  })

  return hasValidationError
}
