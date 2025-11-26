
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase/provider';

interface AppUser extends User {
  isAdmin?: boolean;
}

export function useUser() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        if (firestore) {
          const userDocRef = doc(firestore, 'users', userAuth.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists() && userDoc.data()?.isAdmin) {
            setUser({ ...userAuth, isAdmin: true });
          } else {
            setUser(userAuth);
          }
        } else {
          setUser(userAuth);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, firestore]);

  return { user, loading, isAdmin: !!user?.isAdmin };
}
