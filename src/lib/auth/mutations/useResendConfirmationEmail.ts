import { useMutation } from '@tanstack/react-query'
import { resendConfirmationEmail } from '@/lib/api'
import { ResendConfirmationEmailRequest } from '@/lib/model'

export function useResendConfirmationEmail() {
  return useMutation({
    mutationFn: (data: ResendConfirmationEmailRequest) => resendConfirmationEmail(data),
  })
}
