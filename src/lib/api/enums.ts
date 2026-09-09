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
  //SESSIONS
  SessionNotFound = 80,
  SessionUserMismatch = 82,
  SessionAccessForbidden = 83,
}

//   EmailAlreadyExists = 23, register
//   UsernameAlreadyExists = 30, register
//   PasswordsNotMatch = 53, register

//   EmailNotExists = 21, verify / login
//   EmailAlreadyConfirmed = 20 verify

//   EmailNotConfirmed = 22, login
//   UserNotFound = 33, login
//   InvalidCredentials = 51, login
//   RecaptchaInvalid = 52, forgot password

// {
//   "code": 74,
//   "errorsMessages": [
//   {
//     "field": "token",
//     "message": "Access token has expired"
//   }
// ]
// }

// Нет Access token в LS при отправке запроса
// {
//   "code":80,
//   "errorsMessages": [
//     {
//       "field":"session",
//       "message":"Session not found"
//     }
//     ]
// }
