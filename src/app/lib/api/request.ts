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

    throw new ApiError(response.status, errorData)
  }

  const text = await response.text()

  if (!text) {
    return undefined as T
  }

  return JSON.parse(text) as T
}
