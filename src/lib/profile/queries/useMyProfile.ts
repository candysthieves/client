import { useQuery } from '@tanstack/react-query'
import { getMyProfile } from '@/lib/api'
import { profileKeys } from '../profileKeys'

export const useMyProfile = () =>
  useQuery({
    queryKey: profileKeys.me(),
    queryFn: getMyProfile,
    retry: false,
    // A background refetch would push fresh values into the edit form while the user is typing.
    refetchOnWindowFocus: false,
  })
