import s from './RegisteredUsersCounter.module.scss'

type RegisteredUsersCounterProps = {
  count: number
  minDigits?: number
}

export const RegisteredUsersCounter = ({ count, minDigits = 6 }: RegisteredUsersCounterProps) => {
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
