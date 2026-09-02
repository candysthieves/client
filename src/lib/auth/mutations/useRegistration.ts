import { useMutation } from '@tanstack/react-query'
import { registration } from '@/lib/api'
import { RegistrationRequest } from '@/lib/model'

export function useRegistration() {
  return useMutation({
    mutationFn: (data: RegistrationRequest) => registration(data),
  })
}
