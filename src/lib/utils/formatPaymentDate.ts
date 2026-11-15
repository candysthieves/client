import { apiDateToFormDate } from './profileDate'

export const formatPaymentDate = (date: string) => apiDateToFormDate(date.slice(0, 10))
