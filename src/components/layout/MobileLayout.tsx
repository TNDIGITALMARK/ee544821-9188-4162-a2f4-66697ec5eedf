'use client';

import { BottomNavigation } from './BottomNavigation';
import { TopHeader } from './TopHeader';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showBottomNav?: boolean;
}

export function MobileLayout({
  children,
  showHeader = true,
  showBottomNav = true
}: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && <TopHeader />}

      <main
        className={cn(
          'w-full max-w-md mx-auto bg-background',
          showHeader && 'pt-16',
          showBottomNav && 'pb-20'
        )}
      >
        {children}
      </main>

      {showBottomNav && <BottomNavigation />}
    </div>
  );
}