import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { isValidCurrentSubscriptionField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

/**
 * Current subscription auto-renewal canceling common error:
 */
export function mapCurrentSubscriptionDomainError(error: ApiError): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  if (!error.data.errorsMessages.length) {
    return false
  }

  const { field } = error.data.errorsMessages[0]

  if (!isValidCurrentSubscriptionField(field)) {
    return false
  }

  switch (error.data.code) {
    case ErrorStatus.SubscriptionNotFound:
    case ErrorStatus.PaymentServiceUnavailable:
      return true
    default:
      return false
  }
}

// 94
// 95
