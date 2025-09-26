'use client';

import { useState } from 'react';
import { Settings, Grid, Bookmark, UserPlus } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockPosts, mockUsers } from '@/lib/mockData';

// Current user profile (for demo purposes)
const currentUser = {
  id: 'current_user',
  username: 'your_username',
  displayName: 'Your Name',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  bio: '🚀 Living life to the fullest | 📸 Capturing moments | 🌟 Dream big, work hard',
  isVerified: false,
  followersCount: 2847,
  followingCount: 634,
  postsCount: 89,
  website: 'yourwebsite.com',
  hasStory: false
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts');

  // Filter posts by current user (for demo, show all posts as user's)
  const userPosts = mockPosts;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

  return (
    <MobileLayout>
      <div className="bg-background">
        {/* Profile Header */}
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">{currentUser.username}</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <UserPlus className="w-4 h-4 mr-1" />
                Follow
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-xl">
                {currentUser.displayName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex justify-around text-center">
                <div>
                  <div className="font-semibold text-lg">{formatNumber(currentUser.postsCount)}</div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <div>
                  <div className="font-semibold text-lg">{formatNumber(currentUser.followersCount)}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div>
                  <div className="font-semibold text-lg">{formatNumber(currentUser.followingCount)}</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <h2 className="font-semibold">{currentUser.displayName}</h2>
            {currentUser.bio && (
              <p className="text-sm text-foreground whitespace-pre-line">{currentUser.bio}</p>
            )}
            {currentUser.website && (
              <a
                href={`https://${currentUser.website}`}
                className="text-sm text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentUser.website}
              </a>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-4">
            <Button variant="secondary" className="flex-1">
              Edit profile
            </Button>
            <Button variant="secondary" className="flex-1">
              Share profile
            </Button>
          </div>
        </div>

        {/* Story Highlights (placeholder) */}
        <div className="px-4 pb-4">
          <div className="text-sm text-muted-foreground mb-3">Story Highlights</div>
          <div className="flex gap-4 overflow-x-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-[70px]">
                <div className="w-16 h-16 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">New</span>
                </div>
                <span className="text-xs text-center">Highlight {i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-background border-t border-border rounded-none h-12">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <Grid className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-0">
            <div className="grid grid-cols-3 gap-px bg-muted">
              {userPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="aspect-square bg-background cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src={post.images[0]}
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {userPosts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Grid className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Posts Yet</h3>
                <p className="text-muted-foreground">When you share photos and videos, they'll appear on your profile.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bookmark className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Saved Posts</h3>
              <p className="text-muted-foreground">Save photos and videos to see them here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}