import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '@/lib/api'
import { authKeys } from '@/lib/auth'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'
import { clearPostDraft } from '@/lib/utils'

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,

    // или возможно onSuccess
    onSettled: () => {
      localStorage.removeItem(ACCESS_TOKEN_LS_KEY)
      clearPostDraft()

      queryClient.setQueryData(authKeys.me(), null)
      queryClient.removeQueries({ queryKey: authKeys.me() })
      queryClient.invalidateQueries({ queryKey: authKeys.me() })
    },
  })
}
