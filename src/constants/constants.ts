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
export const HOME_PAGE_REFETCH_INTERVAL_MS = 60 * 1000
export const TIME_AGO_TICK_INTERVAL_MS = 60 * 1000
