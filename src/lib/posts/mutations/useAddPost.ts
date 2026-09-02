import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AddPostRequest } from '@/features/createPost'
import { addPost } from '@/lib/api/posts'
import { postsKeys } from '@/lib/posts/postKeys'

export function useAddPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AddPostRequest) => addPost(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all })
    },
  })
}
