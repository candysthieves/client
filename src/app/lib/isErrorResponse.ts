import type { ApiErrorResponse } from '@/features/auth/model'

export const isErrorResponse = (value: unknown): value is ApiErrorResponse => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'errorsMessages' in value &&
    Array.isArray((value as ApiErrorResponse).errorsMessages)
  )
}
