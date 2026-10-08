'use client'

import { MainAvatar, Typography } from '@candy.thieves/ui-kit-lumos'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { ProfileActions } from '@/app/(public)/profile/[id]/ProfileActions/ProfileActions'
import { DeletedPosts } from '@/components/DeletedPosts'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostModal } from '@/components/PostModal/PostModal'
import { ProfilePostTabs } from '@/components/ProfilePostTabs'
import { CreatePostModal } from '@/features/createPost'
import { getUserProfile } from '@/lib/api'
import { useAuth } from '@/lib/hooks'
import { useIsMobileViewport } from '@/lib/hooks/useIsMobileViewport'
import { UserProfile } from '@/lib/model'
import { postsKeys, usePost } from '@/lib/posts'
import { profileKeys, useDeletedPosts, useProfile, useProfilePosts } from '@/lib/profile'
import { useDeletedPost } from '@/lib/profile/queries/useDeletedPost'
import { PostsFeed } from './PostsFeed'
import { PostsFeedSkeleton } from './PostsFeed/PostsFeedSkeleton'
import s from './ProfileClient.module.scss'
import { ProfileHeaderSkeleton } from './ProfileHeader/ProfileHeaderSkeleton'

type ProfileClientProps = {
  userId: string
  postId?: string
  action?: string
}

export function ProfileClient({ userId, postId, action }: ProfileClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useIsMobileViewport()

  const { isAuthenticated, isHydrated } = useAuth()
  const isAuth = isHydrated && isAuthenticated

  // Keeps the authenticated profile separate from the guest-prefetched profile.
  const [personalizedProfile, setPersonalizedProfile] = useState<null | UserProfile>(null)

  const { data: profile, isError: isProfileError, isLoading: isProfileLoading } = useProfile(userId)

  // Use the authenticated profile when it has been loaded.
  const displayedProfile = personalizedProfile ?? profile

  const isProfilePersonalized = isAuth && personalizedProfile !== null

  const isOwner = isProfilePersonalized && displayedProfile?.viewerStatus === 'owner'
  const postType = searchParams.get('type')
  const isDeletedPost = postType === 'deleted'

  const {
    data: profilePostsData,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isError: isPostsError,
    isFetchingNextPage,
    isLoading: isPostsLoading,
  } = useProfilePosts(userId)
  const { data: postDetails } = usePost(isDeletedPost ? undefined : postId)
  const queryClient = useQueryClient()

  useEffect(() => {
    // The server prefetches as a guest, so the profile is re-fetched once auth is ready.
    if (!isAuth) return

    let cancelled = false

    void queryClient
      .fetchQuery({
        queryKey: profileKeys.detail(userId),
        queryFn: () => getUserProfile(userId),
        staleTime: 0,
      })
      .then(personalizedProfile => {
        if (!cancelled) {
          setPersonalizedProfile(personalizedProfile)
        }
      })
      .catch(() => undefined)

    if (postId && !isDeletedPost) {
      void queryClient.invalidateQueries({
        queryKey: postsKeys.post(postId),
      })
    }

    return () => {
      cancelled = true
    }
  }, [isAuth, queryClient, userId, postId, isDeletedPost])

  const profilePosts = profilePostsData?.pages.flatMap(page => page.items) ?? []
  const {
    data: deletedPostsResponse,
    isError: isDeletedPostsError,
    isLoading: isDeletedPostsLoading,
  } = useDeletedPosts(userId, isOwner)

  const deletedPosts = deletedPostsResponse?.items ?? []
  const { data: requestedDeletedPostResponse } = useDeletedPost(
    userId,
    postId,
    isOwner && isDeletedPost
  )

  useEffect(() => {
    if (!isDeletedPost && postDetails && postDetails.author?.id !== userId) {
      router.replace(`/profile/${userId}`)
    }
  }, [postDetails, router, userId, isDeletedPost])

  const modalPost = postDetails?.id === postId ? postDetails : null
  const selectedPublishedPost = modalPost ?? profilePosts.find(post => post.id === postId)
  const selectedDeletedPost =
    requestedDeletedPostResponse ?? deletedPosts.find(post => post.id === postId)
  const selectedPost = isDeletedPost ? selectedDeletedPost : selectedPublishedPost

  const mobilePosts = isDeletedPost ? deletedPosts : profilePosts

  const currentPostIndex = mobilePosts.findIndex(post => post.id === postId)
  const mobileStartIndex = currentPostIndex !== -1 ? currentPostIndex : 0

  const showCreateModal = isOwner && action === 'create' && !postId
  const handleClosePost = () => router.replace(`/profile/${userId}`)
  const handleLoadMorePosts = useCallback(() => void fetchNextPage(), [fetchNextPage])

  if (isProfileError || (isPostsError && !profilePostsData)) {
    return (
      <section className={s.profileError} role={'alert'}>
        <Typography color={'var(--color-light-100)'} variant={'h1'}>
          Unable to load profile
        </Typography>
        <Typography color={'var(--color-light-900)'} variant={'body1'}>
          Profile not found. Please check the link or try again later
        </Typography>
      </section>
    )
  }
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
  return (
    <>
      <div className={s.profile}>
        {isProfileLoading ? (
          <ProfileHeaderSkeleton userId={userId} />
        ) : (
          profile && (
            <section className={s.profileHeader} aria-labelledby={'profile-name'}>
              <MainAvatar
                className={s.profileAvatar}
                userName={displayedProfile?.username ?? userId}
                src={displayedProfile?.avatarPreviewUrl?.url ?? ''}
                size={'xxl'}
                delayMs={0}
              />

              <div className={s.profileInfo}>
                <div className={s.profileTop}>
                  <Typography
                    id={'profile-name'}
                    className={s.profileName}
                    color={'white'}
                    variant={'h1'}
                  >
                    {displayedProfile?.username}
                  </Typography>

                  {isProfilePersonalized && (
                    <ProfileActions status={displayedProfile!.viewerStatus} />
                  )}
                </div>

                <dl className={s.stats}>
                  <div className={s.stat}>
                    <dd className={s.statValue}>{profile?.publicationsCount ?? 0}</dd>
                    <dt className={s.statLabel}>Publications</dt>
                  </div>
                </dl>

                <Typography className={s.about} variant={'body1'}>
                  {displayedProfile?.description ?? ''}
                </Typography>
              </div>
            </section>
          )
        )}
        {isPostsLoading ? (
          <PostsFeedSkeleton count={8} />
        ) : isOwner ? (
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
        ) : (
          postsFeed
        )}
      </div>

      {selectedPost &&
        profile &&
        (isMobile ? (
          <MobilePostViewer
            userProfile={profile}
            onClose={handleClosePost}
            posts={mobilePosts}
            startIndex={mobileStartIndex}
            userId={userId}
            mode={isDeletedPost ? 'deleted' : 'published'}
          />
        ) : (
          <PostModal
            userProfile={profile}
            post={selectedPost}
            mode={isDeletedPost ? 'deleted' : 'published'}
            open
            onClose={handleClosePost}
          />
        ))}

      {showCreateModal && <CreatePostModal userProfile={displayedProfile!} />}
    </>
  )
}
