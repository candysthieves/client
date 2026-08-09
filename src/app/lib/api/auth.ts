import type {
  LoginRequest,
  LoginResponse,
  RegistrationConfirmationRequest,
  RegistrationRequest,
  ResendConfirmationEmailRequest,
} from '@/features/auth/model'
import { request } from './request'

export const login = (data: LoginRequest) =>
  request<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const registration = (data: RegistrationRequest) =>
  request<void>('/api/auth/registration', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const registrationConfirmation = (data: RegistrationConfirmationRequest) =>
  request<void>('/api/auth/registration-confirmation', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const resendConfirmationEmail = (data: ResendConfirmationEmailRequest) =>
  request<void>('/api/auth/resend-confirmation-email', {
    method: 'POST',
    body: JSON.stringify(data),
  })
