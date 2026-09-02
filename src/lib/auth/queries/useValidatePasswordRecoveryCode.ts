import { useQuery } from '@tanstack/react-query'
import { validatePasswordRecoveryCode } from '@/lib/api'
import { authKeys } from '@/lib/auth'

export function useValidatePasswordRecoveryCode(recoveryCode: string) {
  return useQuery({
    queryKey: authKeys.validatePasswordRecoveryCode(recoveryCode),
    queryFn: () =>
      validatePasswordRecoveryCode({
        recoveryCode,
      }),
    enabled: Boolean(recoveryCode),
  })
}
