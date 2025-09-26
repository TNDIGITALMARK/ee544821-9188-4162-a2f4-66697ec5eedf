'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { User } from '@/lib/mockData';

interface StoryRingProps {
  user: User;
  hasStory?: boolean;
  isViewed?: boolean;
  onClick?: () => void;
}

export function StoryRing({ user, hasStory = false, isViewed = false, onClick }: StoryRingProps) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[70px]">
      <div
        className={cn(
          'relative cursor-pointer transition-transform hover:scale-105',
          'rounded-full p-0.5',
          hasStory && !isViewed && 'story-gradient',
          hasStory && isViewed && 'bg-gray-300',
          !hasStory && 'bg-transparent'
        )}
        onClick={onClick}
      >
        <div className="rounded-full bg-background p-0.5">
          <Avatar className="w-14 h-14 border-2 border-background">
            <AvatarImage src={user.avatar} alt={user.displayName} />
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
              {user.displayName[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Add story plus icon for user's own story */}
        {user.username === 'your_story' && (
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-background">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        )}
      </div>

      <span className="text-xs text-center text-foreground truncate w-full max-w-[70px]">
        {user.username === 'your_story' ? 'Your story' : user.username}
      </span>
    </div>
  );
}