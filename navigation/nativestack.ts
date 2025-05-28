import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddOptions from 'screens/addoptions';
import Details from 'screens/details';
import Overview from 'screens/overview';
import Setup from 'screens/setup';
import Splashscreen from 'screens/splashscreen';

import BottomTab from './bottomtab';
import Password from 'screens/password';

export type RootStackParamList = {
  Overview: undefined;
  Details: { name: string };
  Setup: undefined;
  BottomTab: undefined;
  Splashscreen: undefined;
  AddOptions: undefined;
  Password: undefined;
};

const NativeStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: 'Splashscreen',
  screens: {
    Splashscreen: Splashscreen,
    Setup: Setup,
    Overview: Overview,
    Details: Details,
    BottomTab: BottomTab,
    Password: Password,
    AddOptions: {
      screen: AddOptions,
      options: {
        presentation: 'transparentModal',
        sheetAllowedDetents: 'fitToContents',
        sheetCornerRadius: 10,
        gestureEnabled: false,
        fullScreenGestureEnabled: false,
        // animation: 'ios_from_left',
        // animationDuration: 300,
      },
    },
  },
  screenOptions: {
    headerShown: false,
  },
});

export default NativeStack;
