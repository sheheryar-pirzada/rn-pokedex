import Animated, {
  withDelay,
  withSpring,
  withTiming,
  useSharedValue,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { statColorMap } from '../../styles/colors';
import { styles } from '../../styles/styles';

export function StatBar({ stat, value, delay }) {
  const w = useSharedValue(0);

  const animated = useAnimatedStyle(() => {
    return {
      width: withSpring(`${Math.floor((w.value / 255) * 100)}%`),
      backgroundColor: interpolateColor(
        w.value,
        [0, value],
        [statColorMap.default, statColorMap[stat]],
        'RGB',
      ),
    };
  });

  useEffect(() => {
    w.value = withDelay(delay, withTiming(value, { duration: 750 }));
  }, []);

  return (
    <View style={{ marginBottom: 8, width: '45%' }}>
      <Text style={styles.statBarText}>{stat}</Text>
      <View style={styles.statBar}>
        <Animated.View style={[{ height: '100%', borderRadius: 4 }, animated]} />
      </View>
    </View>
  );
}
