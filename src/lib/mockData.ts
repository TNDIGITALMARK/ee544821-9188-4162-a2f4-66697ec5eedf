// Mock data for Instagram-style social media app

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio?: string;
  isVerified?: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  website?: string;
  isFollowing?: boolean;
  hasStory?: boolean;
}

export interface Post {
  id: string;
  user: User;
  images: string[];
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
  isSaved: boolean;
  location?: string;
  tags?: string[];
}

export interface Story {
  id: string;
  user: User;
  image: string;
  timestamp: string;
  isViewed: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  likes: number;
  timestamp: string;
  replies?: Comment[];
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'alex_adventures',
    displayName: 'Alex Martinez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: '🌍 Travel photographer | 📸 Capturing moments | ✈️ Next: Tokyo',
    isVerified: true,
    followersCount: 125400,
    followingCount: 890,
    postsCount: 432,
    website: 'alexmartinez.com',
    hasStory: true
  },
  {
    id: '2',
    username: 'sarah_creates',
    displayName: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b765?w=150&h=150&fit=crop&crop=face',
    bio: '🎨 Digital artist & UI designer | 💫 Creating magic pixels',
    isVerified: false,
    followersCount: 45200,
    followingCount: 1200,
    postsCount: 287,
    hasStory: true
  },
  {
    id: '3',
    username: 'fitness_mike',
    displayName: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: '💪 Personal trainer | 🏃‍♂️ Marathon runner | Helping you reach your goals',
    isVerified: true,
    followersCount: 89300,
    followingCount: 543,
    postsCount: 612,
    hasStory: false
  },
  {
    id: '4',
    username: 'maya_food',
    displayName: 'Maya Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: '🍜 Food blogger | 👩‍🍳 Recipe creator | 📍 San Francisco',
    isVerified: false,
    followersCount: 67800,
    followingCount: 890,
    postsCount: 524,
    hasStory: true
  },
  {
    id: '5',
    username: 'david_tech',
    displayName: 'David Kumar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: '🚀 Tech entrepreneur | 💻 Building the future | 🎯 AI & Blockchain',
    isVerified: true,
    followersCount: 234500,
    followingCount: 432,
    postsCount: 189,
    website: 'davidkumar.tech',
    hasStory: false
  }
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop',
    ],
    caption: 'Incredible sunset views from the mountains! 🌄✨ Sometimes you need to climb high to see how small your problems really are. #mountains #sunset #adventure #nature',
    likes: 12847,
    comments: 324,
    shares: 89,
    timestamp: '2h',
    isLiked: false,
    isSaved: true,
    location: 'Rocky Mountains, Colorado',
    tags: ['mountains', 'sunset', 'adventure', 'nature']
  },
  {
    id: '2',
    user: mockUsers[1],
    images: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&h=500&fit=crop'
    ],
    caption: 'Just finished this UI design for a meditation app 🧘‍♀️ The gradient work took forever but so worth it! What do you think? #uidesign #app #meditation #design',
    likes: 3421,
    comments: 156,
    shares: 67,
    timestamp: '4h',
    isLiked: true,
    isSaved: false,
    tags: ['uidesign', 'app', 'meditation', 'design']
  },
  {
    id: '3',
    user: mockUsers[2],
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop'
    ],
    caption: 'Morning workout complete! 💪 Remember: your only competition is who you were yesterday. Push yourself but listen to your body. #fitness #motivation #workout #health',
    likes: 8934,
    comments: 234,
    shares: 145,
    timestamp: '6h',
    isLiked: false,
    isSaved: false,
    location: 'Gold\'s Gym, Venice Beach',
    tags: ['fitness', 'motivation', 'workout', 'health']
  },
  {
    id: '4',
    user: mockUsers[3],
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=500&fit=crop'
    ],
    caption: 'Homemade ramen bowl 🍜 Recipe in my stories! The secret is in the 24-hour broth. Who wants to try making this? #foodie #ramen #homemade #recipe',
    likes: 5673,
    comments: 289,
    shares: 234,
    timestamp: '8h',
    isLiked: true,
    isSaved: true,
    tags: ['foodie', 'ramen', 'homemade', 'recipe']
  },
  {
    id: '5',
    user: mockUsers[4],
    images: [
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=500&fit=crop'
    ],
    caption: 'Excited to announce our new AI platform launch! 🚀 Three years of hard work finally paying off. The future of work is here. #ai #startup #technology #launch',
    likes: 15234,
    comments: 567,
    shares: 892,
    timestamp: '12h',
    isLiked: false,
    isSaved: false,
    location: 'San Francisco, CA',
    tags: ['ai', 'startup', 'technology', 'launch']
  }
];

// Mock Stories
export const mockStories: Story[] = [
  {
    id: '1',
    user: mockUsers[0],
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=500&fit=crop',
    timestamp: '2h',
    isViewed: false
  },
  {
    id: '2',
    user: mockUsers[1],
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=500&fit=crop',
    timestamp: '4h',
    isViewed: true
  },
  {
    id: '3',
    user: mockUsers[3],
    image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=300&h=500&fit=crop',
    timestamp: '6h',
    isViewed: false
  }
];

// Mock Comments
export const mockComments: Record<string, Comment[]> = {
  '1': [
    {
      id: '1',
      user: mockUsers[1],
      text: 'Absolutely stunning! 😍 Where exactly is this?',
      likes: 23,
      timestamp: '1h'
    },
    {
      id: '2',
      user: mockUsers[2],
      text: 'This makes me want to go hiking right now!',
      likes: 15,
      timestamp: '45m'
    },
    {
      id: '3',
      user: mockUsers[3],
      text: 'Goals! Adding this to my bucket list 🙌',
      likes: 8,
      timestamp: '30m'
    }
  ],
  '2': [
    {
      id: '4',
      user: mockUsers[0],
      text: 'Love the color palette! Very calming 🎨',
      likes: 12,
      timestamp: '2h'
    },
    {
      id: '5',
      user: mockUsers[4],
      text: 'Clean design! Would love to see the full prototype',
      likes: 18,
      timestamp: '1h'
    }
  ],
  '3': [
    {
      id: '6',
      user: mockUsers[1],
      text: 'Consistency is key! Keep it up 💪',
      likes: 34,
      timestamp: '3h'
    },
    {
      id: '7',
      user: mockUsers[3],
      text: 'What\'s your favorite pre-workout meal?',
      likes: 7,
      timestamp: '2h'
    }
  ]
};

// Helper functions
export const getRandomUser = (): User => {
  return mockUsers[Math.floor(Math.random() * mockUsers.length)];
};

export const getPostComments = (postId: string): Comment[] => {
  return mockComments[postId] || [];
};

export const generateMorePosts = (count: number): Post[] => {
  const additionalPosts: Post[] = [];
  const sampleImages = [
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1573160813959-df05c1ba1b0f?w=500&h=500&fit=crop'
  ];

  for (let i = 0; i < count; i++) {
    const user = getRandomUser();
    const imageCount = Math.random() > 0.7 ? 2 : 1;
    const images = Array.from(
      { length: imageCount },
      () => sampleImages[Math.floor(Math.random() * sampleImages.length)]
    );

    additionalPosts.push({
      id: `generated_${i + 6}`,
      user,
      images,
      caption: `Amazing content from ${user.displayName}! #content #social #amazing`,
      likes: Math.floor(Math.random() * 50000) + 100,
      comments: Math.floor(Math.random() * 500) + 10,
      shares: Math.floor(Math.random() * 100) + 5,
      timestamp: `${Math.floor(Math.random() * 24) + 1}h`,
      isLiked: Math.random() > 0.5,
      isSaved: Math.random() > 0.8,
      tags: ['content', 'social', 'amazing']
    });
  }

  return additionalPosts;
};