import { Pressable, View } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { useMemo } from 'react';
import { Image } from 'expo-image';
import { getGif, getOtherSprites } from '../../utils';
import { styles } from '../../styles/styles';

const AnimatedImage = Animated.createAnimatedComponent(Image);

function Sprite(sprite, index, navigation, data) {
  return (
    <Animated.View
      key={sprite}
      style={styles.spriteContainer}
      entering={FadeInDown.delay(3000 + (Math.floor(index / 3) * 250)).duration(250).springify()}
    >
      <Pressable
        onPress={() => navigation.navigate('sprite-view', { sprite, index, name: data.name })}
      >
        <AnimatedImage
          transition={100}
          source={sprite}
          cachePolicy="memory"
          contentFit="contain"
          contentPosition="center"
          style={{ width: 75, height: 75, alignSelf: 'center' }}
          sharedTransitionTag={`sprite-${data.name}-${index}-img`}
        />
      </Pressable>
    </Animated.View>
  );
}

function DetailsSprites({ data, navigation }) {
  const sprites = useMemo(() => {
    const _sprites = [];
    if (data?.sprites) {
      _sprites.push(getGif(data.name));
      for (const key in data.sprites) {
        if (typeof data.sprites[key] === 'string') {
          _sprites.push(data.sprites[key]);
        }
      }

      _sprites.push(...getOtherSprites(data.sprites, 'dream_world'));
      _sprites.push(...getOtherSprites(data.sprites, 'home'));
      _sprites.push(...getOtherSprites(data.sprites, 'official-artwork'));
    }

    return _sprites;
  }, [data]);

  return (
    <Animated.View
      style={styles.spriteGrid}
      layout={Layout.springify()}
      entering={FadeInDown.delay(2500).duration(1000).springify()}
    >
      {sprites.map((sprite, index) => Sprite(sprite, index, navigation, data))}
    </Animated.View>
  );
}

export default DetailsSprites;
