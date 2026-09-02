'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostModal } from '@/components/PostModal/PostModal'
import { CreatePostModal } from '@/features/createPost'
import { useIsMobileViewport } from '@/lib/hooks/useIsMobileViewport'
import { usePosts } from '@/lib/posts'
import s from '../../(with-mobile-menu)/profile/page.module.scss'

type ProfileClientProps = {
  userId: string
  postId?: string
  action?: string
}

export function ProfileClient({ userId, postId, action }: ProfileClientProps) {
  const router = useRouter()
  const isMobile = useIsMobileViewport()
  const { data: posts = [] } = usePosts()

  const selectedPost = posts.find(post => post.postId === postId)
  const selectedIndex = selectedPost
    ? posts.findIndex(post => post.postId === selectedPost.postId)
    : 0
  const showCreateModal = !postId && action === 'create'
  const handleClosePost = () => router.replace(`/profile/${userId}`)

  return (
    <>
      <Typography align={'center'} color={'white'} variant={'h1'}>
        Profile
      </Typography>

      <div className={s.feed}>
        {posts.map((post, index) => (
          <Link
            key={post.postId}
            href={`/profile/${userId}?postId=${post.postId}`}
            aria-label={`Open post ${index + 1}`}
            className={s.card}
          >
            <Image
              src={post.preview.url}
              alt={post.description ?? `Post ${index + 1}`}
              width={226}
              height={226}
              className={s.image}
            />
          </Link>
        ))}
      </div>

      {selectedPost &&
        (isMobile ? (
          <MobilePostViewer onClose={handleClosePost} posts={posts} startIndex={selectedIndex} />
        ) : (
          <PostModal post={selectedPost} open onClose={handleClosePost} />
        ))}

      {showCreateModal && <CreatePostModal userId={userId} />}
    </>
  )
}
