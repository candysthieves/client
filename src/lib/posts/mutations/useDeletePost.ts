import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ProfilePostsResponse } from '@/lib/model'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { deletePost } from '@/lib/api'
import { profileKeys } from '@/lib/profile/profileKeys'
import { postsKeys } from '../postKeys'

export const useDeletePost = (userId?: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, postId) => {
      ToastSuccess({ message: 'Post deleted successfully' })
      void queryClient.invalidateQueries({ queryKey: postsKeys.all })

      if (userId) {
        queryClient.setQueryData<ProfilePostsResponse>(profileKeys.posts(userId), response =>
          response
            ? {
                ...response,
                items: response.items.filter(post => post.id !== postId),
              }
            : response
        )
        void queryClient.invalidateQueries({
          queryKey: profileKeys.detail(userId),
          exact: true,
        })
      }
    },
    onError: () => {
      ToastError({ messages: 'Failed to delete post. Please try again.' })
    },
  })
}
