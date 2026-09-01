import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '@/lib/api'
import { authKeys } from '@/lib/auth'
import { ACCESS_TOKEN_LS_KEY, LoginRequest } from '@/lib/model'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),

    onSuccess: response => {
      localStorage.setItem(ACCESS_TOKEN_LS_KEY, response.accessToken)

      queryClient.invalidateQueries({
        queryKey: authKeys.me(),
      })
    },
  })
}
