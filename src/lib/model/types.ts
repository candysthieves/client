import { z } from 'zod'
import {
  availableAccountTypeSchema,
  availableAccountTypesResponseSchema,
  checkoutSchema,
  createPaymentStateSchema,
  paymentServiceSchema,
  paymentStatusSchema,
  subscriptionHistoryItemSchema,
  subscriptionHistoryResponseSchema,
  subscriptionSchema,
  subscriptionsResponseSchema,
  subscriptionTypeSchema,
} from '@/lib/model/subscriptions.schemas'
import {
  accessTokenResponseSchema,
  accountTypeSchema,
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
import { imageSchema } from './image.schemas'
import {
  avatarSchema,
  commentSchema,
  deletedPostItemSchema,
  getDeletedPostsResponseSchema,
  postAuthorSchema,
  postSchema,
} from './post.schemas'
import {
  profilePostSchema,
  profilePostsResponseSchema,
  userProfileSchema,
  viewerStatusSchema,
} from './profile.schemas'
import {
  cityIdSchema,
  countryIdSchema,
  editProfileSchema,
  locationCitySchema,
  locationCountrySchema,
  myProfileResponseSchema,
  refinedEditProfileSchema,
  updateMyProfileRequestSchema,
} from './profileSettings.schemas'
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
export type Avatar = z.infer<typeof avatarSchema>
export type Comment = z.infer<typeof commentSchema>
export type RegistrationConfirmationRequest = z.infer<typeof registrationConfirmationSchema>
export type RegistrationRequest = z.infer<typeof registrationSchema>
export type ResendConfirmationEmailRequest = z.infer<typeof resendConfirmationEmailSchema>
export type ValidatePasswordRecoveryCodeRequest = z.infer<typeof validatePasswordRecoveryCodeSchema>
export type AccountType = z.infer<typeof accountTypeSchema>
export type SubscriptionType = z.infer<typeof subscriptionTypeSchema>
export type UserResponse = z.infer<typeof userResponseSchema>
export type ProfilePost = z.infer<typeof profilePostSchema>
export type ProfilePostsResponse = z.infer<typeof profilePostsResponseSchema>
export type UserProfile = z.infer<typeof userProfileSchema>
export type EditProfileRequest = z.infer<typeof editProfileSchema>
export type RefinedEditProfileRequest = z.infer<typeof refinedEditProfileSchema>
export type MyProfileResponse = z.infer<typeof myProfileResponseSchema>
export type UpdateMyProfileRequest = z.infer<typeof updateMyProfileRequestSchema>
export type RegistrationErrorField = keyof RegistrationRequest
export type LoginErrorField = 'credentials' | 'email'
export type LoginField = keyof LoginRequest
export type PasswordRecoveryField = keyof PasswordRecoveryRequest
// export type AuthType = 'github' | 'google'
export type NewPasswordField = keyof NewPasswordRequest
export type EditProfileField = keyof EditProfileRequest
export type DeletedPostItem = z.infer<typeof deletedPostItemSchema>
export type GetDeletedPostsResponse = z.infer<typeof getDeletedPostsResponseSchema>
export type UsersCountResponse = z.infer<typeof usersCountResponseSchema>
export type FeedPostsResponse = z.infer<typeof feedPostsResponseSchema>
export type ImageData = z.infer<typeof imageSchema>
export type ViewerStatus = z.infer<typeof viewerStatusSchema>
export type CountryId = z.infer<typeof countryIdSchema>
export type CityId = z.infer<typeof cityIdSchema>
export type LocationCountry = z.infer<typeof locationCountrySchema>
export type LocationCity = z.infer<typeof locationCitySchema>
// Subscriptions
export type AvailableAccountType = z.infer<typeof availableAccountTypeSchema>
export type AvailableAccountTypesResponse = z.infer<typeof availableAccountTypesResponseSchema>
export type CheckoutFormData = z.infer<typeof checkoutSchema>
export type Subscription = z.infer<typeof subscriptionSchema>
export type SubscriptionsResponse = z.infer<typeof subscriptionsResponseSchema>
export type PaymentService = z.infer<typeof paymentServiceSchema>
export type CreatePaymentState = z.infer<typeof createPaymentStateSchema>
export type PaymentStatus = z.infer<typeof paymentStatusSchema>
export type SubscriptionHistoryItem = z.infer<typeof subscriptionHistoryItemSchema>
export type SubscriptionHistoryResponse = z.infer<typeof subscriptionHistoryResponseSchema>
