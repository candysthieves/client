import { request } from '@/lib/api/request'
import {
  LoginRequest,
  LoginResponse,
  PasswordRecoveryRequest,
  RegistrationConfirmationRequest,
  RegistrationRequest,
  ResendConfirmationEmailRequest,
} from '@/lib/model'

export const login = (data: LoginRequest) =>
  request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })

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

// login()
// logout()
// newPassword()
