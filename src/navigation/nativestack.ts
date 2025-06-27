import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UnistylesRuntime } from 'react-native-unistyles';

import BottomTab from './bottomtab';

import AddOptions from '~/screens/addoptions';
import AddPassword from '~/screens/addpassword';
import Details from '~/screens/details';
import Onboarding from '~/screens/onboarding';
import Overview from '~/screens/overview';
import PasswordDetail from '~/screens/passworddetail';
import Passwords from '~/screens/passwords';
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
  Passwords: undefined;
  AddPassword: undefined;
  PasswordDetail: {
    passwordId: number;
    brand: string;
    logo: string;
    key: string;
    encrypted_password: string;
    note: string;
    username: string;
    iv_hex: string;
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
    Passwords,
    PasswordDetail,
    BottomTab: {
      screen: BottomTab,
      options: {
        navigationBarHidden: true,
        statusBarBackgroundColor: UnistylesRuntime.getTheme().colors.background,
        statusBarStyle: 'dark',
      },
    },
    AddPassword,
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
