import { db } from 'App';
import { AppMeta } from 'db/schema';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '~/components/Button';
import { navigate } from '~/utils/Navigation';
import { wp } from '~/utils/ResponsiveSize';

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer} />
      <View style={styles.bottomContainer}>
        <Button
          title="Let's Start"
          onPress={() => {
            navigate('MasterKeySetup');
          }}
        />
        <Button title="Import Data" />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    padding: wp(4),
    gap: wp(2),
  },
}));
