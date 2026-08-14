import type { UseFormSetError } from 'react-hook-form'
import { ApiError, ErrorStatus } from '@/lib/api'
import { LoginRequest } from '@/lib/model'
import { isValidLoginField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

export function mapLoginValidationError(
  error: ApiError,
  setError: UseFormSetError<LoginRequest>
): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  if (error.data.code !== ErrorStatus.ValidationError) {
    return false
  }

  let hasValidationError = false

  error.data.errorsMessages.forEach(({ field, message }) => {
    if (isValidLoginField(field)) {
      setError(field, {
        type: 'server',
        message,
      })
      hasValidationError = true
    }
  })

  return hasValidationError
}
