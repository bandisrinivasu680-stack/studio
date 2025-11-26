import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Store } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/home" className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Store className="h-6 w-6" />
            </Button>
            <Store className="hidden h-6 w-6 md:block" />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">
              FreeZone Store
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/user/40/40" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
