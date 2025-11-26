import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
