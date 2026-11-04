// import { NEXT_PUBLIC_API_URL } from '@/constants'
// import { ApiError } from '@/lib/api'
// import { ACCESS_TOKEN_LS_KEY, AccessTokenResponse } from '@/lib/model'
//
// export const refreshAccessToken = async (): Promise<string> => {
//   const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//
//   if (!response.ok) {
//     // Также обработает и 498 Invalid refresh token
//     throw new ApiError(response.status, undefined)
//   }
//
//   const text = await response.text()
//
//   if (!text) {
//     throw new ApiError(response.status, undefined)
//   }
//
//   const data = JSON.parse(text) as AccessTokenResponse
//
//   localStorage.setItem(ACCESS_TOKEN_LS_KEY, data.accessToken)
//
//   return data.accessToken
// }

import { NEXT_PUBLIC_API_URL } from '@/constants'
import { ApiError } from '@/lib/api'
import { ACCESS_TOKEN_LS_KEY, AccessTokenResponse, accessTokenResponseSchema } from '@/lib/model'

let refreshPromise: null | Promise<string> = null

const performRefresh = async (): Promise<string> => {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new ApiError(response.status, undefined)
  }

  const text = await response.text()

  if (!text) {
    throw new ApiError(response.status, undefined)
  }

  const data = JSON.parse(text) as AccessTokenResponse
  // const data = accessTokenResponseSchema.safeParse(await response.json()) TODO change later
  // if (!data.success) {
  //   throw new Error('Invalid refresh token response')
  // }

  localStorage.setItem(ACCESS_TOKEN_LS_KEY, data.accessToken)

  return data.accessToken
}

export const refreshAccessToken = (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = performRefresh().finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}
