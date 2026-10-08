import Skeleton from 'react-loading-skeleton'
import { COUNTER_DIGIT_PLACE_VALUE } from '@/components/RegisteredUsersCounter/RegisteredUsersCounter'
import s from './RegisteredUsersCounter.module.scss'

export const RegisteredUsersCounterSkeleton = ({
  minDigits = COUNTER_DIGIT_PLACE_VALUE,
}: {
  minDigits?: number
}) => {
  return (
    <div className={s.root} aria-busy>
      <span className={s.label}>
        <Skeleton width={'8rem'} height={'1.25rem'} style={{ display: 'inline-block' }} />
      </span>

      <div className={s.digitsBox}>
        {Array.from({ length: minDigits }).map((_, index) => (
          // containerClassName нужен, чтобы скелетон правильно растянулся внутри стилей квадратика
          <Skeleton key={index} containerClassName={s.digit} height={'100%'} width={'100%'} />
        ))}
      </div>
    </div>
  )
}
