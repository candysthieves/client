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
 * Server-side request. The access token is never available here: it lives in
 * localStorage on the client, and the HttpOnly refresh cookie belongs to the API domain.
 *
 * Profile and post endpoints are public, so the same request is sent for every viewer.
 *
 * Responses are never cached.
 */
export const serverRequest = async (input: string, init?: RequestInit): Promise<unknown> => {
  const headers = new Headers(init?.headers)

  headers.set('Accept', 'application/json')

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
  init?: RequestInit
): Promise<z.infer<S>> => validateResponse(url, schema, await serverRequest(url, init))
