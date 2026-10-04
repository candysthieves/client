const MIN_USER_AGE = 13

// value is a date of birth in dd.mm.yyyy format; an unparsable value is not treated as under age.
export const isUnder13 = (value: string): boolean => {
  const [day, month, year] = value.split('.').map(Number)

  if (!day || !month || !year) {
    return false
  }

  const today = new Date()
  const minBirthDate = new Date(
    today.getFullYear() - MIN_USER_AGE,
    today.getMonth(),
    today.getDate()
  )

  return new Date(year, month - 1, day) > minBirthDate
}
