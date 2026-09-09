'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import { useEffect, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import type { Post } from '@/lib/model'
import { PostPreview } from './PostPreview'
import s from './ProfileClient.module.scss'

const POSTS_FEED_SKELETON_COUNT = 8
const LOAD_MORE_ROOT_MARGIN = '200px'

type PostsFeedProps = {
  hasNextPage: boolean
  isLoading: boolean
  isLoadingNextPage: boolean
  onLoadMore: () => void
  posts: Post[]
  userId: string
}

function PostsSkeletons() {
  return Array.from({ length: POSTS_FEED_SKELETON_COUNT }, (_, index) => (
    <Skeleton className={s.postSkeleton} key={index} />
  ))
}

export function PostsFeed({
  hasNextPage,
  isLoading,
  isLoadingNextPage,
  onLoadMore,
  posts,
  userId,
}: PostsFeedProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const isEmpty = posts.length === 0

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current

    if (!loadMoreElement || !hasNextPage || isLoadingNextPage) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          onLoadMore()
        }
      },
      { rootMargin: LOAD_MORE_ROOT_MARGIN }
    )

    observer.observe(loadMoreElement)

    return () => observer.disconnect()
  }, [hasNextPage, isLoadingNextPage, onLoadMore])

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
          <PostsSkeletons />
        </div>
      ) : isEmpty ? (
        <Typography color={'var(--color-light-900)'} variant={'body1'}>
          This user has not published any posts yet.
        </Typography>
      ) : (
        <>
          <div className={s.postsGrid}>
            {posts.map((post, index) => (
              <PostPreview key={post.id} index={index} post={post} userId={userId} />
            ))}
          </div>

          {hasNextPage && (
            <>
              {isLoadingNextPage && (
                <div className={s.postsGrid} aria-busy={'true'} aria-label={'Loading more posts'}>
                  <PostsSkeletons />
                </div>
              )}

              <div ref={loadMoreRef} aria-live={'polite'} />
            </>
          )}
        </>
      )}
    </section>
  )
}
