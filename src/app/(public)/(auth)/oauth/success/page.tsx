// 'use client'
//
// import { useRouter } from 'next/navigation'
// import { useCallback, useEffect } from 'react'
// import { ApiError } from '@/lib/api'
// import { useRefreshToken } from '@/lib/auth/mutations/useRefreshToken'
// import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'
//
// export default function OAuthSuccessPage() {
//   const router = useRouter()
//   const { mutate: refreshToken } = useRefreshToken()
//
//   const handleAuthentication = useCallback(() => {
//     refreshToken(
//       undefined, // mutation refreshToken не принимает аргументы
//       {
//         // до Tanstack query было: const { accessToken } = await refreshToken()
//         onSuccess: ({ accessToken }) => {
//           localStorage.setItem(ACCESS_TOKEN_LS_KEY, accessToken)
//
//           router.replace('/') // или '/profile'
//         },
//         onError: error => {
//           if (error instanceof ApiError) {
//             console.error('OAuth error:', error.message)
//           } else {
//             console.error('Unexpected error:', error)
//           }
//
//           router.replace('/sign-in')
//           // throw error
//         },
//       }
//     )
//   }, [refreshToken, router])
//
//   useEffect(() => {
//     handleAuthentication()
//   }, [handleAuthentication])
//
//   return null
// }

'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { ApiError } from '@/lib/api'
import { useRefreshToken } from '@/lib/auth/mutations/useRefreshToken'

export default function OAuthSuccessPage() {
  const router = useRouter()
  const { mutate: refreshToken } = useRefreshToken()

  const handleAuthentication = useCallback(() => {
    refreshToken(
      undefined, // mutation refreshToken не принимает аргументы
      {
        // до Tanstack query было: const { accessToken } = await refreshToken()
        onSuccess: () => {
          router.replace('/') // или '/profile'
        },

        onError: error => {
          if (error instanceof ApiError) {
            console.error('OAuth error:', error.message)
          } else {
            console.error('Unexpected error:', error)
          }

          router.replace('/sign-in')
          // throw error
        },
      }
    )
  }, [refreshToken, router])

  useEffect(() => {
    handleAuthentication()
  }, [handleAuthentication])

  return null
}
