import { ToastError } from '@/components'
import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import {
  EMAIL_VERIFICATION_CODE_EXPIRED_ERROR_MESSAGE,
  EMAIL_VERIFICATION_CODE_INVALID_ERROR_MESSAGE,
  EMAIL_VERIFICATION_ERROR_TITLE,
} from '@/lib/model'
import { isErrorResponse } from '@/lib/utils/isErrorResponse'
import { isValidNewPasswordField } from '@/lib/utils/isValidField'

export function mapNewPasswordConfirmationError(error: ApiError): false | string {
  if (error.status === 400) {
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

    const REDIRECT_ROUTE = '/password-recovery-link-expired'

    switch (error.data.code) {
      case ErrorStatus.ValidationError:
      case ErrorStatus.RecoveryCodeInvalid:
        ToastError({
          title: EMAIL_VERIFICATION_ERROR_TITLE,
          messages: EMAIL_VERIFICATION_CODE_INVALID_ERROR_MESSAGE,
        })
        return REDIRECT_ROUTE

      case ErrorStatus.RecoveryCodeExpired:
        ToastError({
          title: EMAIL_VERIFICATION_ERROR_TITLE,
          messages: EMAIL_VERIFICATION_CODE_EXPIRED_ERROR_MESSAGE,
        })
        return REDIRECT_ROUTE

      default:
        return false
    }
  }
  return false
}
