export function NoteItemSkeleton() {
  return (
    <div className="w-[759px] min-h-[72px] bg-white animate-pulse">
      {/* Note content container matching NoteItem layout */}
      <div className="flex flex-row items-center gap-4 px-6 py-2">
        {/* Bird Image Skeleton - 56px x 56px with 8px border radius */}
        <div className="w-14 h-14 flex-none bg-birds-search rounded-lg"></div>
        
        {/* Content Column Skeleton */}
        <div className="flex flex-col justify-center items-start flex-1 gap-1">
          {/* Title Skeleton */}
          <div className="h-6 w-24 bg-birds-search rounded"></div>
          
          {/* Comment Skeleton */}
          <div className="h-[21px] w-48 bg-birds-search rounded"></div>
        </div>
      </div>
    </div>
  );
}