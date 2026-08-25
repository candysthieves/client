import { useMutation, useQueryClient } from '@tanstack/react-query'
import { refreshToken } from '@/lib/api'
import { authKeys } from '@/lib/auth'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'

export function useRefreshToken() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: refreshToken,

    onSuccess: async ({ accessToken }) => {
      localStorage.setItem(ACCESS_TOKEN_LS_KEY, accessToken)

      await queryClient.invalidateQueries({
        queryKey: authKeys.me(), // check
      })
    },
  })
}
