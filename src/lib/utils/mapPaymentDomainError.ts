import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { isValidPaymentProviderField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

/**
 * Payment service common error:
 */
export function mapPaymentDomainError(error: ApiError): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  if (!error.data.errorsMessages.length) {
    return false
  }

  const { field } = error.data.errorsMessages[0]

  if (!isValidPaymentProviderField(field)) {
    return false
  }

  switch (error.data.code) {
    case ErrorStatus.AccessTokenInvalid:
    case ErrorStatus.AccessTokenExpired:
    case ErrorStatus.TariffNotFound:
      return true
    default:
      return false
  }
}

// 73
// 74
// 90
