'use client';

import { useState } from 'react';
import { Heart, MessageCircle, UserPlus } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUsers } from '@/lib/mockData';

// Mock activity data
const mockActivities = [
  {
    id: '1',
    type: 'like',
    user: mockUsers[1],
    action: 'liked your photo',
    timestamp: '2m',
    postImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    type: 'comment',
    user: mockUsers[2],
    action: 'commented: "Amazing shot! 📸"',
    timestamp: '15m',
    postImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    type: 'follow',
    user: mockUsers[3],
    action: 'started following you',
    timestamp: '1h',
    isFollowBack: false
  },
  {
    id: '4',
    type: 'like',
    user: mockUsers[4],
    action: 'liked your photo',
    timestamp: '2h',
    postImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop'
  },
  {
    id: '5',
    type: 'comment',
    user: mockUsers[0],
    action: 'commented: "Love this perspective! 🌟"',
    timestamp: '4h',
    postImage: 'https://images.unsplash.com/photo-1573160813959-df05c1ba1b0f?w=100&h=100&fit=crop'
  }
];

const followSuggestions = [
  {
    ...mockUsers[1],
    reason: 'Suggested for you'
  },
  {
    ...mockUsers[3],
    reason: 'Popular in your area'
  },
  {
    ...mockUsers[4],
    reason: 'Similar interests'
  }
];

export default function ActivityPage() {
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set());

  const handleFollow = (userId: string) => {
    setFollowingUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" fill="currentColor" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-green-500" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  return (
    <MobileLayout>
      <div className="bg-background">
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-background border-b border-border rounded-none h-12">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="mt-0 space-y-0">
            <div className="divide-y divide-border">
              {mockActivities.map(activity => (
                <div key={activity.id} className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={activity.user.avatar} alt={activity.user.displayName} />
                      <AvatarFallback>{activity.user.displayName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm">
                      <span className="font-semibold">{activity.user.username}</span>
                      {' '}
                      <span>{activity.action}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                  </div>

                  {activity.postImage ? (
                    <img
                      src={activity.postImage}
                      alt="Post thumbnail"
                      className="w-10 h-10 rounded object-cover"
                    />
                  ) : activity.type === 'follow' && (
                    <Button
                      size="sm"
                      variant={followingUsers.has(activity.user.id) ? 'secondary' : 'default'}
                      onClick={() => handleFollow(activity.user.id)}
                      className="px-4"
                    >
                      {followingUsers.has(activity.user.id) ? 'Following' : 'Follow'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-0 space-y-0">
            <div className="p-4">
              <h2 className="font-semibold mb-3">Suggested for you</h2>
              <div className="space-y-4">
                {followSuggestions.map(user => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} alt={user.displayName} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                        {user.displayName[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{user.username}</div>
                      <div className="text-xs text-muted-foreground">{user.displayName}</div>
                      <div className="text-xs text-muted-foreground">{user.reason}</div>
                    </div>

                    <Button
                      size="sm"
                      variant={followingUsers.has(user.id) ? 'secondary' : 'default'}
                      onClick={() => handleFollow(user.id)}
                      className="px-4"
                    >
                      {followingUsers.has(user.id) ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                ))}
              </div>

              {/* Discover more users */}
              <div className="mt-6 p-4 bg-muted rounded-lg text-center">
                <h3 className="font-semibold mb-2">Discover more people</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Find people you may know or have similar interests
                </p>
                <Button variant="outline" className="w-full">
                  See All Suggestions
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}