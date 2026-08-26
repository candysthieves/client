// Temporary types and mock data for PostDetailsModal.

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

export const mockPost: Post = {
  postId: '1',

  images: [
    {
      url: 'https://images.unsplash.com/photo-1778017458320-fd7f6688cbf5?q=80&w=1080&h=1080&auto=format&fit=crop',
      width: 1080,
      height: 1080,
    },
    {
      url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&h=1250&auto=format&fit=crop',
      width: 1000,
      height: 1250,
    },
    {
      url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1280&h=720&auto=format&fit=crop',
      width: 1280,
      height: 720,
    },
  ],

  preview: {
    url: 'https://images.unsplash.com/photo-1778017458320-fd7f6688cbf5?q=80&w=196&h=196&auto=format&fit=crop',
  },

  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',

  userId: 'user-1',
  userName: 'alex_johnson',
  willBeDeletedIn: null,
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
