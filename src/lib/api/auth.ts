import { request } from '@/lib/api/request'
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

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await request<unknown>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  return loginResponseSchema.parse(response)
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

export const refreshToken = async () => {
  const response = await request<unknown>('/auth/refresh-token', {
    method: 'POST',
  })

  return accessTokenResponseSchema.parse(response)
}

export const logout = () =>
  request<void>('/auth/logout', {
    method: 'POST',
  })

// method: 'GET'
export const authMe = async (): Promise<UserResponse> => {
  const response = await request<unknown>('/auth/me')

  return userResponseSchema.parse(response)
}

// method: 'GET'
export const validatePasswordRecoveryCode = ({
  recoveryCode,
}: ValidatePasswordRecoveryCodeRequest) =>
  request<void>(`/auth/password-recovery/validate?recoveryCode=${encodeURIComponent(recoveryCode)}`)
