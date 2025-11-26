
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth, useFirestore, useMemoFirebase } from '@/firebase/provider';

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
          try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists() && userDoc.data()?.isAdmin) {
              setUser({ ...userAuth, isAdmin: true });
            } else {
              // Check if a new user document needs to be created
              if (!userDoc.exists()) {
                // This is a good place to create a user document if one doesn't exist
                // For now, we just set the user without admin rights
              }
              setUser(userAuth);
            }
          } catch (error) {
            console.error("Error fetching user document:", error);
            setUser(userAuth); // Fallback to user without admin status
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
