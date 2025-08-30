import { Skeleton } from '@/components/ui/skeleton';

export function PaginationSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-6 border-t border-birds-border">
      {/* Results info skeleton */}
      <Skeleton className="h-5 w-48" />
      
      {/* Pagination controls skeleton */}
      <div className="flex flex-row items-center gap-1">
        {/* Previous button */}
        <Skeleton className="h-9 w-20 rounded-md" />
        
        {/* Page numbers */}
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-9 w-9 rounded-md" />
        
        {/* Next button */}
        <Skeleton className="h-9 w-16 rounded-md" />
      </div>
    </div>
  );
}