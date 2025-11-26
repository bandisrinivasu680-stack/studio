
'use client';
import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query,
  where,
  type CollectionReference,
  type Query,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import type { DocumentData } from 'firebase/firestore';

interface UseCollectionOptions {
  filter?: [string, '==', any];
}

export function useCollection(
  ref: CollectionReference | Query | null,
  options?: UseCollectionOptions
) {
  const [data, setData] = useState<DocumentData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(docs);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching collection:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ref]);

  return { data, loading };
}
