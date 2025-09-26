'use client';

import { Home, Camera, User, Search, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, href: '/', label: 'Home' },
  { icon: Search, href: '/explore', label: 'Search' },
  { icon: Camera, href: '/create', label: 'Create' },
  { icon: Heart, href: '/activity', label: 'Activity' },
  { icon: User, href: '/profile', label: 'Profile' },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, href, label }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center p-2 transition-colors',
                'hover:text-foreground',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
              aria-label={label}
            >
              <Icon
                className={cn(
                  'w-6 h-6 mb-1',
                  isActive && 'scale-110'
                )}
                fill={isActive ? 'currentColor' : 'none'}
              />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}