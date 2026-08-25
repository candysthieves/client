import { useMutation } from '@tanstack/react-query'
import { registrationConfirmation } from '@/lib/api'
import { RegistrationConfirmationRequest } from '@/lib/model'

export function useRegistrationConfirmation() {
  return useMutation({
    mutationFn: (data: RegistrationConfirmationRequest) => registrationConfirmation(data),
  })
}
