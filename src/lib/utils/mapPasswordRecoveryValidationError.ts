import type { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { PasswordRecoveryRequest, VALIDATION_ERROR_COMMON_MESSAGE } from '@/lib/model'
import { isValidPasswordRecoveryField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

export function mapPasswordRecoveryValidationError(
  error: ApiError,
  setError: UseFormSetError<PasswordRecoveryRequest>
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
    if (isValidPasswordRecoveryField(field)) {
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
