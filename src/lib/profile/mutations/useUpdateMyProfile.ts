import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateMyProfileRequest, UserResponse } from '@/lib/model'
import { updateMyProfile } from '@/lib/api'
import { authKeys } from '@/lib/auth/authKeys'
import { profileKeys } from '../profileKeys'

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: UpdateMyProfileRequest) => updateMyProfile(body),
    // GeneralInformationForm shows its own field errors and "Server is not available!" toast.
    meta: { skipGlobalError: true },
    onSuccess: profile => {
      queryClient.setQueryData(profileKeys.me(), profile)

      // The public profile page (and its posts, which show the username) is cached separately.
      const userId = queryClient.getQueryData<UserResponse>(authKeys.me())?.id
      if (userId) {
        void queryClient.invalidateQueries({ queryKey: profileKeys.detail(userId) })
      }

      // username is also part of auth/me
      void queryClient.invalidateQueries({ queryKey: authKeys.me() })
    },
  })
}
