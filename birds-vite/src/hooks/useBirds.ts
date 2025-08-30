import { GET_BIRDS } from '@/lib/queries';
import { Bird, BirdsResponse } from '@/types/bird';
import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';

interface UseBirdsState {
  birds: Bird[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredBirds: Bird[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  paginatedBirds: Bird[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useBirds = (): UseBirdsState => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const { data, loading, error } = useQuery<BirdsResponse>(GET_BIRDS);

  const birds = useMemo(() => data?.birds || [], [data?.birds]);

  // Filter birds based on search term
  const filteredBirds = useMemo(() => {
    if (!searchTerm.trim()) return birds;

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return birds.filter(bird =>
      bird.english_name.toLowerCase().includes(lowercaseSearchTerm) ||
      bird.latin_name.toLowerCase().includes(lowercaseSearchTerm)
    );
  }, [birds, searchTerm]);

  // Reset to page 1 when search term changes
  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = useMemo(() =>
    Math.ceil(filteredBirds.length / pageSize),
    [filteredBirds.length, pageSize]
  );

  // Get paginated data
  const paginatedBirds = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredBirds.slice(startIndex, endIndex);
  }, [filteredBirds, currentPage, pageSize]);

  // Pagination functions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    birds,
    loading,
    error: error?.message || null,
    searchTerm,
    setSearchTerm: handleSearchTermChange,
    filteredBirds,
    currentPage,
    totalPages,
    pageSize,
    paginatedBirds,
    goToPage,
    nextPage,
    prevPage
  };
};
