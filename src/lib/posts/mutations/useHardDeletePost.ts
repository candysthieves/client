import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ToastError, ToastSuccess } from '@/components'
import { hardDeletePost } from '@/lib/api'
import { profileKeys } from '@/lib/profile'

export function useHardDeletePost(userId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => hardDeletePost(postId),

    onSuccess: async () => {
      ToastSuccess({ message: 'Post permanently deleted' })

      if (userId) {
        await queryClient.invalidateQueries({ queryKey: profileKeys.deletedPosts(userId) })
      }
    },
    onError: () => {
      ToastError({ messages: 'Failed to permanently delete post.' })
    },
  })
}
