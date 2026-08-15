import { request } from '@/lib/api/request'
import {
  ACCESS_TOKEN_LS_KEY,
  AccessTokenResponse,
  RegistrationConfirmationRequest,
  RegistrationRequest,
  ResendConfirmationEmailRequest,
  UserResponse,
} from '@/lib/model'

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

export const refreshToken = () =>
  request<AccessTokenResponse>('/auth/refresh-token', {
    method: 'POST',
  })

// method: 'GET'
// How to use: const user = await authMe()
export const authMe = () => request<UserResponse>('/auth/me')

export const logout = () =>
  request<void>('/auth/logout', {
    method: 'POST',
  })

// login()
// passwordRecovery()
// newPassword()
