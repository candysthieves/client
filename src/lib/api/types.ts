export type RegistrationDto = {
  // use type from schema
  username: string
  email: string
  password: string
  passwordConfirmation: string
  isTermsAccepted: boolean
}

export type RegistrationConfirmationDto = {
  // use type from schema
  code: string
}

export type ErrorResponse = {
  // use type from schema
  errorsMessages: {
    field: string
    message: string
  }[]
}

// LoginDto - use type from schema
// PasswordRecoveryDto - use type from schema
// NewPasswordDto - use type from schema
