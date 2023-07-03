import Animated from 'react-native-reanimated';
import { useCallback } from 'react';
import PokemonListCardItem from './PokemonListCardItem';
import { pokemonListProps } from '../../utils/props';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 100,
  waitForInteraction: true,
};

function PokemonList({
  data, setCurrentPokemon, currentPokemon, scrollX, onScrollHandler,
}) {
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      const viewableItem = viewableItems.filter(
        (i) => i.isViewable && !['left-space', 'right-space'].includes(i.key),
      )[0];
      if (viewableItem?.index !== undefined && viewableItem?.index !== currentPokemon) {
        setCurrentPokemon(viewableItem?.index);
      }
    },
    [],
  );

  const memoizedRender = useCallback(({ item, index }) => (
    <PokemonListCardItem
      item={item}
      index={index}
      scrollX={scrollX}
      currentPokemon={currentPokemon}
    />
  ), [scrollX, currentPokemon]);

  const keyExtractor = ({ name }) => name;

  return (
    <Animated.FlatList
      {...pokemonListProps}
      data={data}
      bounces={false}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      onScroll={onScrollHandler}
      keyExtractor={keyExtractor}
      renderItem={memoizedRender}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
}

export default PokemonList;
