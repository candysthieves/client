import { NEXT_PUBLIC_API_URL } from '@/constants'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'
import { ApiError } from './apiError'

export async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_LS_KEY)

  const response = await fetch(`${NEXT_PUBLIC_API_URL}${input}`, {
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

// CORS
// https://lumosapp.net/api/v1
// https://dev.lumosapp.net:3000/api/v1
// http://localhost:3000/api/v1

// обработать 401 → refresh-token → повторить исходный запрос
// logout → удалить accessToken + вызвать logout endpoint, если он предусмотрен backend
// useAuth

// const handleLogout = async () => {
//   try {
//     await logout()
//   } finally {
//     localStorage.removeItem('accessToken')
//     router.replace('/login')
//   }
// }
