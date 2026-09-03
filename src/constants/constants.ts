export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
// TODO: Remove this mock server URL when post creation is connected to the backend.
export const NEXT_PUBLIC_POSTS_API_URL =
  process.env.NEXT_PUBLIC_POSTS_API_URL ?? 'http://localhost:8080'
export const NEXT_PUBLIC_RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export const POST_DRAFT_LS_KEY = 'postDraft'
