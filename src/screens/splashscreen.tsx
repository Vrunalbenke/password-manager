import { db } from 'App';
import { AppMeta } from 'db/schema';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect } from 'react';
import { Alert, Platform, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Colors } from '~/constants/color';
import { resetAndNavigate } from '~/utils/Navigation';
import { wp } from '~/utils/ResponsiveSize';

const Splashscreen = () => {
  useEffect(() => {
    const authenticate = async () => {
      // Check if hardware supports biometrics
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      console.log(hasHardware, isEnrolled);

      if (hasHardware && isEnrolled) {
        const authResult = await LocalAuthentication.authenticateAsync({
          promptMessage:
            Platform.OS === 'ios'
              ? 'Authenticate with Face ID to unlock'
              : 'Authenticate with Fingerprint to unlock',
          fallbackLabel: 'Enter Passcode',
        });

        if (!authResult.success) {
          Alert.alert(
            'Authentication Failed',
            'Biometric authentication failed. Please try again.',
            [{ text: 'Retry', onPress: authenticate }]
          );
          return;
        }
      }
      console.log('Hello from Splashscreen');

      // Check if setup is complete
      try {
        const result = await db
          .select({
            saltHex: AppMeta.salt_hex,
          })
          .from(AppMeta);

        const appData = await db.select().from(AppMeta);

        console.log(result, ' Me bhi nacho ', appData);

        // if (result?.rows?.length > 0) {

        result[0]?.saltHex
          ? resetAndNavigate('BottomTab', { screen: 'Home' })
          : resetAndNavigate('Onboarding');
        // }
      } catch (error) {
        console.error(error);
        resetAndNavigate('Onboarding');
      }
    };

    authenticate();
  }, []);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Splashscreen</Text>
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: wp(5),
    color: Colors.matrixGreen,
  },
}));
