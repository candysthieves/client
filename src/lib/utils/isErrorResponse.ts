// import { ErrorResponse } from '@/lib/api'
//
// export const isErrorResponse = (value: unknown): value is ErrorResponse => {
//   return (
//     typeof value === 'object' &&
//     value !== null &&
//     'errorsMessages' in value &&
//     Array.isArray((value as ErrorResponse).errorsMessages)
//   )
// }

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
