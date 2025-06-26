import { createStaticNavigation } from '@react-navigation/native';

import NativeStack from './nativestack';

import { navigationRef } from '~/utils/Navigation';

const Navigation = createStaticNavigation(NativeStack);

export default function RootStack() {
  return <Navigation ref={navigationRef} />;
}
