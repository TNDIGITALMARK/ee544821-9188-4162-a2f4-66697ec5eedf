'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { StoryRing } from './StoryRing';
import { mockUsers, mockStories } from '@/lib/mockData';

// Add user's own story at the beginning
const yourStory = {
  id: 'your_story',
  username: 'your_story',
  displayName: 'Your Story',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  followersCount: 0,
  followingCount: 0,
  postsCount: 0,
  hasStory: false
};

export function StoriesRow() {
  const handleStoryClick = (userId: string) => {
    if (userId === 'your_story') {
      // Handle create story
      console.log('Create story clicked');
    } else {
      // Handle view story
      console.log('View story:', userId);
    }
  };

  const usersWithStories = mockUsers.filter(user => user.hasStory);
  const storiesData = mockStories.reduce((acc, story) => {
    acc[story.user.id] = story.isViewed;
    return acc;
  }, {} as Record<string, boolean>);

  return (
    <div className="bg-card border-b border-border">
      <ScrollArea className="w-full">
        <div className="flex gap-4 p-4 overflow-x-auto">
          {/* Your story */}
          <StoryRing
            user={yourStory}
            hasStory={false}
            onClick={() => handleStoryClick('your_story')}
          />

          {/* Other users' stories */}
          {usersWithStories.map(user => (
            <StoryRing
              key={user.id}
              user={user}
              hasStory={true}
              isViewed={storiesData[user.id] || false}
              onClick={() => handleStoryClick(user.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}