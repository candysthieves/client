import { useMutation } from '@tanstack/react-query'
import { AddPostRequest } from '@/features/createPost'
import { addPost } from '@/lib/api/posts'

export function useAddPost() {
  return useMutation({
    mutationFn: (data: AddPostRequest) => addPost(data),
  })
}

// await Promise.all([
//   queryClient.invalidateQueries({
//     queryKey: profileKeys.detail(userId),
//   }),
//   queryClient.invalidateQueries({
//     queryKey: profileKeys.posts(userId),
//   }),
// ])
