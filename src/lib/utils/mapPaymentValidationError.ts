import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { isValidPaymentProviderField } from '@/lib/utils/isValidField'
import { isErrorResponse } from './isErrorResponse'

/**
 * Form validation common error:
 */
export function mapPaymentValidationError(error: ApiError): boolean {
  if (!isErrorResponse(error.data)) {
    return false
  }

  if (!error.data.errorsMessages.length) {
    return false
  }

  if (error.data.code !== ErrorStatus.ValidationError) {
    return false
  }

  for (const { field } of error.data.errorsMessages) {
    if (field === 'provider' && isValidPaymentProviderField(field)) {
      return true
    }
  }
  return false
}

// ValidationError = 50
