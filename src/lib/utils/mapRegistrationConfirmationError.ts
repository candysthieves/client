import { ApiError } from '@/lib/api'

export function mapRegistrationConfirmationError(error: ApiError): null | string {
  if (error.status === 400) {
    return '/email-verification-expired'
  }

  return null
}

// У подтверждения почты сейчас в Swagger нет никакого тела ошибки, кроме обычного 400.
// Поэтому пока mapper пока простой.
