'use client'

import { Button, MainAvatar, Typography } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Post } from '@/mocks/posts'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostModal } from '@/components/PostModal/PostModal'
import { CreatePostModal } from '@/features/createPost'
import { useIsMobileViewport } from '@/lib/hooks/useIsMobileViewport'
import { useProfile, useProfilePosts } from '@/lib/profile'
import { PostsFeed } from './PostsFeed'
import s from './ProfileClient.module.scss'
import { ProfileSkeleton } from './ProfileSkeleton'

type ProfileClientProps = {
  userId: string
  postId?: string
  action?: string
}

export function ProfileClient({ userId, postId, action }: ProfileClientProps) {
  const router = useRouter()
  const isMobile = useIsMobileViewport()
  const { data: profile, isLoading: isProfileLoading } = useProfile(userId)
  const { data: profilePostsResponse, isLoading: arePostsLoading } = useProfilePosts(userId)
  const profilePosts: Post[] = (profilePostsResponse?.items ?? []).map(post => ({
    postId: post.id,
    description: post.description,
    images: post.images,
    preview: post.preview,
    userId,
    userName: profile?.username ?? userId,
    createdAt: post.createdAt,
    willBeDeletedIn: post.willBeDeleted ? new Date(post.willBeDeleted) : null,
  }))
  const isOwner = profile?.isOwner ?? false

  const selectedPost = profilePosts.find(post => post.postId === postId)
  const selectedIndex = selectedPost
    ? profilePosts.findIndex(post => post.postId === selectedPost.postId)
    : 0
  const showCreateModal = !postId && action === 'create'
  const handleClosePost = () => router.replace(`/profile/${userId}`)

  if (isProfileLoading || arePostsLoading) {
    return <ProfileSkeleton />
  }

  return (
    <>
      <div className={s.profile}>
        <section className={s.profileHeader} aria-labelledby={'profile-name'}>
          <MainAvatar
            className={s.profileAvatar}
            userName={profile?.username ?? userId}
            src={profile?.avatarPreviewUrl.url}
            size={'xxl'}
            delayMs={0}
          />

          <div className={s.profileInfo}>
            <Typography
              id={'profile-name'}
              className={s.profileName}
              color={'white'}
              variant={'h1'}
            >
              {profile?.username ?? userId}
            </Typography>

            {isOwner && (
              <Button
                as={Link}
                className={s.settingsButton}
                href={'/profile/general-information'}
                variant={'secondary'}
              >
                Profile Settings
              </Button>
            )}

            <dl className={s.stats}>
              <div className={s.stat}>
                <dt className={s.statLabel}>Publications</dt>
                <dd className={s.statValue}>{profile?.publicationsCount ?? 0}</dd>
              </div>
            </dl>

            <p className={s.about}>
              <span className={s.aboutLabel}>About me</span>
              {profile?.description ?? ''}
            </p>
          </div>
        </section>

        <PostsFeed posts={profilePosts} profileId={userId} />
      </div>

      {selectedPost &&
        (isMobile ? (
          <MobilePostViewer
            onClose={handleClosePost}
            posts={profilePosts}
            startIndex={selectedIndex}
          />
        ) : (
          <PostModal post={selectedPost} open onClose={handleClosePost} />
        ))}

      {showCreateModal && isOwner && <CreatePostModal userId={userId} />}
    </>
  )
}
