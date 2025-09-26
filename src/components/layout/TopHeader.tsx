'use client';

import { MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

export function TopHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 max-w-md mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/generated/connect-logo.png"
            alt="Connect"
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/messages"
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Messages"
          >
            <MessageCircle className="w-6 h-6" />
          </Link>
          <Link
            href="/share"
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Share"
          >
            <Send className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}