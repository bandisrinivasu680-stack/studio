'use client';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Store, LogIn, LogOut, Upload } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export function Header() {
  const auth = useAuth();
  const { user, isAdmin } = useUser();

  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


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
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isAdmin && (
            <Button variant="ghost" asChild>
              <Link href="/admin/upload">
                <Upload />
                <span className="hidden sm:inline-block">Upload App</span>
              </Link>
            </Button>
          )}
          {user ? (
            <>
              <Avatar>
                <AvatarImage src={user.photoURL || undefined} />
                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button onClick={handleLogout} variant="ghost">
                <LogOut />
                 <span className="hidden sm:inline-block">Logout</span>
              </Button>
            </>
          ) : (
            <Button onClick={handleLogin}>
              <LogIn />
              <span className="hidden sm:inline-block">Login</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
