import { View, Text } from 'react-native';
import { styles } from '../styles/styles';
import { ct } from '../utils';
import PokemonListContainer from '../components/pokemon/PokemonListContainer';

export function Home() {
  return (
    <View style={ct(styles.container, styles.bgDark)}>
      <PokemonListContainer />
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>
          long press to see details
        </Text>
      </View>
    </View>
  );
}
