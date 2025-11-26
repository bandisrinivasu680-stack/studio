'use client';
import { useParams } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { App } from '@/lib/data';
import Image from 'next/image';
import { StarRating } from '@/components/star-rating';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Download } from 'lucide-react';

export default function AppDetailsPage() {
  const params = useParams();
  const { appId } = params;
  const firestore = useFirestore();

  const appRef = useMemoFirebase(
    () => (firestore && appId ? doc(firestore, 'apps', appId as string) : null),
    [firestore, appId]
  );
  const { data: app, loading } = useDoc(appRef);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading app details...</div>;
  }

  if (!app) {
    return <div className="flex items-center justify-center h-full">App not found.</div>;
  }

  const typedApp = app as App;

  return (
    <div className="space-y-8">
      <header className="flex items-start gap-6">
        <Image
          src={typedApp.iconUrl}
          alt={`${typedApp.name} icon`}
          width={128}
          height={128}
          className="rounded-3xl shadow-md"
        />
        <div className="flex-1 space-y-2">
          <h1 className="font-headline text-4xl font-bold">{typedApp.name}</h1>
          <p className="text-lg text-primary">{typedApp.developer}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{typedApp.rating.toFixed(1)} <StarRating rating={typedApp.rating} className="inline-flex" /></span>
            <span>{typedApp.reviewsCount.toLocaleString()} reviews</span>
            <span>{typedApp.downloads} downloads</span>
          </div>
        </div>
        <Button size="lg" className="h-14 px-10 text-lg">
          <Download className="mr-3" /> Install
        </Button>
      </header>

      <section>
          <Carousel opts={{ align: 'start' }} className="w-full">
            <CarouselContent>
              {typedApp.screenshots.map((src, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="overflow-hidden rounded-xl">
                    <Image src={src} alt={`Screenshot ${index + 1}`} width={270} height={480} className="w-full h-auto object-contain" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
      </section>

      <section>
        <h2 className="font-headline text-2xl font-bold mb-4">About this app</h2>
        <p className="whitespace-pre-wrap">{typedApp.description}</p>
      </section>
    </div>
  );
}
