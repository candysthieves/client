import { UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { DOMAIN_ERROR_PASSWORDS_DONT_MATCH_MESSAGE, type NewPasswordRequest } from '@/lib/model'
import { isValidNewPasswordField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

export function mapNewPasswordDomainError(
  error: ApiError,
  setError: UseFormSetError<NewPasswordRequest>
): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  if (!error.data.errorsMessages.length) {
    return false
  }

  const { field } = error.data.errorsMessages[0]

  if (!isValidNewPasswordField(field)) {
    return false
  }

  switch (error.data.code) {
    case ErrorStatus.PasswordsNotMatch:
      setError('newPasswordConfirmation', {
        type: 'server',
        message: DOMAIN_ERROR_PASSWORDS_DONT_MATCH_MESSAGE,
      })
      return true
    case ErrorStatus.RecoveryCodeExpired:
    case ErrorStatus.RecoveryCodeInvalid:
      return true

    default:
      return false
  }
}
