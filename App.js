import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { RootNavigator } from './src/navigation/Navigator';

export default function App() {
  LogBox.ignoreLogs([
    'new NativeEventEmitter',
    'Exponent.speakingDone',
    'Exponent.speakingStarted',
    'Exponent.speakingWillSayNextString',
  ]);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        cacheTime: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar hidden />
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
