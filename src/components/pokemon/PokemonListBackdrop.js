import {
  View,
  FlatList,
} from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { typeMap } from '../../styles/colors';
import { theme } from '../../styles/theme';
import { styles } from '../../styles/styles';

import BackDropItem from './BackdropItem';

function PokemonListBackdrop({ scrollX, data, currentPokemon }) {
  const [type, setType] = useState('default');

  return (
    <View style={styles.backdropContainer}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        initialNumToRender={data.length}
        renderItem={
          ({ item, index }) => (
            <BackDropItem
              item={item}
              index={index}
              scrollX={scrollX}
              setType={setType}
              currentPokemon={currentPokemon}
            />
          )
        }
      />
      <LinearGradient
        style={styles.backdropGradient}
        colors={
          ['transparent', currentPokemon
            ? typeMap[type]
            : theme.colors.gray['900']]
        }
      />
    </View>
  );
}

export default PokemonListBackdrop;
