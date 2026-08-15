import { NEXT_PUBLIC_API_URL } from '@/constants'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'
import { refreshAccessToken } from '@/lib/utils'
import { ApiError } from './apiError'

let refreshPromise: null | Promise<string> = null

export async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_LS_KEY)

  let response = await fetch(`${NEXT_PUBLIC_API_URL}${input}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
      ...init?.headers,
    },
  })

  /**
   * Refresh token error 401 - revalidate refresh token - logic starts
   * In the case of simultaneous 401 errors, only one `/auth/refresh-token` request will execute,
   * while the others will wait for its result.
   *
   * Revalidate access token flow (not refresh token, refresh token is set in the HttpOnly cookies by backend):
   * API request with token -> response 401 (access token invalid) -> refreshAccessToken() -> POST /auth/refresh-token ->
   * -> HttpOnly refreshToken auto sending -> response code 200 with body { accessToken: newToken } ->
   * -> localStorage.setItem(ACCESS_TOKEN_LS_KEY, 'new-token') -> resending the original initial request -> success code (200, ...)
   */
  if (response.status === 401) {
    try {
      /**
       * The first request creates a Promise. All subsequent requests receive the same Promise and wait for it
       */
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null
        })
      }
      // waiting of the Promise ends

      const newAccessToken = await refreshPromise

      response = await fetch(`${NEXT_PUBLIC_API_URL}${input}`, {
        ...init,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newAccessToken}`,
          ...init?.headers,
        },
      })
    } catch (error) {
      localStorage.removeItem(ACCESS_TOKEN_LS_KEY)

      if (error instanceof ApiError) {
        throw error
      }

      throw new ApiError(401, undefined) // the user becomes unauthorized (sends to auth logic to log out user)
    }
  }
  // Refresh token error - revalidate refresh token logic ends

  if (!response.ok) {
    let errorData: unknown

    try {
      const text = await response.text()
      errorData = text ? JSON.parse(text) : undefined
    } catch {
      errorData = undefined
    }
    console.log(errorData)
    throw new ApiError(response.status, errorData)
  }

  const text = await response.text()

  if (!text) {
    return undefined as T
  }

  return JSON.parse(text) as T
}

/**
 * A subsequent request following a refresh might now also return a 401—and we don't attempt to refresh it again.
 * This is intentional to avoid an infinite loop.
 * In this scenario, the error propagates outward, allowing the AuthProvider or subsequent logic to treat the session as invalid.
 *
 * if access token and !!! refresh token !!! are invalid:
 *  GET /auth/me -> 401 -> POST /auth/refresh-token -> 401 -> localStorage.removeItem(ACCESS_TOKEN_LS_KEY) -> request() throws ApiError
 *
 * try {
 *   const user = await authMe()
 * } catch (error) {
 *   // we get gere
 * }
 *
 * the user becomes unauthorized (logged out)
 *
 * try {
 *   const user = await authMe()
 *   setUser(user)
 * } catch {
 *   setUser(null)
 * }
 */

// CORS
// https://lumosapp.net/api/v1
// https://dev.lumosapp.net:3000/api/v1
// http://localhost:3000/api/v1

// const handleLogout = async () => {
//   try {
//     await logout()
//   } finally {
//     localStorage.removeItem('accessToken')
//     setUser(null) // or something else
//     router.replace('/login')
//   }
// }
// Logout button
//     ↓
// POST /auth/logout
//     ↓
// backend очищает refreshToken cookie в HttpOnly
//     ↓
// finally
//     ↓
// remove accessToken из localStorage
//     ↓
// setUser(null) // or something else
