import { useQuery } from '@tanstack/react-query'
import { validatePasswordRecoveryCode } from '@/lib/api'
import { authKeys } from '@/lib/auth'

export function useValidatePasswordRecoveryCode(recoveryCode: string) {
  return useQuery({
    queryKey: authKeys.validatePasswordRecoveryCode(recoveryCode),
    queryFn: async () => {
      await validatePasswordRecoveryCode({ recoveryCode })
      return true // empty body in response with 204 - useQuery can not return undefined
    },
    enabled: Boolean(recoveryCode),
  })
}
