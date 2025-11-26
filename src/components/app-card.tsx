import Image from 'next/image';
import Link from 'next/link';
import { App } from '@/lib/data';
import { StarRating } from '@/components/star-rating';

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Link href="#" className="group space-y-2">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={app.iconUrl}
          alt={`${app.name} icon`}
          width={256}
          height={256}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="app icon"
        />
      </div>
      <div className="space-y-1">
        <h3 className="truncate font-semibold">{app.name}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{app.rating.toFixed(1)}</span>
          <StarRating rating={app.rating} size={12} />
        </div>
      </div>
    </Link>
  );
}
