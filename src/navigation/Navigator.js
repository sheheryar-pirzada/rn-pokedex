import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../views/Home';
import { Details } from '../views/Details';
import { SpriteView } from '../views/SpriteView';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen
        name="details"
        component={Details}
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="sprite-view"
        component={SpriteView}
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
}
