'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { LogIn, Store, UserCog } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  const auth = useAuth();
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/home');
    }
  }, [user, loading, router]);

  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/home');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  if (loading || user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
       <Card className="w-full max-w-sm">
         <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
                <Store className="h-10 w-10" />
            </div>
           <CardTitle className="text-2xl font-headline">Welcome to FreeZone</CardTitle>
           <CardDescription>Sign in to discover amazing free apps.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
           <Button onClick={handleLogin} className="w-full">
             <LogIn className="mr-2" /> Sign in with Google
           </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    Or
                    </span>
                </div>
            </div>
            <Button variant="outline" asChild className="w-full">
                <Link href="/admin/login">
                  <UserCog className="mr-2" /> Continue as Admin
                </Link>
              </Button>
         </CardContent>
       </Card>
     </div>
  );
}
