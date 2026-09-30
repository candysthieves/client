import { ToastError } from '@/components/Toast/Toast'
import { ApiError } from '@/lib/api/apiError'
import { ResponseValidationError } from '@/lib/api/responseValidationError'

export function showGlobalError(error: unknown) {
  // 1. Контракт с бэкендом нарушен — это баг интеграции, не ошибка пользователя
  if (error instanceof ResponseValidationError) {
    console.error('[ResponseValidationError]', error.url, error.issues)
    // Sentry.captureException(error, { extra: { url: error.url, issues: error.issues } })
    ToastError({ messages: 'Received unexpected data from server' })
    return
  }

  // 2. HTTP-ошибка
  if (error instanceof ApiError) {
    // 401/498 разлогинивают юзера внутри request() — тост тут не нужен
    if (error.status === 401 || error.status === 498) return

    // 404 — «не найдено»
    if (error.status === 404) {
      ToastError({ messages: 'Not found' })
      return
    }

    // 5xx — «попробуйте позже»
    if (error.status >= 500) {
      ToastError({ messages: 'Server error. Please try again later.' })
      return
    }

    ToastError({ messages: 'Request failed. Please try again.' })
    return
  }

  // 3. Сеть, abort, неизвестное
  ToastError({ messages: 'Something went wrong' })
}
