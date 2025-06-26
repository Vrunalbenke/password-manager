import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '~/components/Button';

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}></View>
      <Button title="Let's Start" />
      <Button title="Import Data" />
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
}));
