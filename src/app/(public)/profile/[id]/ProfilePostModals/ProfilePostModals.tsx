'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostModal } from '@/components/PostModal/PostModal'
import { CreatePostModal } from '@/features/createPost'
import { useIsMobileViewport } from '@/lib/hooks'
import { UserProfile } from '@/lib/model'
import { usePost } from '@/lib/posts'
import { useProfilePosts, useDeletedPosts } from '@/lib/profile'
import { useDeletedPost } from '@/lib/profile/queries/useDeletedPost'

type ProfilePostModalsProps = {
  userId: string
  postId?: string
  action?: string
  isOwner: boolean
  profile: UserProfile
  displayedProfile: UserProfile
}

export function ProfilePostModals({
  userId,
  postId,
  action,
  isOwner,
  profile,
  displayedProfile,
}: ProfilePostModalsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useIsMobileViewport()

  const postType = searchParams.get('type')
  const isDeletedPost = postType === 'deleted'

  const { data: profilePostsData } = useProfilePosts(userId)
  const { data: deletedPostsResponse } = useDeletedPosts(userId, isOwner)

  const { data: postDetails } = usePost(isDeletedPost ? undefined : postId)
  const { data: requestedDeletedPostResponse } = useDeletedPost(
    userId,
    postId,
    isOwner && isDeletedPost
  )

  const profilePosts = profilePostsData?.pages.flatMap(page => page.items) ?? []
  const deletedPosts = deletedPostsResponse?.items ?? []

  // Защита: если пост опубликованный, но его автор не совпадает с текущим профилем — уводим пользователя
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

  return (
    <>
      {selectedPost &&
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

      {showCreateModal && <CreatePostModal userProfile={displayedProfile} />}
    </>
  )
}
