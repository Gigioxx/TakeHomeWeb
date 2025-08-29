import { useQuery } from '@apollo/client';
import { Bird, BirdResponse } from '@/types/bird';
import { GET_BIRD } from '@/lib/queries';

interface UseBirdState {
  bird: Bird | null;
  loading: boolean;
  error: string | null;
}

export const useBird = (id: string | undefined): UseBirdState => {
  const { data, loading, error } = useQuery<BirdResponse>(GET_BIRD, {
    variables: { id },
    skip: !id, // Skip query if no ID provided
  });

  return {
    bird: data?.bird || null,
    loading,
    error: error?.message || null,
  };
};