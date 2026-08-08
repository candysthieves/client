import { request } from '@/lib/api/request'
import { RegistrationConfirmationDto, RegistrationDto, ResendConfirmationEmailDto } from './types'

export const registration = (data: RegistrationDto) =>
  request<void>('/api/auth/registration', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const registrationConfirmation = (data: RegistrationConfirmationDto) =>
  // or token
  request<void>('/api/auth/registration-confirmation', {
    method: 'POST',
    body: JSON.stringify(data), // почему body в swagger пустое, какие ответы приходят при TOKEN expired
  })

export const resendConfirmationEmail = (data: ResendConfirmationEmailDto) =>
  request<void>('/api/auth/resend-confirmation-email', {
    method: 'POST',
    body: JSON.stringify(data),
  })

// login()
// logout()
// passwordRecovery()
// newPassword()
