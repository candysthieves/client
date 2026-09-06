import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { restorePost } from '@/lib/api'
import { postsKeys } from '../postKeys'

export const useRestorePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: restorePost,
    onSuccess: () => {
      ToastSuccess({ message: 'Post restored successfully' })
      return queryClient.invalidateQueries({ queryKey: postsKeys.all })
    },
    onError: () => {
      ToastError({ messages: 'Failed to restore post. Please try again.' })
    },
  })
}
