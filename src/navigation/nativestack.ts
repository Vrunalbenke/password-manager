import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UnistylesRuntime } from 'react-native-unistyles';

import BottomTab from './bottomtab';

import AddOptions from '~/screens/addoptions';
import Details from '~/screens/details';
import Onboarding from '~/screens/onboarding';
import Overview from '~/screens/overview';
import Password from '~/screens/password';
import PasswordDetail from '~/screens/passworddetail';
import MasterKeySetup from '~/screens/setup';
import Splashscreen from '~/screens/splashscreen';

export type RootStackParamList = {
  Overview: undefined;
  Details: { name: string };
  MasterKeySetup: undefined;
  BottomTab: undefined;
  Splashscreen: undefined;
  Onboarding: undefined;
  AddOptions: undefined;
  Password: undefined;
  PasswordDetail: {
    entry: {
      brand: string;
      url: string;
      key: string;
      encrypted_password: string;
      note: string;
      username: string;
      iv: string;
    };
    domain?: string;
    title?: string;
  };
};

const NativeStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: 'Splashscreen',
  screens: {
    Splashscreen,
    Onboarding,
    MasterKeySetup,
    Overview,
    Details,
    PasswordDetail,
    BottomTab: {
      screen: BottomTab,
      options: {
        navigationBarHidden: true,
        statusBarBackgroundColor: UnistylesRuntime.getTheme().colors.background,
        statusBarStyle: 'dark',
      },
    },
    Password,
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
    contentStyle: {
      backgroundColor: UnistylesRuntime.getTheme().colors.background,
      // backgroundColor: '#1a1a1a',
    },
  },
});

export default NativeStack;
