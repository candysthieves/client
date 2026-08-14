import type {
  LoginRequest,
  LoginResponse,
  RegistrationConfirmationRequest,
  RegistrationRequest,
  ResendConfirmationEmailRequest,
} from '@/lib/model'
import { request } from './request'

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
  request<void>('/auth/registration-confirmation', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const resendConfirmationEmail = (data: ResendConfirmationEmailRequest) =>
  request<void>('/auth/resend-confirmation-email', {
    method: 'POST',
    body: JSON.stringify(data),
  })
