import type { Post } from '@/mocks/posts'
import { PostPreview } from './PostPreview'
import s from './ProfileClient.module.scss'

type PostsFeedProps = {
  posts: Post[]
  profileId: string
}

export function PostsFeed({ posts, profileId }: PostsFeedProps) {
  if (posts.length === 0) {
    return (
      <section className={s.emptyPosts} aria-labelledby={'posts-heading'}>
        <h2 id={'posts-heading'}>Posts</h2>
        <p>This user has not published any posts yet.</p>
      </section>
    )
  }

  return (
    <section className={s.postsSection} aria-labelledby={'posts-heading'}>
      <h2 id={'posts-heading'} className={s.postsTitle}>
        Posts
      </h2>
      <div className={s.postsGrid}>
        {posts.map((post, index) => (
          <PostPreview key={post.postId} index={index} post={post} profileId={profileId} />
        ))}
      </div>
    </section>
  )
}
