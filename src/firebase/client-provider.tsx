'use client';

import React, { useMemo } from 'react';
import { FirebaseProvider, initializeFirebase } from '@/firebase';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const firebaseContext = useMemo(() => {
    return initializeFirebase();
  }, []);

  return (
    <FirebaseProvider {...firebaseContext}>
        <FirebaseErrorListener />
        {children}
    </FirebaseProvider>
  );
}
