type DateParts = {
  day: number
  month: number
  year: number
}

const pad = (value: number) => String(value).padStart(2, '0')

const isValidDateParts = ({ day, month, year }: DateParts) => {
  const date = new Date(year, month - 1, day)

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

const parseFormDate = (value: string): DateParts | undefined => {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value)

  if (!match) return undefined

  const [, day, month, year] = match
  const parts = { day: Number(day), month: Number(month), year: Number(year) }

  return isValidDateParts(parts) ? parts : undefined
}

const parseApiDate = (value: string): DateParts | undefined => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) return undefined

  const [, year, month, day] = match
  const parts = { day: Number(day), month: Number(month), year: Number(year) }

  return isValidDateParts(parts) ? parts : undefined
}

export const apiDateToFormDate = (value: null | string | undefined): string => {
  if (!value) return ''

  const parts = parseApiDate(value)

  return parts ? `${pad(parts.day)}.${pad(parts.month)}.${parts.year}` : ''
}

export const formDateToApiDate = (value: string): null | string | undefined => {
  if (!value) return null

  const parts = parseFormDate(value)

  return parts ? `${parts.year}-${pad(parts.month)}-${pad(parts.day)}` : undefined
}

export const formDateToPickerDate = (value: string): Date | undefined => {
  const parts = parseFormDate(value)

  return parts ? new Date(parts.year, parts.month - 1, parts.day) : undefined
}

export const pickerDateToFormDate = (value: Date | undefined): string => {
  if (!value || Number.isNaN(value.getTime())) return ''

  return `${pad(value.getDate())}.${pad(value.getMonth() + 1)}.${value.getFullYear()}`
}
