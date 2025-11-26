'use client';
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore, useUser, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { categories } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const appSchema = z.object({
  name: z.string().min(1, 'App name is required'),
  developer: z.string().min(1, 'Developer name is required'),
  iconUrl: z.string().url('Must be a valid URL'),
  rating: z.preprocess((a) => parseFloat(z.string().parse(a)), z.number().min(0).max(5)),
  reviewsCount: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().int().min(0)),
  size: z.string().min(1, 'Size is required'),
  downloads: z.string().min(1, 'Downloads count is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  featureGraphicUrl: z.string().url('Must be a valid URL'),
  screenshots: z.array(z.object({ value: z.string().url('Must be a valid URL') })).min(1, 'At least one screenshot is required'),
});

type AppFormValues = z.infer<typeof appSchema>;

export default function UploadPage() {
  const { isAdmin, user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AppFormValues>({
    resolver: zodResolver(appSchema),
    defaultValues: {
      name: '',
      developer: '',
      iconUrl: '',
      rating: 4.5,
      reviewsCount: 0,
      size: '',
      downloads: '0+',
      category: '',
      description: '',
      featureGraphicUrl: '',
      screenshots: [{ value: '' }],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    name: "screenshots",
    control: form.control,
  });

  useEffect(() => {
    if (!userLoading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [user, isAdmin, userLoading, router]);

  const onSubmit = async (data: AppFormValues) => {
    if (!firestore) {
        toast({ variant: 'destructive', description: 'Firestore is not available.' });
        return;
    }
    setIsSubmitting(true);
    try {
      addDocumentNonBlocking(collection(firestore, 'apps'), {
          ...data,
          screenshots: data.screenshots.map(s => s.value)
      });
      toast({ description: 'App uploaded successfully!' });
      router.push('/home');
    } catch (error) {
      console.error('Error uploading app:', error);
      toast({ variant: 'destructive', description: 'Failed to upload app. Check console for details.' });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (userLoading || !user) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }
  
  if (!isAdmin) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
        <p>You do not have permission to view this page. Please sign in with an admin account.</p>
        <Button onClick={() => router.push('/admin/login')} className="mt-4">Go to Admin Login</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="font-headline text-3xl font-bold mb-6">Upload New App</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>App Name</FormLabel>
              <FormControl><Input placeholder="TaskMaster Pro" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="developer" render={({ field }) => (
            <FormItem>
              <FormLabel>Developer</FormLabel>
              <FormControl><Input placeholder="Productivity Inc." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
           <FormField control={form.control} name="category" render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Describe your app..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="rating" render={({ field }) => (
                <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl><Input type="number" step="0.1" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="reviewsCount" render={({ field }) => (
                <FormItem>
                <FormLabel>Reviews Count</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )} />
             <FormField control={form.control} name="size" render={({ field }) => (
                <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl><Input placeholder="e.g., 25 MB" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )} />
             <FormField control={form.control} name="downloads" render={({ field }) => (
                <FormItem>
                <FormLabel>Downloads</FormLabel>
                <FormControl><Input placeholder="e.g., 1M+" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )} />
          </div>

          <h2 className="text-xl font-bold pt-4">Image URLs</h2>
          <FormField control={form.control} name="iconUrl" render={({ field }) => (
            <FormItem>
              <FormLabel>Icon URL</FormLabel>
              <FormControl><Input placeholder="https://picsum.photos/seed/app1/256/256" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="featureGraphicUrl" render={({ field }) => (
            <FormItem>
              <FormLabel>Feature Graphic URL</FormLabel>
              <FormControl><Input placeholder="https://picsum.photos/seed/feature1/1024/500" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div>
             <FormLabel>Screenshots</FormLabel>
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`screenshots.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 mt-2">
                      <FormControl>
                        <Input {...field} placeholder={`https://picsum.photos/seed/ss${index+1}/270/480`} />
                      </FormControl>
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
               <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ value: "" })}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Screenshot
              </Button>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload App
          </Button>
        </form>
      </Form>
    </div>
  );
}
