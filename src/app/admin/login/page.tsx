'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { UserCog } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLoginPage() {
  const auth = useAuth();
  const { user, isAdmin, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAdmin) {
      router.push('/admin/upload');
    }
  }, [user, isAdmin, loading, router]);

  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  if (loading || isAdmin) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Sign in with an admin account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogin} className="w-full">
            <UserCog className="mr-2" /> Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
