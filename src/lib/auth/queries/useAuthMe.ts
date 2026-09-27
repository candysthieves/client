import { useQuery } from '@tanstack/react-query'
import { useSyncExternalStore } from 'react'
import { authMe } from '@/lib/api'
import { authKeys } from '@/lib/auth'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'

// localStorage isn't available during SSR, and reading it synchronously in the render body
// makes the client's first (pre-hydration) render disagree with the server's — a hydration
// error. useSyncExternalStore is React's sanctioned way to read an external, browser-only
// source: getServerSnapshot for SSR/hydration, getSnapshot once actually on the client.
// `undefined` means "not known yet" (server + hydration), `null` means "known: no token".
// Only a `null` snapshot is allowed to decide what to render, otherwise the server picks the
// anonymous branch and ships it in the HTML.
type AccessTokenSnapshot = null | string | undefined

const subscribe = () => () => {}
const getSnapshot = (): AccessTokenSnapshot => localStorage.getItem(ACCESS_TOKEN_LS_KEY)
const getServerSnapshot = (): AccessTokenSnapshot => undefined

export function useAuthMe() {
  const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const isHydrated = token !== undefined

  const query = useQuery({
    queryKey: authKeys.me(),
    queryFn: authMe,
    retry: false,
    enabled: !!token, // check if refresh token will not work properly
  })

  return { ...query, isHydrated }
}

// обновляем после операций, которые меняют authentication state.
