import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { deleteAvatar } from '@/lib/api/avatar'
import { avatarKeys } from '@/lib/avatar'
import { feedKeys } from '@/lib/feed'
import { useAuth } from '@/lib/hooks'
import { Avatar } from '@/lib/model'
import { profileKeys } from '@/lib/profile'

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: deleteAvatar,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: avatarKeys.avatar() })
      const previousAvatar = queryClient.getQueryData<Avatar | null>(avatarKeys.avatar())
      // Optimistic Update
      queryClient.setQueryData<Avatar | null>(avatarKeys.avatar(), null)

      return { previousAvatar }
    },

    onError: (_error, _vars, context) => {
      // Откат
      if (context) {
        queryClient.setQueryData(avatarKeys.avatar(), context.previousAvatar)
      }
      ToastError({ messages: 'Failed to delete avatar. Please try again.' })
    },

    onSuccess: async () => {
      if (user?.id) {
        await queryClient.invalidateQueries({ queryKey: profileKeys.detail(user.id) })
      }
      await queryClient.invalidateQueries({ queryKey: feedKeys.all })
      ToastSuccess({ message: 'Avatar deleted successfully' })
    },

    // TODO: check to delete if needed
    onSettled: () => {
      // success → сервер подтвердит null, error → берем актуальное значение с сервера
      void queryClient.invalidateQueries({ queryKey: avatarKeys.avatar() })
    },
  })
}
