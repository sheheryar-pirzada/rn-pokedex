import {
  View, ScrollView,
} from 'react-native';
import Animated, {
  useAnimatedStyle, useSharedValue, withTiming,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useEffect, useMemo } from 'react';
import { styles } from '../styles/styles';
import {
  ct,
  getDWSprite,
  BACKDROP_HEIGHT,
} from '../utils';
import { usePokemonData } from '../hooks/usePokemonData';
import TopBar from '../components/details/TopBar';
import DetailsSprites from '../components/details/DetailsSprites';
import { PokedexEntry } from '../components/details/PokedexEntry';
import Stats from '../components/details/Stats';
import { HeightLine } from '../components/details/HeightLine';
import { WidthLine } from '../components/details/WeightLine';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export function Details({ navigation, route }) {
  const { id, name } = route.params;
  const sprite = useMemo(() => getDWSprite(id), [id]);

  const opacity = useSharedValue(0);

  const animatedOpacity = useAnimatedStyle(() => {
    return { opacity: withTiming(opacity.value, { duration: 1500 }) };
  });

  const { data } = usePokemonData({ id, enabled: true });

  useEffect(() => {
    const runAnimations = () => {
      opacity.value = 1;
    };
    runAnimations();
  }, []);

  return (
    <BlurView intensity={80} style={ct(styles.container)}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <ScrollView
          bounces
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
        >
          <TopBar nav={navigation} opacity={opacity} />
          <View
            style={ct(
              styles.backdropPokemonNameContainer,
              { paddingTop: BACKDROP_HEIGHT / 30, height: null },
            )}
          >
            <Animated.Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[
                {
                  ...styles.backdropPokemonName,
                  paddingBottom: 0,
                },
                animatedOpacity,
              ]}
            >
              {name}
            </Animated.Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HeightLine height={data?.height ?? 0} />
            <AnimatedImage
              sharedTransition={`pokemon-${id}-sprite`}
              contentFit="contain"
              cachePolicy="memory-disk"
              style={{
                width: 300,
                height: 300,
                alignSelf: 'center',
              }}
              source={sprite}
            />
          </View>
          <WidthLine weight={data?.weight ?? 0} />
          <PokedexEntry id={id} />
          <Stats stats={data?.stats ?? []} />
          <DetailsSprites data={data} navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </BlurView>
  );
}
