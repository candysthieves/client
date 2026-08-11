import type { UseFormSetError } from 'react-hook-form'
import type { ApiError, ErrorResponse, RegistrationDto } from '@/lib/api'

export function mapRegistrationError(
  error: ApiError<ErrorResponse>,
  setError: UseFormSetError<RegistrationDto>
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
