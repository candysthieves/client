import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '@/lib/api'
import { profileKeys } from '../profileKeys'

export const useProfile = (userId: string) =>
  useQuery({
    queryKey: profileKeys.detail(userId),
    queryFn: () => getUserProfile(userId),
  })
