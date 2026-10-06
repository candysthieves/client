import { ApiError } from '@/lib/api/apiError'
import { ResponseValidationError } from '@/lib/api/responseValidationError'

const SERVER_ERROR_MIN_STATUS = 500

// fetch rejects with a TypeError when the server is unreachable, so a non-API error that is not a
// response-contract violation is a network failure.
export const isServerUnavailableError = (error: Error) =>
  error instanceof ApiError
    ? error.status >= SERVER_ERROR_MIN_STATUS
    : !(error instanceof ResponseValidationError)
