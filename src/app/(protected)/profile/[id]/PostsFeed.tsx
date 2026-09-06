import { Typography } from '@candy.thieves/ui-kit-lumos'
import type { ProfilePost } from '@/lib/model'
import { PostPreview } from './PostPreview'
import s from './ProfileClient.module.scss'

type PostsFeedProps = {
  posts: ProfilePost[]
  userId: string
}

export function PostsFeed({ posts, userId }: PostsFeedProps) {
  const isEmpty = posts.length === 0

  return (
    <section className={isEmpty ? s.emptyPosts : s.postsSection} aria-labelledby={'posts-heading'}>
      <Typography
        id={'posts-heading'}
        className={s.postsTitle}
        color={'var(--color-light-100)'}
        variant={'h2'}
      >
        Posts
      </Typography>

      {isEmpty ? (
        <Typography color={'var(--color-light-900)'} variant={'body1'}>
          This user has not published any posts yet.
        </Typography>
      ) : (
        <div className={s.postsGrid}>
          {posts.map((post, index) => (
            <PostPreview key={post.id} index={index} post={post} userId={userId} />
          ))}
        </div>
      )}
    </section>
  )
}
