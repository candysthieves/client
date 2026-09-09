import { ErrorStatus } from '@/lib/api/enums'
import { ApiErrorResponse } from '@/lib/model'
import { isErrorResponse } from '@/lib/utils/isErrorResponse'

export function isAccessTokenError(value: unknown): value is ApiErrorResponse {
  if (!isErrorResponse(value)) {
    return false
  }

  return (
    value.code === ErrorStatus.AccessTokenInvalid || value.code === ErrorStatus.AccessTokenExpired
  )
}

export function isSessionAuthError(value: unknown): value is ApiErrorResponse {
  if (!isErrorResponse(value)) {
    return false
  }

  return [
    ErrorStatus.RefreshTokenInvalid,
    ErrorStatus.RefreshTokenMissing,
    ErrorStatus.RefreshTokenExpired,
    ErrorStatus.SessionNotFound,
    ErrorStatus.SessionUserMismatch,
    ErrorStatus.SessionAccessForbidden,
  ].includes(value.code)
}
