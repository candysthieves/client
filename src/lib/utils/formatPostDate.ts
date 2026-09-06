const RELATIVE_DATE_PATTERN = /^\d+\s+(?:second|minute|hour|day|week|month|year)s?\s+ago$/i

export const formatPostDate = (raw: string): string => {
  if (RELATIVE_DATE_PATTERN.test(raw)) {
    return raw
  }

  const date = new Date(raw)

  if (Number.isNaN(date.getTime())) {
    return raw
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
