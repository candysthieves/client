'use client'

import { useCallback } from 'react'
import { PostsFeed } from '@/app/(public)/profile/[id]/PostsFeed'
import { PostsFeedSkeleton } from '@/app/(public)/profile/[id]/PostsFeed/PostsFeedSkeleton'
import { DeletedPosts } from '@/components/DeletedPosts'
import { ProfilePostTabs } from '@/components/ProfilePostTabs'
import { useDeletedPosts, useProfilePosts } from '@/lib/profile'

type ProfilePostContentProps = {
  userId: string
  isOwner: boolean
}

export function ProfilePostContent({ userId, isOwner }: ProfilePostContentProps) {
  const {
    data: profilePostsData,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
    isLoading: isPostsLoading,
  } = useProfilePosts(userId)

  const {
    data: deletedPostsResponse,
    isError: isDeletedPostsError,
    isLoading: isDeletedPostsLoading,
  } = useDeletedPosts(userId, isOwner)

  const handleLoadMorePosts = useCallback(() => void fetchNextPage(), [fetchNextPage])

  const profilePosts = profilePostsData?.pages.flatMap(page => page.items) ?? []
  const deletedPosts = deletedPostsResponse?.items ?? []

  const postsFeed = isPostsLoading ? (
    <PostsFeedSkeleton count={8} />
  ) : (
    <PostsFeed
      hasNextPage={hasNextPage ?? false}
      isLoading={isPostsLoading}
      isLoadingNextPage={isFetchingNextPage}
      isLoadMoreError={isFetchNextPageError}
      key={userId}
      onLoadMore={handleLoadMorePosts}
      posts={profilePosts}
      userId={userId}
    />
  )

  if (isOwner) {
    return (
      <ProfilePostTabs
        postsFeed={postsFeed}
        deletedPosts={
          <DeletedPosts
            key={deletedPosts.map(post => post.id).join(',')}
            posts={deletedPosts}
            userId={userId}
            isError={isDeletedPostsError}
            isLoading={isDeletedPostsLoading}
          />
        }
        deletedPostsCount={deletedPosts.length}
      />
    )
  }

  return postsFeed
}
