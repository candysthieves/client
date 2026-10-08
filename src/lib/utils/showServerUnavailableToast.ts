import { ToastError } from '@/components/Toast/Toast'
import { SERVER_UNAVAILABLE_ERROR_MESSAGE, SERVER_UNAVAILABLE_ERROR_TITLE } from '@/lib/model'

export const showServerUnavailableToast = () =>
  ToastError({ title: SERVER_UNAVAILABLE_ERROR_TITLE, messages: SERVER_UNAVAILABLE_ERROR_MESSAGE })
