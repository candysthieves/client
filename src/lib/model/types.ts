import { z } from 'zod'
import {
  accessTokenResponseSchema,
  apiErrorResponseSchema,
  errorMessageSchema,
  loginResponseSchema,
  loginSchema,
  newPasswordSchema,
  passwordRecoverySchema,
  registrationConfirmationSchema,
  registrationSchema,
  resendConfirmationEmailSchema,
  userResponseSchema,
  validatePasswordRecoveryCodeSchema,
} from './auth.schemas'
import { feedPostsResponseSchema } from './feed.schemas'
import {
  commentSchema,
  imageMediaSchema,
  postAuthorSchema,
  postDetailsSchema,
  postSchema,
} from './post.schemas'
import { profilePostSchema, profilePostsResponseSchema, userProfileSchema } from './profile.schemas'
import { usersCountResponseSchema } from './users.schemas'

// Auth
export type AccessTokenResponse = z.infer<typeof accessTokenResponseSchema>
export type ErrorMessageResponse = z.infer<typeof errorMessageSchema>
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>
export type LoginRequest = z.infer<typeof loginSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
export type NewPasswordRequest = z.infer<typeof newPasswordSchema>
export type PasswordRecoveryRequest = z.infer<typeof passwordRecoverySchema>
export type Post = z.infer<typeof postSchema>
export type PostAuthor = z.infer<typeof postAuthorSchema>
export type PostDetails = z.infer<typeof postDetailsSchema>
export type PostImage = z.infer<typeof imageMediaSchema>
export type Comment = z.infer<typeof commentSchema>
export type RegistrationConfirmationRequest = z.infer<typeof registrationConfirmationSchema>
export type RegistrationRequest = z.infer<typeof registrationSchema>
export type ResendConfirmationEmailRequest = z.infer<typeof resendConfirmationEmailSchema>
export type ValidatePasswordRecoveryCodeRequest = z.infer<typeof validatePasswordRecoveryCodeSchema>
export type UserResponse = z.infer<typeof userResponseSchema>
export type ProfilePost = z.infer<typeof profilePostSchema>
export type ProfilePostsResponse = z.infer<typeof profilePostsResponseSchema>
export type UserProfile = z.infer<typeof userProfileSchema>
export type RegistrationErrorField = keyof RegistrationRequest
export type LoginErrorField = 'credentials' | 'email'
export type LoginField = keyof LoginRequest
export type PasswordRecoveryField = keyof PasswordRecoveryRequest
// export type AuthType = 'github' | 'google'
export type NewPasswordField = keyof NewPasswordRequest
export type UsersCountResponse = z.infer<typeof usersCountResponseSchema>
export type FeedPostsResponse = z.infer<typeof feedPostsResponseSchema>
