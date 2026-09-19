import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ToastError, ToastSuccess } from '@/components'
import { restorePost } from '@/lib/api'
import { profileKeys } from '@/lib/profile'

export function useRestorePost(userId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => restorePost(postId),

    onSuccess: async () => {
      ToastSuccess({ message: 'Post restored successfully' })

      if (userId) {
        await queryClient.invalidateQueries({ queryKey: profileKeys.posts(userId) })
        await queryClient.invalidateQueries({ queryKey: profileKeys.deletedPosts(userId) })
      }
    },
    onError: () => {
      ToastError({ messages: 'Failed to restore post. Please try again.' })
    },
  })
}
