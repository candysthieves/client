import type { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { EditProfileRequest, VALIDATION_ERROR_COMMON_MESSAGE } from '@/lib/model'
import { isValidEditProfileField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

export function mapEditProfileValidationError(
  error: ApiError,
  setError: UseFormSetError<EditProfileRequest>
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
    if (isValidEditProfileField(field)) {
      setError(field, {
        type: 'server',
        message: VALIDATION_ERROR_COMMON_MESSAGE,
      })
      hasValidationError = true
    }
  })

  return hasValidationError
}
