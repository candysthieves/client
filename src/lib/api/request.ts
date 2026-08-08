import { ApiError } from './apiError'

export async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const isRelativeUrl = input.startsWith('/')

  const url =
    typeof window === 'undefined' && isRelativeUrl ? `${process.env.APP_URL}${input}` : input

  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
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

// // DON`T DELETE
// Когда request() вызывается:
//   из Client Component
// request('/api/auth/registration')
// то
// typeof window !== 'undefined'
// поэтому URL остается
// /api/auth/registration
// и браузер сам делает
// https://dev.lumosapp.net:3000/api/auth/registration

// Когда request() вызывается из VerifyPage (Server Component)
// request('/api/auth/registration-confirmation')
// то
// typeof window === 'undefined'
// поэтому получится
// https://dev.lumosapp.net:3000/api/auth/registration-confirmation
// и Node сможет выполнить fetch().
