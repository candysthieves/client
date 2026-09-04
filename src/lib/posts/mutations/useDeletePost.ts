import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { deletePost } from '@/lib/api'
import { profileKeys } from '@/lib/profile/profileKeys'
import { postsKeys } from '../postKeys'

export const useDeletePost = (userId?: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      ToastSuccess({ message: 'Post deleted successfully' })
      void queryClient.invalidateQueries({ queryKey: postsKeys.all })

      if (userId) {
        await queryClient.invalidateQueries({ queryKey: profileKeys.detail(userId) })
      }
    },
    onError: () => {
      ToastError({ messages: 'Failed to delete post. Please try again.' })
    },
  })
}
