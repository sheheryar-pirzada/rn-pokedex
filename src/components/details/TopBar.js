import Animated, {
  Easing, PinwheelIn, useAnimatedStyle, withDelay, withTiming,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { theme } from '../../styles/theme';

function TopBar({ nav, opacity }) {
  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        1000,
        withTiming(opacity.value, { duration: 500, easing: Easing.ease }),
      ),
    };
  });

  return (
    <Animated.View
      style={[{
        display: 'flex',
        paddingLeft: 32,
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
      },
      animatedOpacity,
      ]}
    >
      <Animated.View
        entering={PinwheelIn.delay(3500).duration(1000).springify()}
      >
        <Pressable
          onPress={() => nav.goBack()}
        >
          <Entypo
            size={36}
            name="circle-with-cross"
            color={theme.colors.gray['100']}
          />
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}
export default TopBar;
