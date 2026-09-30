import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { deleteAvatar } from '@/lib/api/avatar'
import { avatarKeys } from '@/lib/avatar'
import { Avatar } from '@/lib/model'

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAvatar,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: avatarKeys.avatar() })
      const previousAvatar = queryClient.getQueryData<Avatar | null>(avatarKeys.avatar())
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

    onSuccess: () => {
      ToastSuccess({ message: 'Avatar deleted successfully' })
    },

    onSettled: () => {
      // success → сервер подтвердит null, error → берем актуальное значение с сервера
      void queryClient.invalidateQueries({ queryKey: avatarKeys.avatar() })
    },
  })
}
