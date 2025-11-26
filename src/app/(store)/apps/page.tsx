'use client';
import { AppCard } from '@/components/app-card';
import { useCollection } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { App } from '@/lib/data';

export default function AppsPage() {
  const firestore = useFirestore();
  const { data: apps, loading } = useCollection(
    firestore ? collection(firestore, 'apps') : null
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  
  const typedApps = (apps as App[]) || [];

  return (
    <div>
      <h1 className="font-headline text-3xl font-bold">All Apps</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {typedApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
