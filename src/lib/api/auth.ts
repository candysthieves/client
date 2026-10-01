import { request } from '@/lib/api/request'
import { requestValidated } from '@/lib/api/requestValidated'
import {
  accessTokenResponseSchema,
  LoginRequest,
  LoginResponse,
  loginResponseSchema,
  NewPasswordRequest,
  PasswordRecoveryRequest,
  RegistrationConfirmationRequest,
  RegistrationRequest,
  ResendConfirmationEmailRequest,
  UserResponse,
  userResponseSchema,
  ValidatePasswordRecoveryCodeRequest,
} from '@/lib/model'

export const login = (data: LoginRequest): Promise<LoginResponse> => {
  return requestValidated('/auth/login', loginResponseSchema, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const registration = (data: RegistrationRequest) =>
  request<void>('/auth/registration', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const registrationConfirmation = (data: RegistrationConfirmationRequest) =>
  // or token
  request<void>('/auth/registration-confirmation', {
    method: 'POST',
    body: JSON.stringify(data), // почему body в swagger пустое, какие ответы приходят при TOKEN expired
  })

export const resendConfirmationEmail = (data: ResendConfirmationEmailRequest) =>
  request<void>('/auth/resend-confirmation-email', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const passwordRecovery = (data: PasswordRecoveryRequest) =>
  request<void>('/auth/password-recovery', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const newPassword = (data: NewPasswordRequest) =>
  request<void>('/auth/new-password', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const refreshToken = () =>
  requestValidated('/auth/refresh-token', accessTokenResponseSchema, {
    method: 'POST',
  })

export const logout = () =>
  request<void>('/auth/logout', {
    method: 'POST',
  })

// method: 'GET'
export const authMe = (): Promise<UserResponse> => requestValidated('/auth/me', userResponseSchema)

// method: 'GET'
export const validatePasswordRecoveryCode = ({
  recoveryCode,
}: ValidatePasswordRecoveryCodeRequest) =>
  request<void>(`/auth/password-recovery/validate?recoveryCode=${encodeURIComponent(recoveryCode)}`)
