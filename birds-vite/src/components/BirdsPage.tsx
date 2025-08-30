import { BirdCard } from '@/components/BirdCard';
import { BirdCardSkeleton } from '@/components/BirdCardSkeleton';
import { PaginationSkeleton } from '@/components/PaginationSkeleton';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useBirds } from '@/hooks/useBirds';
import { Search } from 'lucide-react';

// Helper function to generate visible page numbers
const getVisiblePages = (currentPage: number, totalPages: number) => {
  const delta = 2; // Number of pages to show on each side of current page
  const range = [];
  const rangeWithDots = [];

  for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    rangeWithDots.push(1, 'ellipsis');
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push('ellipsis', totalPages);
  } else if (totalPages > 1) {
    rangeWithDots.push(totalPages);
  }

  return rangeWithDots.filter((item, index, array) => array.indexOf(item) === index);
};

export function BirdsPage() {
  const {
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filteredBirds,
    currentPage,
    totalPages,
    pageSize,
    paginatedBirds,
    goToPage,
    nextPage,
    prevPage
  } = useBirds();

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
    <div className="flex flex-col bg-white w-full min-h-screen pb-8">
      {/* Header */}
      <div className="box-border flex flex-row items-center px-6 py-4 w-full h-[72px] bg-white border-b border-birds-border gap-3">
        <SidebarTrigger className="md:hidden" />
        <div className="flex flex-col items-start p-0 gap-3 w-[288px] h-10">
          <h1 className="font-bold text-[32px] leading-10 tracking-[-0.8px] text-birds-primary w-[78px] h-10">
            Birds
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="box-border flex flex-row items-start p-6 w-full h-24 border-b border-birds-border">
        <div className="flex flex-row items-center px-4 py-3 gap-3 h-12 bg-birds-search rounded-lg flex-1">
          <div className="flex flex-col items-start p-0 w-6 h-6">
            <Search className="w-6 h-6 text-birds-secondary" />
          </div>
          <div className="flex flex-col items-start p-0 h-6 flex-1">
            <input
              placeholder="Search for birds"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-6 bg-transparent outline-none text-base leading-6 text-birds-secondary placeholder:text-birds-secondary"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Grid: responsive layout - 2 per row on mobile, more on larger screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-6 py-6 w-full">
          {loading
            ? Array.from({ length: 20 }).map((_, index) => (
                <BirdCardSkeleton key={index} />
              ))
            : paginatedBirds.map((bird) => (
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

        {/* Pagination Controls */}
        {loading ? (
          <PaginationSkeleton />
        ) : totalPages > 1 ? (
          <div className="flex flex-col items-center gap-4 px-6 py-6 border-t border-birds-border">
            {/* Results info */}
            <p className="text-sm text-birds-secondary">
              Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, filteredBirds.length)} of {filteredBirds.length} birds
            </p>

            {/* Pagination */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      prevPage();
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>

                {getVisiblePages(currentPage, totalPages).map((page, index) => (
                  <PaginationItem key={index}>
                    {page === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(page as number);
                        }}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      nextPage();
                    }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : null}
      </div>
    </div>
  );
}
