import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

const About = () => {
  return (
    <View style={styles.root}>
      <Text>About</Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
