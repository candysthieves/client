import { ApiError } from '@/lib/api'

export function mapRegistrationConfirmationError(error: ApiError): null | string {
  if (error.status === 400) {
    return '/verification-expired'
  }

  return null
}
