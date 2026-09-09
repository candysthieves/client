import { useQuery } from '@tanstack/react-query'
import { useSyncExternalStore } from 'react'
import { authMe } from '@/lib/api'
import { authKeys } from '@/lib/auth'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'

// localStorage isn't available during SSR, and reading it synchronously in the render body
// makes the client's first (pre-hydration) render disagree with the server's — a hydration
// error. useSyncExternalStore is React's sanctioned way to read an external, browser-only
// source: getServerSnapshot for SSR/hydration, getSnapshot once actually on the client.
const subscribe = () => () => {}
const getSnapshot = () => localStorage.getItem(ACCESS_TOKEN_LS_KEY)
const getServerSnapshot = () => null

export function useAuthMe() {
  const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authMe,
    retry: false,
    enabled: !!token, // check if refresh token will not work properly
  })
}

// обновляем после операций, которые меняют authentication state.
