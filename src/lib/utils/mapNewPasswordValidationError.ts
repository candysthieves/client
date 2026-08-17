import type { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { NewPasswordRequest } from '@/lib/model'
import { isValidNewPasswordField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

export function mapNewPasswordValidationError(
  error: ApiError,
  setError: UseFormSetError<NewPasswordRequest>
): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  if (
    error.data.code !== ErrorStatus.ValidationError &&
    error.data.code !== ErrorStatus.PasswordsNotMatch
  ) {
    return false
  }

  let hasValidationError = false

  error.data.errorsMessages.forEach(({ field, message }) => {
    if (field === 'password') {
      setError('newPassword', {
        type: 'server',
        message,
      })
      hasValidationError = true
      return
    }

    if (isValidNewPasswordField(field)) {
      setError(field, {
        type: 'server',
        message,
      })
      hasValidationError = true
    }
  })

  return hasValidationError
}
