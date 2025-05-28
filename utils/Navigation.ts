import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

/**
 * Set the top-level navigator reference
 * @param {object} navRef - Navigation container reference
 */

export const navigationRef = createNavigationContainerRef();

/**
 * Navigate to a specific screen
 * @param {string} routeName - Name of the route to navigate to
 * @param {object} params - Parameters to pass to the route
 */
export const navigate = (routeName: string, params: object = {}) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      })
    );
  } else {
    console.error('Navigator is not set. Use setNavigator() to set it.');
  }
};

/**
 * Reset navigation stack and navigate to a specific screen
 * @param {string} routeName - Name of the route to navigate to
 * @param {object} params - Parameters to pass to the route
 */
export const resetAndNavigate = (routeName: string, params: object = {}) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName, params }],
      })
    );
  } else {
    console.error('Navigator is not set. Use setNavigator() to set it.');
  }
};

/**
 * Replace the current screen with a new one
 * @param {string} routeName - Name of the route to replace with
 * @param {object} params - Parameters to pass to the route
 */
export const replace = (routeName: string, params: object = {}) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(routeName, params));
  } else {
    console.error('Navigator is not set. Use setNavigator() to set it.');
  }
};

/**
 * Go back to the previous screen
 */
export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  } else {
    console.error('Navigator is not set. Use setNavigator() to set it.');
  }
};

/**
 * Push a new screen onto the navigation stack
 * @param {string} routeName - Name of the route to push
 * @param {object} params - Parameters to pass to the route
 */
export const push = (routeName: string, params: object = {}) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  } else {
    console.error('Navigator is not set. Use setNavigator() to set it.');
  }
};

export default {
  navigate,
  resetAndNavigate,
  replace,
  goBack,
  push,
};
