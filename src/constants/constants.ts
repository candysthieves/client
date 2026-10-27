import { SubscriptionLabels } from '@/lib/model'

export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
// TODO: Remove this mock server URL when the posts backend is ready.
export const NEXT_PUBLIC_POSTS_API_URL =
  process.env.NEXT_PUBLIC_POSTS_API_URL ?? 'http://localhost:8080'
export const NEXT_PUBLIC_RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export const POST_DRAFT_LS_KEY = 'postDraft'
export const FILES_UPLOAD_LIMIT = 8
export const MAX_FILE_SIZE_MB = 5
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
export const MAX_POST_DESCRIPTION_LENGTH = 500
export const MAX_ABOUT_ME_LENGTH = 200
export const HOME_PAGE_REFETCH_INTERVAL_MS = 60 * 1000
export const TIME_AGO_TICK_INTERVAL_MS = 60 * 1000
export const SELECT_SEARCH_DEBOUNCE = 600

export const TARIFF_LABELS: Record<SubscriptionLabels, string> = {
  Daily: '1 Day',
  Weekly: '7 Days',
  Monthly: 'Month',
  Quarterly: '3 Months',
}

// REDIRECT TO PAYMENT SERVICE MODAL WINDOW CONTENT
export const PAYMENT_SESSION_SUCCESS_TITLE = 'Payment Session Created'
export const PAYMENT_SESSION_ERROR_TITLE = 'Payment Session Error'

// export const PAYMENT_SUCCESS_NOTIFICATION = 'Redirecting you to the payment page. Please do not close the tab!'
export const PAYMENT_SESSION_SUCCESS_NOTIFICATION =
  'Payment page opened in a new tab. Please, finish your payment and close this modal to return to the app'
export const PAYMENT_SESSION_ERROR_NOTIFICATION =
  'Failed to create a payment session or retrieve the payment URL. Please try again later'

// RECEIVED PAYMENT PROCESSED MODAL WINDOW CONTENT
// export const PAYMENT_SUCCESS_TITLE = 'Payment Created'
// export const PAYMENT_ERROR_TITLE = 'Payment Processing Error'
export const PAYMENT_MODAL_SUCCESS_BUTTON_TEXT = 'OK'
export const PAYMENT_MODAL_ERROR_BUTTON_TEXT = 'Back to payment'
export const PAYMENT_SUCCESS_NOTIFICATION = 'Payment was successful!'
export const PAYMENT_ERROR_NOTIFICATION = 'Transaction failed, please try again'

// RECEIVED PAYMENT PROCESSED TOAST CONTENT
export const PAYMENT_SUCCESS_TOAST = 'Payment created successfully'
export const PAYMENT_ERROR_TOAST = 'Failed to create a payment. Please try again later'

export const SUBSCRIPTION_AUTO_RENEW_OFF_MESSAGE = 'Subscription auto-renewal is disabled'
export const SUBSCRIPTION_AUTO_RENEW_OFF_EXPIRED_MESSAGE =
  "Auto-renewal is disabled. Please select and purchase a new subscription plan. You'll lose access on"
