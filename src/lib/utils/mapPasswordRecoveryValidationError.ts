import type { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { PasswordRecoveryRequest } from '@/lib/model'
import { isValidPasswordRecoveryField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

export function mapPasswordRecoveryValidationError(
  error: ApiError,
  setError: UseFormSetError<PasswordRecoveryRequest>
): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  if (error.data.code !== ErrorStatus.ValidationError) {
    return false
  }

  let hasValidationError = false

  error.data.errorsMessages.forEach(({ field, message }) => {
    if (isValidPasswordRecoveryField(field)) {
      setError(field, {
        type: 'server',
        message,
      })
      hasValidationError = true
    }
  })

  return hasValidationError
}
