const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export const getTimeAgo = (dateInput: Date | string): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  const elapsedMs = Date.now() - date.getTime()

  if (Number.isNaN(elapsedMs) || elapsedMs < MINUTE) {
    return 'just now'
  }

  if (elapsedMs < HOUR) {
    const minutes = Math.floor(elapsedMs / MINUTE)

    return `${minutes} min ago`
  }

  if (elapsedMs < DAY) {
    const hours = Math.floor(elapsedMs / HOUR)

    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  }

  const days = Math.floor(elapsedMs / DAY)

  if (days === 1) {
    return 'yesterday'
  }

  return `${days} days ago`
}
