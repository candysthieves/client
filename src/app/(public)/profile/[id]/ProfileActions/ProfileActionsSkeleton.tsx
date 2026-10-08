import Skeleton from 'react-loading-skeleton'
import { useAuth } from '@/lib/hooks'
import s from './ProfileActions.module.scss'

type ProfileActionsSkeletonProps = {
  userId: string
}

function useSkeletonButtonsCount(userId: string): 0 | 1 | 2 {
  const { user, isHydrated } = useAuth()

  if (!isHydrated) {
    return 2
  }

  if (!user) {
    return 0
  }

  return String(user.id) === userId ? 1 : 2
}

export function ProfileActionsSkeleton({ userId }: ProfileActionsSkeletonProps) {
  const count = useSkeletonButtonsCount(userId)

  if (count === 0) {
    return null
  }

  return (
    <div className={s.actions} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} width={'9rem'} height={'2.25rem'} />
      ))}
    </div>
  )
}
