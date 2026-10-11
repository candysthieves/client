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

  const { isAuthenticated, isHydrated, user } = useAuth()
  const isAuth = isHydrated && isAuthenticated

  console.log('[ProfileClient] Auth state', {
    profileUserId: userId,
    currentUserId: user?.id,
    isAuthenticated,
    isHydrated,
    isAuth,
    idsMatch: String(user?.id) === String(userId),
  })

  // Keeps the authenticated profile separate from the guest-prefetched profile.
  const [personalizedProfile, setPersonalizedProfile] = useState<null | UserProfile>(null)

  useEffect(() => {
    console.log('[ProfileClient] Personalized profile state changed', {
      profileUserId: userId,
      currentUserId: user?.id,
      exists: personalizedProfile !== null,
      profileId: personalizedProfile?.id,
      username: personalizedProfile?.username,
      viewerStatus: personalizedProfile?.viewerStatus,
      isAuth,
    })
  }, [personalizedProfile, user?.id, userId, isAuth])

  const { data: profile, isError: isProfileError, isLoading: isProfileLoading } = useProfile(userId)

  // Use the authenticated profile when it has been loaded.
  const displayedProfile = personalizedProfile ?? profile

  const isProfilePersonalized = isAuth && personalizedProfile !== null

  const isOwner = isProfilePersonalized && displayedProfile?.viewerStatus === 'owner'
  const postType = searchParams.get('type')
  const isDeletedPost = postType === 'deleted'

  console.log('[ProfileClient] Ownership decision', {
    userId,
    currentUserId: user?.id,
    isAuth,
    isProfilePersonalized,
    personalizedViewerStatus: personalizedProfile?.viewerStatus,
    displayedViewerStatus: displayedProfile?.viewerStatus,
    isOwner,
    showCreateModal: isOwner && action === 'create' && !postId,
  })

  console.log('[ProfileClient] Profile state:', {
    userId,
    isProfileLoading,
    isProfileError,
    guestProfileExists: !!profile,
    guestViewerStatus: profile?.viewerStatus,
    personalizedProfileExists: !!personalizedProfile,
    personalizedViewerStatus: personalizedProfile?.viewerStatus,
    displayedViewerStatus: displayedProfile?.viewerStatus,
    isProfilePersonalized,
    isOwner,
  })

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
    const unsubscribe = queryClient.getQueryCache().subscribe(event => {
      const queryKey = event.query.queryKey

      if (queryKey[0] !== 'profiles') return

      const data = event.query.state.data as undefined | UserProfile

      console.log('[ProfileClient] Query cache event', {
        type: event.type,
        queryKey,
        queryHash: event.query.queryHash,
        status: event.query.state.status,
        fetchStatus: event.query.state.fetchStatus,
        error: event.query.state.error,
        dataUpdatedAt: event.query.state.dataUpdatedAt,
        dataExists: !!data,
        cachedUsername: data?.username,
        cachedViewerStatus: data?.viewerStatus,
      })
    })

    return unsubscribe
  }, [queryClient])

  useEffect(() => {
    console.log('[ProfileClient] Auth effect triggered:', {
      userId,
      isHydrated,
      isAuthenticated,
      isAuth,
      postId,
      isDeletedPost,
    })

    if (!isAuth) {
      console.log('[ProfileClient] Profile request skipped: not authenticated')
      return
    }

    let cancelled = false

    console.log('[ProfileClient] Ownership check:', {
      profileUserId: userId,
      currentUserId: user?.id,
      isAuthenticated,
      isHydrated,
    })

    console.log('[ProfileClient] Starting personalized profile fetch', {
      userId,
      queryKey: profileKeys.detail(userId),
      cachedProfile: queryClient.getQueryData(profileKeys.detail(userId)),
    })

    const queryKey = profileKeys.detail(userId)
    const cached = queryClient.getQueryState(queryKey)

    const cachedData = queryClient.getQueryData<UserProfile>(queryKey)

    console.log('[ProfileClient] Before fetchQuery', {
      userId,
      currentUserId: user?.id,
      idsMatch: String(user?.id) === String(userId),
      queryKey,
      status: cached?.status,
      fetchStatus: cached?.fetchStatus,
      dataUpdatedAt: cached?.dataUpdatedAt,
      isInvalidated: cached?.isInvalidated,
      cachedDataExists: !!cachedData,
      cachedUsername: cachedData?.username,
      cachedViewerStatus: cachedData?.viewerStatus,
    })
    void queryClient
      .fetchQuery({
        queryKey: profileKeys.detail(userId),
        queryFn: async () => {
          console.log('[ProfileClient] getUserProfile START', { userId })

          try {
            const result = await getUserProfile(userId)

            console.log('[ProfileClient] getUserProfile SUCCESS', {
              userId,
              currentUserId: user?.id,
              username: result.username,
              viewerStatus: result.viewerStatus,
              profileId: result.id,
            })

            return result
          } catch (error) {
            console.error('[ProfileClient] getUserProfile FAILED', {
              userId,
              error,
            })

            throw error
          }
        },
        staleTime: 0,
      })
      .then(result => {
        console.log('[ProfileClient] fetchQuery RESOLVED', {
          userId,
          currentUserId: user?.id,
          cancelled,
          username: result.username,
          viewerStatus: result.viewerStatus,
          queryDataViewerStatus: queryClient.getQueryData<UserProfile>(profileKeys.detail(userId))
            ?.viewerStatus,
        })

        if (!cancelled) {
          console.log('[ProfileClient] Setting personalized profile', {
            userId,
            viewerStatus: result.viewerStatus,
          })

          setPersonalizedProfile(result)
        }
      })
      .catch(error => {
        console.error('[ProfileClient] fetchQuery FAILED', {
          userId,
          cancelled,
          error,
        })
      })

    if (postId && !isDeletedPost) {
      void queryClient.invalidateQueries({
        queryKey: postsKeys.post(postId),
      })
    }

    return () => {
      cancelled = true

      console.log('[ProfileClient] Auth effect CLEANUP', {
        userId,
        postId,
      })
    }
  }, [isAuth, isHydrated, isAuthenticated, queryClient, userId, postId, isDeletedPost])

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
