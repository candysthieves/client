import { serverRequestValidated } from '@/lib/api/server/serverRequest'
import { postSchema, type Post } from '@/lib/model'

export const getServerPost = async (postId: string): Promise<Post> =>
  serverRequestValidated(`/posts/${encodeURIComponent(postId)}`, postSchema)
