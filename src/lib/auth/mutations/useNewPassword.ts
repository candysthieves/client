import { useMutation } from '@tanstack/react-query'
import { newPassword } from '@/lib/api'
import { NewPasswordRequest } from '@/lib/model'

export function useNewPassword() {
  return useMutation({
    mutationFn: (data: NewPasswordRequest) => newPassword(data),
  })
}
