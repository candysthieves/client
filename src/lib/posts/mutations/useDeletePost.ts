import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { deletePost } from '@/lib/api'
import { postsKeys } from '../postKeys'

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      ToastSuccess({ message: 'Post deleted successfully' })
      void queryClient.invalidateQueries({ queryKey: postsKeys.all })
    },
    onError: () => {
      ToastError({ messages: 'Failed to delete post. Please try again.' })
    },
  })
}
