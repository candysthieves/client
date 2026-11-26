export const formatNotificationDate = (date: Date | string): string => {
  const notificationDate = new Date(date)
  const now = new Date()

  const isSameDay = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  const time = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(notificationDate)

  if (isSameDay(notificationDate, now)) {
    return `Today, ${time}`
  }

  if (isSameDay(notificationDate, yesterday)) {
    return `Yesterday, ${time}`
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(notificationDate)
}
