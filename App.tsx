import './unistyles';
import 'react-native-quick-base64';

import { open } from '@op-engineering/op-sqlite';
import { drizzle } from 'drizzle-orm/op-sqlite';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import RootStack from './src/navigation';

const opsqliteDb = open({
  name: 'Surakshit',
  encryptionKey: 'सुरक्षित',
});

export const db = drizzle(opsqliteDb);

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#1a1a1a" animated barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <RootStack />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
