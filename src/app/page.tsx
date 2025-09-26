'use client';

import { useState, useEffect } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { StoriesRow } from '@/components/stories/StoriesRow';
import { PostCard } from '@/components/posts/PostCard';
import { mockPosts, generateMorePosts, Post } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [loading, setLoading] = useState(false);

  // Simulate infinite scroll
  const loadMorePosts = () => {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      const newPosts = generateMorePosts(5);
      setPosts(prev => [...prev, ...newPosts]);
      setLoading(false);
    }, 1000);
  };

  // Handle scroll for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleSave = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isSaved: !post.isSaved
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId);
    // TODO: Navigate to comments modal/page
  };

  return (
    <MobileLayout>
      <div className="space-y-0">
        {/* Stories */}
        <StoriesRow />

        {/* Feed */}
        <div className="space-y-0">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onSave={handleSave}
              onComment={handleComment}
            />
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}