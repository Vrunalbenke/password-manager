import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import { UnistylesRuntime } from 'react-native-unistyles';

import { Colors } from '~/constants/color';
import About from '~/screens/about';
import Home from '~/screens/home';

const BottomTab = createNativeBottomTabNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    lazy: true,
  },
  disablePageAnimations: false,
  labeled: true,
  tabBarActiveTintColor: Colors.matrixGreen,
  tabBarInactiveTintColor: UnistylesRuntime.getTheme().colors.typography,
  tabBarStyle: {
    backgroundColor: UnistylesRuntime.getTheme().colors.background,
  },
  activeIndicatorColor: 'rgba(3, 160, 97,0.4)',
  // rippleColor: Colors.lightOrange,
  hapticFeedbackEnabled: true,
  tabLabelStyle: {
    fontSize: 16,
    fontFamily: 'Lexend Regular',
  },
  screens: {
    Home: {
      screen: Home,
      options: {
        tabBarIcon: () => require('../../assets/svg/house.svg'),
      },
    },
    About: {
      screen: About,
      options: {
        tabBarIcon: () => require('../../assets/svg/settings.svg'),
      },
    },
  },
});

export default BottomTab;
