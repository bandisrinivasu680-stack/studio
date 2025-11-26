
'use client';
import { useState, useEffect } from 'react';
import { onSnapshot, type DocumentReference } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';

export function useDoc(ref: DocumentReference | null) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching document:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ref]);

  return { data, loading };
}
