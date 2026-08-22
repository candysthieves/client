// import { ToastSuccess } from '@/components'
// import { NEXT_PUBLIC_API_URL } from '@/constants'
// import { ACCESS_TOKEN_LS_KEY, SIGN_IN_SUCCESS_MESSAGE, SIGN_IN_SUCCESS_TITLE } from '@/lib/model'
// import { isErrorResponse, refreshAccessToken } from '@/lib/utils'
// import { ApiError } from './apiError'
//
// let refreshPromise: null | Promise<string> = null
//
// export async function request<T>(input: string, init?: RequestInit): Promise<T> {
//   const accessToken =
//     typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_LS_KEY) : undefined
//
//   let response = await fetch(`${NEXT_PUBLIC_API_URL}${input}`, {
//     ...init,
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//       ...(accessToken && {
//         Authorization: `Bearer ${accessToken}`,
//       }),
//       ...init?.headers,
//     },
//   })
//
//   /**
//    * Refresh token error 401 - revalidate refresh token - logic starts
//    * In the case of simultaneous 401 errors, only one `/auth/refresh-token` request will execute,
//    * while the others will wait for its result.
//    *
//    * Revalidate access token flow (not refresh token, refresh token is set in the HttpOnly cookies by backend):
//    * API request with token -> response 401 (access token invalid) -> refreshAccessToken() -> POST /auth/refresh-token ->
//    * -> HttpOnly refreshToken auto sending -> response code 200 with body { accessToken: newToken } ->
//    * -> localStorage.setItem(ACCESS_TOKEN_LS_KEY, 'new-token') -> resending the original initial request -> success code (200, ...)
//    */
//   if (response.status === 401) {
//     // 401 приходит как при ошибке истекшего access token, так и при domain error при sign-in (InvalidCredentials),
//     // поэтому мы должны разделить этих два кейса:
//
//     // 1. 401 при domain error при sign-in (с InvalidCredentials error message)
//     // клонируем body response т.к. стрим можем прочитать только один раз
//     const clonedResponse = response.clone()
//
//     let errorData: unknown
//
//     try {
//       const text = await clonedResponse.text()
//       errorData = text ? JSON.parse(text) : undefined
//     } catch {
//       errorData = undefined
//     }
//     // 401 с backend error response — это ошибка самого запроса.
//     // Например при sign-in: code 51 InvalidCredentials.
//     if (isErrorResponse(errorData)) {
//       throw new ApiError(response.status, errorData)
//     }
//
//     try {
//       // 2. Только обычный 401 без domain error, т.е. пришло при истекшем access token, далее используем для refresh access token
//       /**
//        * The first request creates a Promise. All subsequent requests receive the same Promise and wait for it
//        */
//       if (!refreshPromise) {
//         refreshPromise = refreshAccessToken().finally(() => {
//           refreshPromise = null
//         })
//       }
//       // waiting of the Promise ends
//
//       const newAccessToken = await refreshPromise
//
//       response = await fetch(`${NEXT_PUBLIC_API_URL}${input}`, {
//         ...init,
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${newAccessToken}`,
//           ...init?.headers,
//         },
//       })
//     } catch (error) {
//       localStorage.removeItem(ACCESS_TOKEN_LS_KEY)
//
//       if (error instanceof ApiError) {
//         throw error
//       }
//
//       throw new ApiError(401, undefined) // the user becomes unauthorized (sends to auth logic to log out user)
//     }
//   }
//   // Refresh token error - revalidate refresh token logic ends
//
//   if (!response.ok) {
//     let errorData: unknown
//
//     try {
//       const text = await response.text()
//       errorData = text ? JSON.parse(text) : undefined
//     } catch {
//       errorData = undefined
//     }
//     console.log(errorData)
//     throw new ApiError(response.status, errorData)
//   }
//
//   const text = await response.text()
//
//   if (!text) {
//     return undefined as T
//   }
//
//   return JSON.parse(text) as T
// }
//
// /**
//  * A subsequent request following a refresh might now also return a 401—and we don't attempt to refresh it again.
//  * This is intentional to avoid an infinite loop.
//  * In this scenario, the error propagates outward, allowing the AuthProvider or subsequent logic to treat the session as invalid.
//  *
//  * if access token and !!! refresh token !!! are invalid:
//  *  GET /auth/me -> 401 -> POST /auth/refresh-token -> 401 -> localStorage.removeItem(ACCESS_TOKEN_LS_KEY) -> request() throws ApiError
//  *
//  * try {
//  *   const user = await authMe()
//  * } catch (error) {
//  *   // we get gere
//  * }
//  *
//  * the user becomes unauthorized (logged out)
//  *
//  * try {
//  *   const user = await authMe()
//  *   setUser(user)
//  * } catch {
//  *   setUser(null)
//  * }
//  */
//
// // CORS
// // https://lumosapp.net/api/v1
// // https://dev.lumosapp.net:3000/api/v1
// // http://localhost:3000/api/v1
//
// // const handleLogout = async () => {
// //   try {
// //     await logout()
// //       ToastWarning({
// //         title: 'Signed out successfully',
// //         message: 'You have been successfully signed out. See you soon!',
// //       })
// //   } finally {
// //     localStorage.removeItem(ACCESS_TOKEN_LS_KEY)
// //     // setUser(null) // or something else
// //     router.replace('/login')
// //   }
// // }
// // Logout button
// //     ↓
// // POST /auth/logout
// //     ↓
// // backend очищает refreshToken cookie в HttpOnly
// //     ↓
// // finally
// //     ↓
// // remove accessToken из localStorage
// //     ↓
// // setUser(null) // or something else

import { ToastSuccess } from '@/components'
import { NEXT_PUBLIC_API_URL } from '@/constants'
import { ACCESS_TOKEN_LS_KEY, SIGN_IN_SUCCESS_MESSAGE, SIGN_IN_SUCCESS_TITLE } from '@/lib/model'
import { isErrorResponse, refreshAccessToken } from '@/lib/utils'
import { ApiError } from './apiError'

let refreshPromise: null | Promise<string> = null

export async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_LS_KEY) : undefined

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
   *
   *
   * 401 can mean two different things:
   *
   * 1. Domain error
   *    Example:
   *    {
   *      code: 51,
   *      errorsMessages: [{
   *             "field": "credentials",
   *             "message": "Invalid email or password"
   *         }]
   *    }
   *
   *    In this case we DON'T refresh the access token.
   *
   * 2. Access token is invalid/expired.
   *    In this case backend returns a plain 401,
   *    so we try to refresh the access token.
   *
   */
  if (response.status === 401) {
    // 1. 401 при domain error при sign-in (с InvalidCredentials error message)
    // клонируем body response т.к. стрим можем прочитать только один раз
    const clonedResponse = response.clone()

    let errorData: unknown

    try {
      const text = await clonedResponse.text()
      errorData = text ? JSON.parse(text) : undefined
    } catch {
      errorData = undefined
    }
    // 401 с backend error response — это ошибка самого запроса.
    // Например при sign-in: code 51 InvalidCredentials (This error must go directly to the caller)
    if (isErrorResponse(errorData)) {
      throw new ApiError(response.status, errorData)
    }

    /**
     * Plain 401 means that the access token is invalid/expired - is used to refresh access token.
     * Start refresh-token flow.
     */
    try {
      /**
       * If several requests receive 401 simultaneously,
       * only one refresh request is sent.
       *
       * Other requests wait for the same Promise.
       */
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null
        })
      }
      // waiting of the Promise ends

      const newAccessToken = await refreshPromise

      /**
       * Retry the original request with the new access token.
       */
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
      /**
       * Refresh failed.
       *
       * Backend now returns:
       * 498 Invalid refresh token
       *
       * Therefore, the refresh token is no longer valid and
       * the access token must be removed from localStorage.
       */

      localStorage.removeItem(ACCESS_TOKEN_LS_KEY)

      if (error instanceof ApiError) {
        throw error
      }

      // не «refresh token invalid», а не удалось выполнить refresh вообще - отсавить что-то одно
      throw new ApiError(401, undefined) // the user becomes unauthorized (sends to auth logic to log out user) - ЭТОТ ВАРИАНТ ВЕРНУТЬ ЕСЛИ ЧТО
      // a если с невалидным refresh token то:
      // throw new ApiError(498, undefined) // the user becomes unauthorized
    }
  }
  // Refresh token error - revalidate refresh token logic ends

  /**
   * The retried request may also return 401.
   *
   * We DON'T refresh again here.
   * This prevents an infinite refresh loop.
   */
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

// GET /auth/me
//       │
// ├── 200 → вернуть результат
// │
// └── 401
//      │
//      ├── есть domain error
//      │      └── например code 51
//      │           → НЕ refresh
//      │           → ApiError(401, errorData)
//      │
//      └── нет domain error
//                   │
//                   ↓
//             POST /auth/refresh-token
//                   │
//                   ├── 200 → сохранить новый accessToken
//                   │       → повторить исходный запрос
//                   │
//                   └── 498 → refresh token недействителен
//                           → удалить accessToken
//                           → пользователь не авторизован

// CORS
// https://lumosapp.net/api/v1
// https://dev.lumosapp.net:3000/api/v1
// http://localhost:3000/api/v1

// const handleLogout = async () => {
//   try {
//     await logout()
//       ToastWarning({
//         title: 'Signed out successfully',
//         message: 'You have been successfully signed out. See you soon!',
//       })
//   } finally {
//     localStorage.removeItem(ACCESS_TOKEN_LS_KEY)
//     // setUser(null) // or something else
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
