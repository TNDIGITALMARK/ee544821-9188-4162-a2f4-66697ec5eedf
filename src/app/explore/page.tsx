'use client';

import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Input } from '@/components/ui/input';
import { mockPosts, mockUsers } from '@/lib/mockData';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTags = [
    '#photography', '#travel', '#food', '#fitness', '#art',
    '#nature', '#lifestyle', '#tech', '#fashion', '#music'
  ];

  const filteredPosts = searchQuery
    ? mockPosts.filter(post =>
        post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockPosts;

  return (
    <MobileLayout>
      <div className="bg-background">
        {/* Search Header */}
        <div className="px-4 py-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users, posts, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted border-none"
            />
          </div>
        </div>

        {!searchQuery ? (
          // Explore content
          <div className="space-y-6 p-4">
            {/* Trending */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4" />
                <h2 className="font-semibold">Trending</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag.replace('#', ''))}
                    className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Explore Grid */}
            <div>
              <h2 className="font-semibold mb-3">Explore</h2>
              <div className="grid grid-cols-3 gap-px bg-muted">
                {mockPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="aspect-square bg-background cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={post.images[0]}
                      alt={`Explore post ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Search results
          <div className="space-y-4 p-4">
            <div className="text-sm text-muted-foreground">
              {filteredPosts.length} results for "{searchQuery}"
            </div>

            {/* Users results */}
            <div>
              <h3 className="font-semibold mb-3">Users</h3>
              <div className="space-y-3">
                {mockUsers
                  .filter(user =>
                    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(user => (
                    <div key={user.id} className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{user.username}</div>
                        <div className="text-muted-foreground text-sm">{user.displayName}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Posts results */}
            <div>
              <h3 className="font-semibold mb-3">Posts</h3>
              <div className="grid grid-cols-3 gap-px bg-muted">
                {filteredPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="aspect-square bg-background cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={post.images[0]}
                      alt={`Search result ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}