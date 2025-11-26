'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCollection } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { App } from '@/lib/data';
import { AppCard } from '@/components/app-card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const firestore = useFirestore();
  const { data: apps, loading } = useCollection(
    firestore ? collection(firestore, 'apps') : null
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  const typedApps = (apps as App[]) || [];
  
  const featuredApps = typedApps.slice(0, 3);
  const recommendedApps = [...typedApps].sort(() => 0.5 - Math.random()).slice(0, 8);
  const newApps = [...typedApps].sort((a,b) => (b.id || '').localeCompare(a.id || '')).slice(0, 8);


  return (
    <div className="space-y-12">
      <section className="w-full">
        <div className="overflow-hidden rounded-2xl">
          <Carousel
            opts={{
              loop: true,
            }}
            className="relative"
          >
            <CarouselContent>
              {featuredApps.map((app) => (
                <CarouselItem key={app.id}>
                  <div className="relative aspect-[16/7] w-full">
                    <Image
                      src={app.featureGraphicUrl}
                      alt={`Feature graphic for ${app.name}`}
                      fill
                      className="object-cover"
                      data-ai-hint="fantasy landscape"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-10">
                       <div className="flex items-center space-x-4">
                          <Image
                            src={app.iconUrl}
                            alt={app.name}
                            width={80}
                            height={80}
                            className="rounded-2xl border-2 border-white/50 shadow-lg"
                            data-ai-hint="gaming character"
                          />
                          <div>
                            <h2 className="font-headline text-2xl font-bold text-white md:text-4xl">
                              {app.name}
                            </h2>
                            <p className="text-sm text-white/80 md:text-base">
                              {app.developer}
                            </p>
                          </div>
                        </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
             <div className="absolute right-6 bottom-6 hidden md:flex">
                <CarouselPrevious className="static -translate-y-0" />
                <CarouselNext className="static -translate-y-0" />
             </div>
          </Carousel>
        </div>
      </section>

      <AppSection title="Recommended for you" apps={recommendedApps} />
      <AppSection title="New & updated apps" apps={newApps} />
    </div>
  );
}

function AppSection({ title, apps }: { title: string; apps: App[] }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-headline text-2xl font-bold">{title}</h2>
        <Button variant="ghost" asChild>
          <Link href="/apps">
            See all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="!overflow-visible">
        <Carousel
            opts={{
              align: 'start',
              dragFree: true,
            }}
            className="-ml-4"
          >
            <CarouselContent>
              {apps.map((app, index) => (
                <CarouselItem key={index} className="basis-1/3 md:basis-1/5 lg:basis-1/6">
                  <AppCard app={app} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
      </div>
    </section>
  );
}
