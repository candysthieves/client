'use client'

import { Button, MainAvatar, Typography } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostModal } from '@/components/PostModal/PostModal'
import { CreatePostModal } from '@/features/createPost'
import { useAuth } from '@/lib/hooks/useAuth'
import { useIsMobileViewport } from '@/lib/hooks/useIsMobileViewport'
import { usePosts } from '@/lib/posts'
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
  const { user } = useAuth()
  const { data: posts = [], isLoading } = usePosts()
  const profilePosts = posts
    .filter(post => post.userId === userId)
    .sort(
      (firstPost, secondPost) => Date.parse(secondPost.createdAt) - Date.parse(firstPost.createdAt)
    )
    .slice(0, 8)
  const profileName = profilePosts[0]?.userName ?? userId
  const isOwner = user?.id === userId

  const selectedPost = profilePosts.find(post => post.postId === postId)
  const selectedIndex = selectedPost
    ? profilePosts.findIndex(post => post.postId === selectedPost.postId)
    : 0
  const showCreateModal = !postId && action === 'create'
  const handleClosePost = () => router.replace(`/profile/${userId}`)

  if (isLoading) {
    return <ProfileSkeleton />
  }

  return (
    <>
      <div className={s.profile}>
        <section className={s.profileHeader} aria-labelledby={'profile-name'}>
          <MainAvatar className={s.profileAvatar} userName={profileName} size={'xxl'} delayMs={0} />

          <div className={s.profileInfo}>
            <Typography
              id={'profile-name'}
              className={s.profileName}
              color={'white'}
              variant={'h1'}
            >
              {profileName}
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
                <dd className={s.statValue}>{profilePosts.length}</dd>
              </div>
            </dl>

            <p className={s.about}>
              <span className={s.aboutLabel}>About me</span>
              This profile shares photos and stories with the community.
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
