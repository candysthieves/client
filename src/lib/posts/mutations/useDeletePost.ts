import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { deletePost } from '@/lib/api'
import { profileKeys } from '@/lib/profile/profileKeys'
import { postsKeys } from '../postKeys'

export const useDeletePost = (userId?: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onMutate: async postId => {
      await queryClient.cancelQueries({ queryKey: postsKeys.post(postId), exact: true })
    },
    onSuccess: async () => {
      ToastSuccess({ message: 'Post deleted successfully' })

      void queryClient.invalidateQueries({
        queryKey: postsKeys.all,
        refetchType: 'none',
      })

      if (userId) {
        await queryClient.invalidateQueries({ queryKey: profileKeys.posts(userId) })
        await queryClient.invalidateQueries({ queryKey: profileKeys.deletedPosts(userId) })
      }
    },
    onError: () => {
      ToastError({ messages: 'Failed to delete post. Please try again.' })
    },
  })
}
