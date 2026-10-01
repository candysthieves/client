import { cookies } from 'next/headers'
import { NEXT_PUBLIC_API_URL } from '@/constants'
import { validateResponse } from '@/lib/api/validateResponse'
import { accessTokenResponseSchema } from '@/lib/model'

/**
 * Retrieves the access token on the server.
 *
 * The refresh token is stored in an HttpOnly cookie set by the API on its own domain
 * (`api.lumosapp.net`), so the browser never sends it to this app and `cookies()` cannot see it.
 * Because of that, the profile page cannot be prefetched on the server for authenticated users
 * and the client keeps loading the data after hydration.
 */
export const getServerAccessToken = async (): Promise<null | string> => {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  if (!cookieHeader) {
    return null
  }

  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        Cookie: cookieHeader,
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const text = await response.text()
    const { accessToken } = validateResponse(
      '/auth/refresh-token',
      accessTokenResponseSchema,
      text ? JSON.parse(text) : undefined
    )

    return accessToken
  } catch {
    return null
  }
}
