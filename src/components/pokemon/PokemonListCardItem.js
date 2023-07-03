import { View, Pressable } from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  withTiming,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import {
  CARD_WIDTH,
  getDWSprite,
  SPACER_SIZE,
} from '../../utils';
import { styles } from '../../styles/styles';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function PokemonListCardItem({
  item, index, scrollX, currentPokemon,
}) {
  const nav = useNavigation();

  const pinch = useSharedValue(1);

  if (!item?.url) {
    return (
      <View style={{ width: SPACER_SIZE }} />
    );
  }

  const inputRange = [
    (index - 2) * CARD_WIDTH,
    (index - 1) * CARD_WIDTH,
    (index) * CARD_WIDTH,
  ];

  const animatedStyles = useAnimatedStyle(() => {
    const translateY = interpolate(scrollX.value, inputRange, [225, 125, 225], Extrapolate.CLAMP);
    const scale = interpolate(scrollX.value, inputRange, [1.1, 0.8, 1.1], Extrapolate.CLAMP);

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  const animatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(scrollX.value, inputRange, [0.7, 1, 0.7], Extrapolate.CLAMP);

    return { opacity };
  });

  const animatedScale = useAnimatedStyle(() => {
    const scale = withTiming(pinch.value, { duration: 250 });

    return { transform: [{ scale }] };
  }, [pinch]);

  const id = item.url.split('/')[6];
  const sprite = getDWSprite(id);

  return (
    <AnimatedPressable
      longPressDelay={1000}
      onPressIn={() => {
        pinch.value = withSpring(0.95);
      }}
      onPressOut={() => {
        pinch.value = withSpring(1);
      }}
      onLongPress={() => {
        nav.navigate('details', { id, name: item.name });
      }}
      style={[{ ...styles.pokemonPressable }, animatedScale]}
    >
      <Animated.View
        style={[
          { ...styles.pokemonPressableAnimatedContainer },
          animatedStyles,
          animatedOpacity,
          index === currentPokemon && {
            ...styles.pokemonPressableShadow,
          },
        ]}
      >
        <View style={styles.pokemonPressableImageContainer}>
          <AnimatedImage
            source={sprite}
            transition={250}
            contentFit="contain"
            cachePolicy="memory-disk"
            style={{ width: 150, height: 150 }}
            sharedTransitionTag={`pokemon-${id}-sprite`}
          />
        </View>
      </Animated.View>
    </AnimatedPressable>
  );
}
export default PokemonListCardItem;
