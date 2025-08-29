import { Skeleton } from '@/components/ui/skeleton';

export function BirdDetailSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white w-full">
      {/* Header with breadcrumb skeleton */}
      <div className="flex flex-row justify-between items-center border-b border-birds-border flex-shrink-0 px-6 py-4 h-[72px]">
        <h1 className="text-2xl xl:text-[32px] leading-10 tracking-[-0.8px] text-birds-primary">
          <span
            className="opacity-40 cursor-pointer hover:opacity-60 transition-opacity"
          >
            Birds /
          </span>
          <span className="font-bold"> <Skeleton className="h-8 w-32 inline-block" /></span>
        </h1>
        <Skeleton className="h-8 w-20" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col gap-2">

          {/* Images Section Skeleton */}
          <div className="flex flex-row items-start px-6 gap-3 h-[169.5px]">
            <div className="flex flex-col gap-3 w-[301px] h-[169.5px]">
              <Skeleton className="rounded-lg w-[301px] h-[169px]" />
            </div>
          </div>

          {/* Notes Section Skeleton */}
          <div className="flex flex-col w-full h-[204px] pt-5">
            <div className="flex flex-row items-start px-6 pb-3 h-[60px]">
              <Skeleton className="h-7 w-16" />
            </div>

            <div className="w-[759px] h-[144px] space-y-4">
              {/* First note skeleton */}
              <div className="w-[759px] h-[72px] bg-white">
                <div className="flex flex-row items-center px-6 py-2 gap-4 w-[534px] h-14">
                  <Skeleton className="w-14 h-14 rounded-lg" />
                  <div className="flex flex-col justify-center items-start w-[463px] h-[45px] gap-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                </div>
              </div>

              {/* Second note skeleton */}
              <div className="w-[759px] h-[72px] bg-white">
                <div className="flex flex-row items-center px-6 py-2 gap-4 w-[534px] h-14">
                  <Skeleton className="w-14 h-14 rounded-lg" />
                  <div className="flex flex-col justify-center items-start w-[463px] h-[45px] gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* In Other Languages Section Skeleton */}
          <div className="flex flex-col w-full h-[249.5px]">
            <div className="flex flex-row items-start px-6 pb-3 h-[59.5px]">
              <Skeleton className="h-7 w-36" />
            </div>

            <div className="w-full h-[190px]">
              <div className="flex flex-row">
                {/* Spanish Column Skeleton */}
                <div className="flex flex-col items-start px-6 py-4 gap-1 w-[464px] h-[79px] border-t border-gray-200">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-40" />
                </div>

                {/* Latin Column Skeleton */}
                <div className="flex flex-col items-start px-2 py-4 gap-1 w-[452px] h-[79px] border-t border-gray-200">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-48" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}