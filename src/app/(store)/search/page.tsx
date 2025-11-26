'use client';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { VoiceSearchButton } from '@/components/voice-search-button';
import { categories, trendingSearches } from '@/lib/data';
import type { App } from '@/lib/data';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
import { AppCard } from '@/components/app-card';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const firestore = useFirestore();
  const appsCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'apps') : null),
    [firestore]
  );
  const { data: apps, loading } = useCollection(appsCollection);

  const filteredApps = useMemo(() => {
    if (!searchText || !apps) return [];
    const typedApps = apps as App[];
    return typedApps.filter(app =>
      app.name.toLowerCase().includes(searchText.toLowerCase()) ||
      app.developer.toLowerCase().includes(searchText.toLowerCase()) ||
      app.category.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, apps]);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };
  
  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for apps & games..."
          className="h-12 w-full rounded-full bg-card pl-10 pr-16 text-base"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <VoiceSearchButton onTranscript={handleSearch} />
        </div>
      </div>
      
      {searchText ? (
        <SearchResults apps={filteredApps} loading={loading} />
      ) : (
        <SearchSuggestions onChipClick={handleSearch} />
      )}
    </div>
  );
}

function SearchSuggestions({ onChipClick }: { onChipClick: (text: string) => void }) {
  return (
    <>
      <div className="space-y-4">
        <h2 className="font-headline text-lg font-semibold">Discover</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/10"
              onClick={() => onChipClick(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="font-headline text-lg font-semibold">Trending searches</h2>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((search) => (
            <Badge
              key={search}
              variant="outline"
              className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/10"
              onClick={() => onChipClick(search)}
            >
              {search}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}

function SearchResults({ apps, loading }: { apps: App[], loading: boolean }) {
  if (loading) {
    return <div className="text-center text-muted-foreground">Searching...</div>;
  }
  if (apps.length === 0) {
    return <div className="text-center text-muted-foreground">No apps found.</div>;
  }
  return (
     <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
  );
}
