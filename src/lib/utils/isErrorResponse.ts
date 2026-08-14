import { ApiErrorResponse } from '@/lib/model'

export function isErrorResponse(value: unknown): value is ApiErrorResponse {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  if (!('code' in value) || !('errorsMessages' in value)) {
    return false
  }

  return typeof value.code === 'number' && Array.isArray(value.errorsMessages)
}
