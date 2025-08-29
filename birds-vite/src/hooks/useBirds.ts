import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Bird, BirdsResponse } from '@/types/bird';
import { GET_BIRDS } from '@/lib/queries';

interface UseBirdsState {
  birds: Bird[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredBirds: Bird[];
}

export const useBirds = (): UseBirdsState => {
  const [searchTerm, setSearchTerm] = useState('');
  
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

  return {
    birds,
    loading,
    error: error?.message || null,
    searchTerm,
    setSearchTerm,
    filteredBirds
  };
};