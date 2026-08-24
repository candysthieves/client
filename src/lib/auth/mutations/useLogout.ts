import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '@/lib/api'
import { authKeys } from '@/lib/auth'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,

    // или возможно onSettled
    onSuccess: () => {
      localStorage.removeItem(ACCESS_TOKEN_LS_KEY)

      queryClient.removeQueries({
        queryKey: authKeys.me(), // not authKeys.all (т.к. recovery code не является authentication state текущего пользователя)
      })
    },
  })
}
