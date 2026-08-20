// 'use client'
//
// import { useEffect, useState } from 'react'
// import { ApiError, authMe } from '@/lib/api'
// // import type { UserResponse } from '@/lib/model'
// import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'
//
// type UseAuthReturn = {
//   // user: UserResponse | null
//   user: null | unknown
//   isLoading: boolean
//   isAuthenticated: boolean
// }
//
// export function useAuth(): UseAuthReturn {
//   // const [user, setUser] = useState<UserResponse | null>(null)
//   // const [isLoading, setIsLoading] = useState(true)
//   //
//   // useEffect(() => {
//   //   let isMounted = true
//   //
//   //   const checkAuth = async () => {
//   //     const accessToken = localStorage.getItem(ACCESS_TOKEN_LS_KEY)
//   //
//   //     /**
//   //      * There is no access token.
//   //      * Therefore, there is no reason to call /auth/me.
//   //      */
//   //     if (!accessToken) {
//   //       if (isMounted) {
//   //         setUser(null)
//   //         setIsLoading(false)
//   //       }
//   //
//   //       return
//   //     }
//   //
//   //     try {
//   //       /**
//   //        * /auth/me
//   //        *
//   //        * request() automatically:
//   //        * 1. adds Authorization: Bearer <accessToken>
//   //        * 2. handles 401
//   //        * 3. calls /auth/refresh-token
//   //        * 4. saves a new accessToken
//   //        * 5. retries the original request
//   //        */
//   //       const user = await authMe()
//   //
//   //       if (isMounted) {
//   //         setUser(user)
//   //       }
//   //     } catch (error) {
//   //       /**
//   //        * If /auth/me ultimately returns 401,
//   //        * the session is considered invalid.
//   //        *
//   //        * request() has already removed the accessToken
//   //        * when refresh failed.
//   //        */
//   //       if (error instanceof ApiError && error.status === 401) {
//   //         if (isMounted) {
//   //           setUser(null)
//   //         }
//   //       } else {
//   //         /**
//   //          * Other errors are not necessarily authentication errors.
//   //          * For now we also consider the user unauthenticated,
//   //          * but this can later be handled separately.
//   //          */
//   //         if (isMounted) {
//   //           setUser(null)
//   //         }
//   //
//   //         console.error(error)
//   //       }
//   //     } finally {
//   //       if (isMounted) {
//   //         setIsLoading(false)
//   //       }
//   //     }
//   //   }
//   //
//   //   void checkAuth()
//   //
//   //   return () => {
//   //     isMounted = false
//   //   }
//   // }, [])
//   //
//   // return {
//   //   user,
//   //   isLoading,
//   //   isAuthenticated: user !== null,
//   // }
// }
