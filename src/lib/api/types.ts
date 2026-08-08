export type RegistrationDto = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
  isTermsAccepted: boolean
}

export type ResendConfirmationEmailDto = {
  email: string
}

export type RegistrationConfirmationDto = {
  code: string
}

export type ErrorResponse = {
  errorsMessages: {
    field: string
    message: string
  }[]
}

// LoginDto
// PasswordRecoveryDto
// NewPasswordDto
