import { Skeleton } from '@/components/ui/skeleton';

export function BirdCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-[168px]">
      <Skeleton className="rounded-lg w-[168px] h-[95px]" />
      <div className="flex flex-col pb-3">
        <Skeleton className="h-6 w-32 mb-1" />
        <Skeleton className="h-5 w-40" />
      </div>
    </div>
  );
}