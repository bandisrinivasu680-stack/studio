import { Book } from 'lucide-react';

export default function BooksPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-96">
      <Book className="w-16 h-16 mb-4 text-muted-foreground" />
      <h1 className="font-headline text-3xl font-bold">Books</h1>
      <p className="mt-2 text-muted-foreground">The books section is coming soon. Stay tuned!</p>
    </div>
  );
}
