import type { UseFormSetError } from 'react-hook-form'
import type { ApiError, ErrorResponse } from '@/lib/api'
import { RegistrationRequest } from '@/lib/model'

export function mapRegistrationError(
  error: ApiError<ErrorResponse>,
  setError: UseFormSetError<RegistrationRequest>
): void {
  for (const { field, message } of error.data.errorsMessages) {
    switch (field) {
      case 'email':
      case 'username':
      case 'password':
      case 'passwordConfirmation':
        setError(field, {
          type: 'server',
          message,
        })
        break
    }
  }
}
