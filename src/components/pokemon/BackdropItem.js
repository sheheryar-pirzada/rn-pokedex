import { useEffect } from 'react';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';
import Svg, { Rect } from 'react-native-svg';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { usePokemonData } from '../../hooks/usePokemonData';
import {
  BACKDROP_WIDTH, CARD_WIDTH, getDWSprite, WD,
} from '../../utils';
import { styles } from '../../styles/styles';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

function BackDropItem({
  item, index, scrollX, setType, currentPokemon,
}) {
  if (!item?.url) {
    return null;
  }

  const id = item.url.split('/')[6];
  const sprite = getDWSprite(id);

  const { data } = usePokemonData(
    { id, enabled: index === currentPokemon },
  );

  const type = data?.types[0]?.type?.name ?? 'default';

  useEffect(() => {
    if (index === currentPokemon) {
      setType(type);
    }
  }, [currentPokemon, type]);

  const animatedStyles = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * CARD_WIDTH,
      (index - 1) * CARD_WIDTH,
    ];

    const translateX = interpolate(scrollX.value, inputRange, [BACKDROP_WIDTH, 0]);

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <MaskedView
      maskElement={(
        <AnimatedSvg
          height={WD.height}
          width={BACKDROP_WIDTH}
          style={[animatedStyles]}
          viewBox={`0 0 ${BACKDROP_WIDTH} ${WD.height}`}
        >
          <Rect
            x="0"
            y="0"
            fill="red"
            height={WD.height}
            width={BACKDROP_WIDTH}
          />
        </AnimatedSvg>
      )}
      style={{ position: 'absolute' }}
    >
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>
          {`#${index}`}
        </Text>
      </View>
      <View style={styles.backdropPokemonNameContainer}>
        <Animated.Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.backdropPokemonName}
        >
          {item.name}
        </Animated.Text>
        <Image
          blurRadius={4}
          source={sprite}
          transition={100}
          contentFit="contain"
          style={styles.backdropPokemonImage}
        />
      </View>
    </MaskedView>
  );
}

export default BackDropItem;
