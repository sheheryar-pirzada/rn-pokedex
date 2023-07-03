import Animated, {
  FadeIn, Layout,
  useAnimatedStyle, useSharedValue, withSpring, withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { decimeterToFeet } from '../../utils';
import { styles } from '../../styles/styles';

export function HeightLine({ height = 0 }) {
  const heightLine = useSharedValue(0);
  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: withSpring(heightLine.value, {
        stiffness: 120,
        mass: 0.2,
      }),
    };
  });

  useEffect(() => {
    heightLine.value = withTiming(250, {
      duration: 750,
    });
  }, []);

  return (
    <Animated.View style={[styles.heightLine, animatedHeight]}>
      <Animated.Text
        layout={Layout.springify()}
        style={styles.heightLineText}
        entering={FadeIn.delay(750).springify()}
      >
        {`${decimeterToFeet(height)} ft`}
      </Animated.Text>
    </Animated.View>
  );
}
