// Temporary types and mock data for PostDetailsModal.

export type PostImage = {
  // inner fields are not finalized by the backend yet
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
      url: 'https://images.unsplash.com/photo-1778017458320-fd7f6688cbf5?q=80&w=986&h=1130&auto=format&fit=crop',
      width: 986,
      height: 1130,
    },
    {
      url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=986&h=1130&auto=format&fit=crop',
      width: 986,
      height: 1130,
    },
  ],

  preview: {
    url: 'https://images.unsplash.com/photo-1778017458320-fd7f6688cbf5?q=80&w=196&h=226&auto=format&fit=crop',
  },

  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',

  userId: 'user-1',
  userName: 'Alex Johnson',
  willBeDeletedIn: null,
}

export const mockComments: Comment[] = [
  {
    id: '1',
    username: 'User Name',
    avatarUrl: 'https://i.pravatar.cc/40?img=8',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    createdAt: '2 hours ago',
    likesCount: 12,
  },
  {
    id: '2',
    username: 'Another User',
    avatarUrl: 'https://i.pravatar.cc/40?img=9',
    text: 'This is a really nice photo!',
    createdAt: '1 hour ago',
    likesCount: 5,
  },
  {
    id: '3',
    username: 'John Doe',
    avatarUrl: 'https://i.pravatar.cc/40?img=10',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
    createdAt: '30 minutes ago',
  },
  {
    id: '4',
    username: 'Jane Doe',
    avatarUrl: 'https://i.pravatar.cc/40?img=11',
    text: 'Amazing!',
    createdAt: '10 minutes ago',
    likesCount: 1,
  },
]

export const mockLikedByUsers: LikedByUser[] = [
  { userName: 'User One', src: 'https://i.pravatar.cc/40?img=5' },
  { userName: 'User Two', src: 'https://i.pravatar.cc/40?img=6' },
  { userName: 'User Three', src: 'https://i.pravatar.cc/40?img=7' },
]
