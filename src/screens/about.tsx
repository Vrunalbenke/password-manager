import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { db } from 'App';

import { Button } from '~/components/Button';

const About = () => {
  return (
    <View style={styles.root}>
      <Text>About</Text>

      <Button
        title="Delete DB"
        onPress={() => {
          // db.delete('op-sqlcipher');
          db.delete('Surakshit');
        }}
      />
    </View>
  );
};

export default About;

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
}));
