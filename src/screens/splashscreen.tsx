import { get } from '@op-engineering/op-s2';
import { db } from 'App';
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

      db.transaction((tx) => {
        tx.execute(`
        CREATE TABLE IF NOT EXISTS LoginDetails (
          is_setup INTEGER DEFAULT 0
        );
        
        `);
        tx.execute(`
        CREATE TABLE IF NOT EXISTS PasswordGroup (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          brandId TEXT NOT NULL,
          brand TEXT NOT NULL,
          domain TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);

        // Create PasswordEntry table
        tx.execute(`
        CREATE TABLE IF NOT EXISTS PasswordEntry (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          group_id INTEGER NOT NULL,
          username TEXT NOT NULL,
          encrypted_password TEXT NOT NULL,
          iv TEXT NOT NULL,
          note TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (group_id) REFERENCES PasswordGroup(id) ON DELETE CASCADE
        );
      `);
      })
        .then(() => {
          // Check if setup is complete
          const result = db.execute('SELECT is_setup FROM LoginDetails LIMIT 1');

          if (result.rows?.length > 0) {
            const isSetup = result.rows.item(0).is_setup === 1;
            isSetup
              ? resetAndNavigate('BottomTab', { screen: 'Home' })
              : resetAndNavigate('Onboarding');
          } else {
            resetAndNavigate('Onboarding');
          }
        })
        .catch((error) => {
          console.error('Database error:', error);
          resetAndNavigate('Onboarding');
        });
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
