import { useQuery } from 'react-query';
import { fetchPokemonById } from '../api/pokemon.api';

export const usePokemonData = ({ id, enabled = false }) => {
  const { isLoading, data } = useQuery({
    enabled,
    queryKey: ['pokemon', id],
    cacheTime: 1000 * 60 * 60 * 24 * 7,
    queryFn: async () => fetchPokemonById(id),
  });

  return { isLoading, data };
};
