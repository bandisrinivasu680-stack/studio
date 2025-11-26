'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Search, Book } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/apps', icon: LayoutGrid, label: 'Apps' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/books', icon: Book, label: 'Books' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <nav className="grid h-16 grid-cols-4 items-center justify-center text-xs">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-full flex-col items-center justify-center gap-1"
            >
              <item.icon
                className={cn(
                  'h-6 w-6',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <span
                className={cn(
                  'font-medium',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
