'use client';

import { useState, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Post } from '@/lib/mockData';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onSave?: (postId: string) => void;
  onComment?: (postId: string) => void;
}

export function PostCard({ post, onLike, onSave, onComment }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDoubleTapHeart, setShowDoubleTapHeart] = useState(false);
  const doubleTapTimeout = useRef<NodeJS.Timeout>();

  const handleImageTap = () => {
    if (doubleTapTimeout.current) {
      // Double tap detected
      clearTimeout(doubleTapTimeout.current);
      doubleTapTimeout.current = undefined;
      handleDoubleTapLike();
    } else {
      // Single tap - set timeout for potential double tap
      doubleTapTimeout.current = setTimeout(() => {
        doubleTapTimeout.current = undefined;
        // Single tap action could go here (e.g., pause video)
      }, 300);
    }
  };

  const handleDoubleTapLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      onLike?.(post.id);
      setShowDoubleTapHeart(true);
      setTimeout(() => setShowDoubleTapHeart(false), 600);
    }
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    onLike?.(post.id);
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
    onSave?.(post.id);
  };

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
    <article className="bg-card border-b border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={post.user.avatar} alt={post.user.displayName} />
            <AvatarFallback>{post.user.displayName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">{post.user.username}</span>
              {post.user.isVerified && (
                <svg className="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              )}
            </div>
            {post.location && (
              <span className="text-xs text-muted-foreground">{post.location}</span>
            )}
          </div>
        </div>
        <Button variant="ghost" size="sm" className="p-1">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Image(s) */}
      <div className="relative aspect-square bg-muted">
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={handleImageTap}
        >
          <img
            src={post.images[currentImageIndex]}
            alt={`Post by ${post.user.displayName}`}
            className="w-full h-full object-cover"
          />

          {/* Double tap heart animation */}
          {showDoubleTapHeart && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Heart className="w-20 h-20 text-white drop-shadow-lg double-tap-heart" fill="currentColor" />
            </div>
          )}

          {/* Image indicators for multiple images */}
          {post.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {post.images.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    index === currentImageIndex ? 'bg-primary' : 'bg-white/50'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Swipe navigation for multiple images */}
        {post.images.length > 1 && (
          <>
            {currentImageIndex > 0 && (
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1"
                onClick={() => setCurrentImageIndex(prev => prev - 1)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {currentImageIndex < post.images.length - 1 && (
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1"
                onClick={() => setCurrentImageIndex(prev => prev + 1)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto"
            onClick={handleLikeClick}
          >
            <Heart
              className={cn(
                'w-6 h-6 transition-colors',
                isLiked ? 'text-red-500 heart-animation' : 'text-foreground'
              )}
              fill={isLiked ? 'currentColor' : 'none'}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto"
            onClick={() => onComment?.(post.id)}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <Send className="w-6 h-6" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-auto"
          onClick={handleSaveClick}
        >
          <Bookmark
            className={cn(
              'w-6 h-6',
              isSaved ? 'text-foreground' : 'text-foreground'
            )}
            fill={isSaved ? 'currentColor' : 'none'}
          />
        </Button>
      </div>

      {/* Engagement metrics */}
      <div className="px-3 pb-2">
        <div className="font-semibold text-sm">
          {formatNumber(post.likes)} likes
        </div>
      </div>

      {/* Caption */}
      <div className="px-3 pb-2">
        <div className="text-sm">
          <span className="font-semibold mr-2">{post.user.username}</span>
          <span>{post.caption}</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-1">
            {post.tags.map(tag => (
              <span key={tag} className="text-blue-500 text-sm mr-1">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Comments preview */}
      <div className="px-3 pb-2">
        <button className="text-muted-foreground text-sm">
          View all {formatNumber(post.comments)} comments
        </button>
      </div>

      {/* Timestamp */}
      <div className="px-3 pb-3">
        <span className="text-muted-foreground text-xs uppercase">
          {post.timestamp} ago
        </span>
      </div>
    </article>
  );
}