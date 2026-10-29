type DateInput = Date | null | number | string | undefined

type FormatDateOptions = {
  locale?: string
  fallback?: string
  timeZone?: string
}

export const formatDate = (
  date: DateInput,
  { locale = 'ru-RU', fallback = '—', timeZone }: FormatDateOptions = {}
): string => {
  if (date === null || date === undefined || date === '') return fallback

  const timestamp = date instanceof Date ? date : new Date(date)

  if (Number.isNaN(timestamp.getTime())) return fallback

  return timestamp.toLocaleDateString(locale, timeZone ? { timeZone } : undefined)
}
