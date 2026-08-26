export { authKeys } from './authKeys'
export { useAuthMe } from './queries/useAuthMe' // useQuery
export { useLogin } from './mutations/useLogin' //useMutation
export { useLogout } from './mutations/useLogout' // useMutation
export { useRegistration } from './mutations/useRegistration' // useMutation
export { useRegistrationConfirmation } from './mutations/useRegistrationConfirmation' // useMutation
export { useResendConfirmationEmail } from './mutations/useResendConfirmationEmail' // useMutation
export { usePasswordRecovery } from './mutations/usePasswordRecovery' // useMutation
export { useValidatePasswordRecoveryCode } from './queries/useValidatePasswordRecoveryCode' // useQuery
export { useNewPassword } from './mutations/useNewPassword' // useMutation

// refreshToken не Query, а обычная функция пока не превращаем в useMutation() т.к. refresh у нас является частью request()
