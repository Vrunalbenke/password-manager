import { open, DB } from '@op-engineering/op-sqlite';
import { Button } from 'components/Button';
import UserInput from 'components/UserInput';
import { Colors } from 'constants/color';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { navigate } from 'utils/Navigation';
import { wp } from 'utils/ResponsiveSize';
import { set } from '@op-engineering/op-s2';
import { generateSecureRandom } from 'react-native-securerandom';

export let db: DB;
const Setup = () => {
  const [key, setKey] = useState('');

  const handleDBSetup = async () => {
    const secureBytes = await generateSecureRandom(42);
    console.log(secureBytes, '🔑🔑🔑🔑🔑🔑🔑');
    // on the latest versions of RN btoa is part of hermes
    const secureKey = btoa(String.fromCharCode.apply(null, secureBytes));
    db = open({
      name: 'Surakshit',
      encryptionKey: secureKey,
    });

    db.executeSync(
      `CREATE TABLE IF NOT EXISTS Password ( 
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      url TEXT, 
      key TEXT, 
      secureKey Text)`
    );
    const { error } = set({
      key: 'db_encrptionkey',
      value: secureKey,
      withBiometrics: true, // This means a FaceID/biometrics prompt will appear every time. See the docs if you don't want to use this
    });

    console.log(error, ' - Error');

    navigate('BottomTab', {
      screen: 'Home',
      params: { key: secureKey },
    });
  };
  return (
    <View style={styles.root}>
      <Text style={styles.Title}> Welcome to Surakshit!</Text>
      <UserInput
        value={key}
        onChangeText={setKey}
        error={null}
        inputMode="text"
        label="Encryption Key"
        placeholder="Set a complex encryption key"
        maxLength={10}
        TextInputContainerStyle={styles.TextInputContainerStyle}
        TextInputStyle={styles.TextInputStyle}
        isPassword
        secureTextEntry
      />
      <Button title="Proceed" onPress={handleDBSetup} />
    </View>
  );
};

export default Setup;

const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingBottom: rt.insets.bottom,
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(2),
  },
  Title: {
    fontSize: wp(4),
    color: Colors.matrixGreen,
  },
  TextInputContainerStyle: {
    width: wp(92),
    borderRadius: 12,
  },
  TextInputStyle: {
    width: wp(78),
  },
}));
