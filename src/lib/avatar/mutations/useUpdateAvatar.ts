import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateAvatarRequest } from '@/features/createPost'
import type { Avatar, PostImage } from '@/lib/model'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { updateAvatar } from '@/lib/api/avatar'
import { avatarKeys } from '@/lib/avatar'

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateAvatarRequest) => updateAvatar(data),

    onMutate: async (data: UpdateAvatarRequest) => {
      await queryClient.cancelQueries({ queryKey: avatarKeys.avatar() })

      const previousAvatar = queryClient.getQueryData<Avatar>(avatarKeys.avatar())

      const url = URL.createObjectURL(data.file)
      const optimisticMedia: PostImage = {
        fileId: crypto.randomUUID(), // временный (только для optimistic update)
        url,
        width: 0,
        height: 0,
      }

      queryClient.setQueryData<Avatar>(avatarKeys.avatar(), prev => ({
        avatarUrl: optimisticMedia,
        avatarPreviewUrl: prev?.avatarPreviewUrl ?? optimisticMedia,
      }))

      return { previousAvatar, optimisticUrl: url }
    },

    onError: (_error, _variables, context) => {
      if (context) {
        queryClient.setQueryData(avatarKeys.avatar(), context.previousAvatar)
        URL.revokeObjectURL(context.optimisticUrl)
      }
      ToastError({ messages: 'Failed to update avatar. Please try again.' })
    },

    onSuccess: () => {
      ToastSuccess({ message: 'Avatar updated successfully' })
    },

    onSettled: async (_data, error, _variables, context) => {
      // при ошибке blob уже отозван в onError
      if (error) return

      try {
        // пока useAvatar() перезапрашивает getAvatar() в кэше оптимистик Avatar с blob-URL
        await queryClient.invalidateQueries({ queryKey: avatarKeys.avatar() })
      } finally {
        // настоящий аватар уже в кэше — оптимистик Avatar с blob-URL больше не нужен
        if (context?.optimisticUrl) {
          URL.revokeObjectURL(context.optimisticUrl)
        }
      }
    },
  })
}
