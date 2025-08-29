import { Skeleton } from '@/components/ui/skeleton';

export function BirdCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full min-w-0">
      <Skeleton className="w-full rounded-lg aspect-[168/95]" />
      <div className="flex flex-col pb-3">
        <Skeleton className="h-6 w-32 mb-1" />
        <Skeleton className="h-5 w-40" />
      </div>
    </div>
  );
}