import { ErrorResponse } from '@/lib/api'

export const isErrorResponse = (value: unknown): value is ErrorResponse => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'errorsMessages' in value &&
    Array.isArray((value as ErrorResponse).errorsMessages)
  )
}
