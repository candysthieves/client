import { useMutation } from '@tanstack/react-query'
import { passwordRecovery } from '@/lib/api'
import { PasswordRecoveryRequest } from '@/lib/model'

export function usePasswordRecovery() {
  return useMutation({
    mutationFn: (data: PasswordRecoveryRequest) => passwordRecovery(data),
  })
}
