// Temporary types and shared mock data for posts, used across
// components before the real API replaces them.

export type PostImage = {
  url: string
  width?: number
  height?: number
}

export type PostPreview = {
  url: string
}

export type Post = {
  postId: string
  description?: string
  images: PostImage[]
  preview: PostPreview
  userId: string
  userName: string
  createdAt: string
  willBeDeletedIn: Date | null
}

export type Comment = {
  id: string
  username: string
  avatarUrl?: string
  text: string
  createdAt: string
  likesCount?: number
}

export type LikedByUser = {
  userName: string
  src: string
}

export const mockComments: Comment[] = [
  {
    id: '1',
    username: 'anna.murphy',
    avatarUrl: 'https://i.pravatar.cc/40?img=8',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    createdAt: '2 hours ago',
    likesCount: 12,
  },
  {
    id: '2',
    username: 'dmitry_k',
    avatarUrl: 'https://i.pravatar.cc/40?img=9',
    text: 'This is a really nice photo!',
    createdAt: '1 hour ago',
    likesCount: 5,
  },
  {
    id: '3',
    username: 'johndoe_official',
    avatarUrl: 'https://i.pravatar.cc/40?img=10',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
    createdAt: '30 minutes ago',
  },
  {
    id: '4',
    username: 'jane_doe',
    avatarUrl: 'https://i.pravatar.cc/40?img=11',
    text: 'Amazing!',
    createdAt: '10 minutes ago',
    likesCount: 1,
  },
]

export const mockLikedByUsers: LikedByUser[] = [
  { userName: 'mark_levin', src: 'https://i.pravatar.cc/40?img=5' },
  { userName: 'sofia.petrova', src: 'https://i.pravatar.cc/40?img=6' },
  { userName: 'kate_wolf', src: 'https://i.pravatar.cc/40?img=7' },
]
