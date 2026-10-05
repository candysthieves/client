import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '@/lib/api'
import { authKeys } from '@/lib/auth'
import { avatarKeys } from '@/lib/avatar'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'
import { profileKeys } from '@/lib/profile'
import { clearPostDraft } from '@/lib/utils'

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    meta: {
      skipGlobalError: true,
    },
    // или возможно onSuccess
    onSettled: () => {
      localStorage.removeItem(ACCESS_TOKEN_LS_KEY)
      clearPostDraft()

      queryClient.setQueryData(authKeys.me(), null)
      queryClient.removeQueries({ queryKey: authKeys.me() })
      queryClient.removeQueries({ queryKey: avatarKeys.avatar() })
      queryClient.removeQueries({ queryKey: profileKeys.all }) // check if not correct
      // add private profile later// check if needed
      queryClient.invalidateQueries({ queryKey: authKeys.me() })
    },
  })
}
