import Animated, {
  FadeIn, Layout,
  useAnimatedStyle, useSharedValue, withSpring, withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { hectogramsToKilograms } from '../../utils';
import { styles } from '../../styles/styles';

export function WidthLine({ weight = 0 }) {
  const widthLine = useSharedValue(0);
  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: withSpring(widthLine.value, {
        stiffness: 120,
        mass: 0.2,
      }),
    };
  });

  useEffect(() => {
    widthLine.value = withTiming(250, {
      duration: 750,
    });
  }, []);

  return (
    <Animated.View style={[styles.widthLine, animatedWidth]}>
      <Animated.Text
        layout={Layout.springify()}
        style={styles.widthLineText}
        entering={FadeIn.delay(750).springify()}
      >
        {`${hectogramsToKilograms(weight)} Kg`}
      </Animated.Text>
    </Animated.View>
  );
}
