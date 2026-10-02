import { useMutation } from '@tanstack/react-query'
import type { UpdateAvatarRequest } from '@/features/createPost'
import { updateAvatar } from '@/lib/api/avatar'

export const useUpdateAvatar = () => {
  return useMutation({
    mutationFn: (data: UpdateAvatarRequest) => updateAvatar(data),
  })
}
