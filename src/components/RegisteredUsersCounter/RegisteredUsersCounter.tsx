import s from './RegisteredUsersCounter.module.scss'

type RegisteredUsersCounterProps = {
  count: number
  minDigits?: number
}

const COUNTER_DIGIT_PLACE_VALUE = 6

export const RegisteredUsersCounter = ({
  count,
  minDigits = COUNTER_DIGIT_PLACE_VALUE,
}: RegisteredUsersCounterProps) => {
  const digits = String(count).padStart(minDigits, '0').split('')

  return (
    <div className={s.root}>
      <span className={s.label}>Registered users:</span>

      <div className={s.digitsBox}>
        {digits.map((digit, index) => (
          <span className={s.digit} key={index}>
            {digit}
          </span>
        ))}
      </div>
    </div>
  )
}
