import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { updatePost } from '@/lib/api'
import { postsKeys } from '../postKeys'

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, description }: { postId: string; description: string }) =>
      updatePost(postId, description),
    onSuccess: () => {
      ToastSuccess({ message: 'Post updated successfully' })
      void queryClient.invalidateQueries({ queryKey: postsKeys.all })
    },
    onError: () => {
      ToastError({ messages: 'Failed to update post. Please try again.' })
    },
  })
}
