import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import { Colors } from 'constants/color';
import About from 'screens/about';
import Home from 'screens/home';

const BottomTab = createNativeBottomTabNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    lazy: true,
  },
  disablePageAnimations: false,
  labeled: true,
  tabBarActiveTintColor: Colors.matrixGreen,
  tabBarInactiveTintColor: Colors.white,
  tabBarStyle: {
    backgroundColor: Colors.darkGray,
  },
  activeIndicatorColor: '#4BC489',
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
        // tabBarIcon: () => require('../../assets/svg/home.svg'),
      },
    },
    About: {
      screen: About,
      options: {
        // tabBarIcon: () => require('../../assets/svg/chat.svg'),
      },
    },
  },
});

export default BottomTab;
