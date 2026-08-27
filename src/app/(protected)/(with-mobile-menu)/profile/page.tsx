'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { useState } from 'react'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostModal } from '@/components/PostModal/PostModal'
import { useIsMobileViewport } from '@/lib/hooks/useIsMobileViewport'
import { mockPosts, Post } from '@/mocks/posts'
import s from './page.module.scss'

export default function ProfilePage() {
  const [selectedPost, setSelectedPost] = useState<null | Post>(null)
  const isMobile = useIsMobileViewport()

  const selectedIndex = selectedPost
    ? mockPosts.findIndex(post => post.postId === selectedPost.postId)
    : 0

  return (
    <>
      <Typography align={'center'} color={'white'} variant={'h1'}>
        Profile
      </Typography>

      <div className={s.feed}>
        {mockPosts.map((post, index) => (
          <button
            key={post.postId}
            type={'button'}
            aria-label={`Open post ${index + 1}`}
            className={s.card}
            onClick={() => setSelectedPost(post)}
          >
            <Image
              src={post.preview.url}
              alt={post.description ?? `Post ${index + 1}`}
              width={226}
              height={226}
              className={s.image}
            />
          </button>
        ))}
      </div>

      {selectedPost &&
        (isMobile ? (
          <MobilePostViewer
            onClose={() => setSelectedPost(null)}
            posts={mockPosts}
            startIndex={selectedIndex}
          />
        ) : (
          <PostModal post={selectedPost} open onClose={() => setSelectedPost(null)} />
        ))}
    </>
  )
}
