import type { z } from 'zod'
import { NEXT_PUBLIC_API_URL } from '@/constants'
import { ApiError } from '@/lib/api/apiError'
import { validateResponse } from '@/lib/api/validateResponse'

const readResponseData = async (response: Response): Promise<unknown> => {
  const text = await response.text()

  try {
    return text ? JSON.parse(text) : undefined
  } catch {
    return undefined
  }
}

/**
 * Server-side request. The access token is passed explicitly,
 * because localStorage is not available on the server.
 *
 * Personalized responses are never cached.
 */
export const serverRequest = async (
  input: string,
  accessToken: string,
  init?: RequestInit
): Promise<unknown> => {
  const headers = new Headers(init?.headers)

  headers.set('Accept', 'application/json')

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  const response = await fetch(`${NEXT_PUBLIC_API_URL}${input}`, {
    ...init,
    headers,
    cache: 'no-store',
  })

  const data = await readResponseData(response)

  if (!response.ok) {
    throw new ApiError(response.status, data)
  }

  return data
}

export const serverRequestValidated = async <S extends z.ZodTypeAny>(
  url: string,
  schema: S,
  accessToken: string,
  init?: RequestInit
): Promise<z.infer<S>> => validateResponse(url, schema, await serverRequest(url, accessToken, init))
