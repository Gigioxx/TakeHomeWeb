import { Search } from 'lucide-react';
import { BirdCard } from '@/components/BirdCard';
import { BirdCardSkeleton } from '@/components/BirdCardSkeleton';
import { useBirds } from '@/hooks/useBirds';

export function BirdsPage() {
  const { loading, error, searchTerm, setSearchTerm, filteredBirds } = useBirds();

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-birds-primary mb-2">Error Loading Birds</h2>
          <p className="text-birds-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white w-full">
      {/* Header */}
      <div className="flex flex-row items-center border-b border-birds-border flex-shrink-0 px-6 py-4 min-h-[72px]">
        <h1 className="font-bold text-2xl xl:text-[32px] leading-10 tracking-[-0.8px] text-birds-primary">
          Birds
        </h1>
      </div>

      {/* Search */}
      <div className="flex flex-row items-start border-b border-birds-border flex-shrink-0 p-6 min-h-[96px]">
        <div className="flex flex-row items-center gap-3 rounded-lg w-full px-4 py-3 h-12 bg-birds-search">
          <Search className="h-6 w-6 flex-shrink-0 text-birds-secondary" />
          <input
            placeholder="Search for birds"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-base leading-6 text-birds-secondary placeholder:text-birds-secondary"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-wrap gap-6">
          {loading
            ? Array.from({ length: 7 }).map((_, index) => (
                <BirdCardSkeleton key={index} />
              ))
            : filteredBirds.map((bird) => (
                <BirdCard
                  key={bird.id}
                  bird={bird}
                />
              ))}
        </div>

        {!loading && filteredBirds.length === 0 && searchTerm && (
          <div className="text-center py-12 col-span-full">
            <p className="text-birds-secondary">No birds found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}