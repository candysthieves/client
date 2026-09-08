import { Typography } from '@candy.thieves/ui-kit-lumos'
import Skeleton from 'react-loading-skeleton'
import type { Post } from '@/mocks/posts'
import { PostPreview } from './PostPreview'
import s from './ProfileClient.module.scss'

const POSTS_FEED_SKELETON_COUNT = 8

type PostsFeedProps = {
  isLoading: boolean
  posts: Post[]
  userId: string
}

export function PostsFeed({ isLoading, posts, userId }: PostsFeedProps) {
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

      {isLoading ? (
        <div className={s.postsGrid} aria-busy={'true'} aria-label={'Loading posts'}>
          {Array.from({ length: POSTS_FEED_SKELETON_COUNT }, (_, index) => (
            <Skeleton className={s.postSkeleton} key={index} />
          ))}
        </div>
      ) : isEmpty ? (
        <Typography color={'var(--color-light-900)'} variant={'body1'}>
          This user has not published any posts yet.
        </Typography>
      ) : (
        <div className={s.postsGrid}>
          {posts.map((post, index) => (
            <PostPreview key={post.postId} index={index} post={post} userId={userId} />
          ))}
        </div>
      )}
    </section>
  )
}
