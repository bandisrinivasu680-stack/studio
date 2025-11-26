import { AppCard } from '@/components/app-card';
import { apps } from '@/lib/data';

export default function AppsPage() {
  return (
    <div>
      <h1 className="font-headline text-3xl font-bold">All Apps</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
        {[...apps].reverse().map((app) => (
            <AppCard key={`${app.id}-2`} app={{...app, id: `${app.id}-2`}} />
        ))}
      </div>
    </div>
  );
}
