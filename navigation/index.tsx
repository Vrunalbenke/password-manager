import { createStaticNavigation } from '@react-navigation/native';
import { navigationRef } from 'utils/Navigation';

import NativeStack from './nativestack';

const Navigation = createStaticNavigation(NativeStack);

export default function RootStack() {
  return <Navigation ref={navigationRef} />;
}
