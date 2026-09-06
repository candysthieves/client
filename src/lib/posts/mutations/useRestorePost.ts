import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Post } from '@/mocks/posts'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { restorePost } from '@/lib/api'
import { profileKeys } from '@/lib/profile/profileKeys'
import { postsKeys } from '../postKeys'

export const useRestorePost = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: restorePost,
    onSuccess: async (_, postId) => {
      queryClient.setQueryData<Post[]>(postsKeys.deletedByUser(userId), posts =>
        posts?.filter(post => post.postId !== postId)
      )
      queryClient.removeQueries({ queryKey: postsKeys.deletedPost(postId) })
      ToastSuccess({ message: 'Post restored successfully' })

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: profileKeys.posts(userId) }),
        queryClient.invalidateQueries({ queryKey: profileKeys.detail(userId), exact: true }),
      ])
    },
    onError: () => {
      ToastError({ messages: 'Failed to restore post. Please try again.' })
    },
  })
}
