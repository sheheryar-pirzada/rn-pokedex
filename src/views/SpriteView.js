import { TouchableWithoutFeedback, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Image } from 'expo-image';
import { styles } from '../styles/styles';
import { ct } from '../utils';

const AnimatedImage = Animated.createAnimatedComponent(Image);
export function SpriteView({ navigation, route }) {
  const { sprite, index, name } = route.params;
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.goBack()}
    >
      <View
        style={ct(
          styles.container,
          styles.bgDark,
          { alignItems: 'center', justifyContent: 'center' },
        )}
      >
        <AnimatedImage
          source={sprite}
          contentFit="contain"
          style={{ width: 250, height: 250 }}
          sharedTransitionTag={`sprite-${name}-${index}-img`}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
