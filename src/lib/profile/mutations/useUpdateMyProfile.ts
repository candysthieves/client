import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateMyProfileRequest } from '@/lib/model'
import { updateMyProfile } from '@/lib/api'
import { authKeys } from '@/lib/auth/authKeys'
import { profileKeys } from '../profileKeys'

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: UpdateMyProfileRequest) => updateMyProfile(body),
    onSuccess: profile => {
      queryClient.setQueryData(profileKeys.me(), profile)
      // username is also part of auth/me
      void queryClient.invalidateQueries({ queryKey: authKeys.me() })
    },
  })
}
