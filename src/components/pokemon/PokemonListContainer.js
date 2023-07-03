import { useMemo, useState } from 'react';
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useQuery } from 'react-query';
import PokemonList from './PokemonList';
import { fetchPokemon } from '../../api/pokemon.api';
import PokemonListBackdrop from './PokemonListBackdrop';
import { getSpacedListItems } from '../../utils';

function PokemonListContainer() {
  const scrollX = useSharedValue(0);
  const [currentPokemon, setCurrentPokemon] = useState(1);
  const {
    data: pokemonData,
  } = useQuery({
    queryKey: ['pokemon'],
    queryFn: async () => fetchPokemon(),
  });

  const data = useMemo(() => getSpacedListItems(pokemonData?.results ?? []), [pokemonData]);

  const onScrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <>
      <PokemonListBackdrop
        scrollX={scrollX}
        currentPokemon={currentPokemon}
        data={pokemonData?.results ? data : []}
      />
      <PokemonList
        scrollX={scrollX}
        currentPokemon={currentPokemon}
        onScrollHandler={onScrollHandler}
        setCurrentPokemon={setCurrentPokemon}
        data={pokemonData?.results ? data : []}
      />
    </>
  );
}
export default PokemonListContainer;
