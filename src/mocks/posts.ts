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

export const mockPosts: Post[] = [
  {
    postId: '1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
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
    userId: 'user-1',
    userName: 'alex_johnson',
    createdAt: '2 hours ago',
    willBeDeletedIn: null,
  },
  {
    postId: '2',
    description: 'Weekend trip to the mountains. No filter needed.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&h=1250&auto=format&fit=crop',
        width: 1000,
        height: 1250,
      },
    ],
    preview: {
      url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=296&h=296&auto=format&fit=crop',
    },
    userId: 'user-2',
    userName: 'anna.murphy',
    createdAt: '5 hours ago',
    willBeDeletedIn: null,
  },
  {
    postId: '3',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1280&h=720&auto=format&fit=crop',
        width: 1280,
        height: 720,
      },
    ],
    preview: {
      url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=296&h=296&auto=format&fit=crop',
    },
    userId: 'user-3',
    userName: 'dmitry_k',
    createdAt: 'yesterday',
    willBeDeletedIn: null,
  },
  {
    postId: '4',
    description: 'Coffee and a good book on a rainy afternoon.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1080&h=1080&auto=format&fit=crop',
        width: 1080,
        height: 1080,
      },
      {
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&h=1250&auto=format&fit=crop',
        width: 1000,
        height: 1250,
      },
    ],
    preview: {
      url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=296&h=296&auto=format&fit=crop',
    },
    userId: 'user-4',
    userName: 'sarah_connor',
    createdAt: '8 hours ago',
    willBeDeletedIn: null,
  },
]

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
