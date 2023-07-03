import {
  Text, View, ActivityIndicator, Pressable,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useQuery } from 'react-query';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as Speech from 'expo-speech';
import { styles } from '../../styles/styles';
import { ct } from '../../utils';
import { fetchPokemonSpeciesById } from '../../api/pokemon.api';
import { theme } from '../../styles/theme';

export function PokedexEntry({ id }) {
  const [text, setText] = useState('');
  const { isLoading, data } = useQuery({
    queryKey: ['pokemon-specie', id],
    queryFn: async () => fetchPokemonSpeciesById(id),
    enabled: true,
    cacheTime: 0,
  });

  useEffect(() => {
    if (!isLoading) {
      if (data?.flavor_text_entries) {
        const entry = data.flavor_text_entries.find((e) => e.language.name === 'en');
        setText(entry.flavor_text.replace(/\s+/g, ' '));
      }
    }
  }, [data]);

  const speak = () => {
    Speech.speak(text);
  };

  const shuffleEntry = () => {
    const entries = data?.flavor_text_entries.filter((e) => e.language.name === 'en');
    const randomEntry = entries[Math.floor(Math.random() * entries.length)];
    setText(randomEntry.flavor_text.replace(/\s+/g, ' '));
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(1500).duration(1000).springify()}
      style={ct(styles.entryContainer)}
    >
      {isLoading ? (
        <View style={{ padding: 16 }}>
          <ActivityIndicator size="large" color={theme.colors.gray['100']} />
        </View>
      ) : (
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View style={ct(styles.detailsRow, { alignItems: 'center', justifyContent: 'center' })}>
            <Text style={styles.detailsTextHeading}>
              pokedex entries
            </Text>
          </View>
          <View style={styles.entryRow}>
            <Text style={styles.entryText}>
              {text}
            </Text>
          </View>
          <View style={styles.pokedexEntryButtonContainer}>
            <Pressable onPress={speak}>
              <FontAwesome name="play-circle" size={40} color={theme.colors.gray['100']} />
            </Pressable>
            {data?.flavor_text_entries?.length > 1 && (
              <Pressable onPress={shuffleEntry}>
                <FontAwesome name="random" size={40} color={theme.colors.gray['100']} />
              </Pressable>
            )}
          </View>
        </View>
      )}
    </Animated.View>
  );
}
