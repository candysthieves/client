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
  InvalidCredentials = 51, // comes with 401
  RecaptchaInvalid = 52,
  PasswordsNotMatch = 53,
  // POSTS
  PostNotFound = 55,
  PostAlreadyExists = 56,
  FilesServiceUnavailable = 57,
  PostAccessForbidden = 58,
  // REFRESH TOKEN
  RefreshTokenInvalid = 70,
  RefreshTokenMissing = 71,
  RefreshTokenExpired = 72,
  // ACCESS TOKEN
  AccessTokenInvalid = 73,
  AccessTokenExpired = 74,
  // SESSIONS
  SessionNotFound = 80,
  SessionUserMismatch = 82,
  SessionAccessForbidden = 83,
  // SUBSCRIPTIONS / PAYMENTS
  TariffNotFound = 90,
  SubscriptionStillProcessing = 93,
  SubscriptionNotFound = 94,
  PaymentServiceUnavailable = 95, // TODO check 95 or 96
}
