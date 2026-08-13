export enum ErrorStatus {
  // EMAIL
  EmailAlreadyConfirmed = 20,
  EmailNotExists = 21,
  EmailNotConfirmed = 22,
  EmailAlreadyExists = 23,
  // USERNAME
  UsernameAlreadyExists = 30,
  UserNotFound = 33,
  // CONFIRMATION CODE
  ConfirmationCodeExpired = 40,
  ConfirmationCodeInvalid = 41,
  // RECOVERY CODE
  RecoveryCodeExpired = 42,
  RecoveryCodeInvalid = 43,
  // VALIDATION
  ValidationError = 50, // common error code for all validation errors in forms
  InvalidCredentials = 51,
  RecaptchaInvalid = 52,
  PasswordsNotMatch = 53,
  // REFRESH TOKEN
  RefreshTokenInvalid = 70,
  RefreshTokenMissing = 71,
  RefreshTokenExpired = 72,
  //SESSIONS
  SessionNotFound = 80,
  SessionUserMismatch = 82,
  SessionAccessForbidden = 83,
}

// EmailAlreadyConfirmed = 20,
//   EmailNotExists = 21,
//   EmailNotConfirmed = 22,
//   EmailAlreadyExists = 23,
//   UsernameAlreadyExists = 30,
//   UserNotFound = 33,
//   InvalidCredentials = 51,
//   RecaptchaInvalid = 52,
//   PasswordsNotMatch = 53,
