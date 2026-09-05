import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Post } from '@/mocks/posts'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { updatePost } from '@/lib/api'
import { postsKeys } from '../postKeys'

type UpdatePostInput = {
  postId: string
  description: string
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, description }: UpdatePostInput) => updatePost(postId, description),

    onMutate: async ({ postId, description }: UpdatePostInput) => {
      await queryClient.cancelQueries({ queryKey: postsKeys.all })

      const previousPosts = queryClient.getQueryData<Post[]>(postsKeys.all)

      queryClient.setQueryData<Post[]>(postsKeys.all, posts =>
        posts?.map(post => (post.postId === postId ? { ...post, description } : post))
      )

      return previousPosts
    },

    onError: (_error, _variables, context) => {
      if (context) {
        queryClient.setQueryData(postsKeys.all, context)
      }

      ToastError({ messages: 'Failed to update post. Please try again.' })
    },

    onSuccess: () => {
      ToastSuccess({ message: 'Post updated successfully' })
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: postsKeys.all })
    },
  })
}
