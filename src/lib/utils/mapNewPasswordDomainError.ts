import { ApiError } from '@/lib/api'
import { ErrorStatus } from '@/lib/api/enums'
import { isErrorResponse } from './isErrorResponse'

export function mapNewPasswordDomainError(error: ApiError): 'recovery-link-expired' | null {
  if (!isErrorResponse(error.data)) {
    return null
  }

  switch (error.data.code) {
    case ErrorStatus.RecoveryCodeExpired:
    case ErrorStatus.RecoveryCodeInvalid:
      return 'recovery-link-expired'

    default:
      return null
  }
}
