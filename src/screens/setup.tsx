import { set } from '@op-engineering/op-s2';
import * as LocalAuthentication from 'expo-local-authentication';
import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert, Platform } from 'react-native';
import { generateSecureRandom } from 'react-native-securerandom';
import { StyleSheet } from 'react-native-unistyles';

import { db } from 'App';
import QuickCrypto, { BinaryLike } from 'react-native-quick-crypto';

import { Button } from '~/components/Button';
import UserInput from '~/components/UserInput';
import { Colors } from '~/constants/color';
import { navigate } from '~/utils/Navigation';
import { wp } from '~/utils/ResponsiveSize';

const MasterKeySetup = () => {
  const [masterKey, setMasterKey] = useState('');
  const [confirmMasterKey, setConfirmMasterKey] = useState('');
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [error, setError] = useState<{
    key: string | null;
    confirm: string | null;
  }>({
    key: null,
    confirm: null,
  });

  const deriveKey = async (password: string, saltBuffer: BinaryLike) => {
    return new Promise((resolve, reject) => {
      QuickCrypto.pbkdf2(password, saltBuffer, 100000, 32, 'sha256', (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey);
      });
    });
  };

  useEffect(() => {
    const checkBiometrics = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricAvailable(hasHardware && isEnrolled);
    };
    checkBiometrics();
  }, []);

  const handleDBSetup = async () => {
    if (masterKey.length < 8) {
      setError({ key: 'Master key must be at least 8 characters long', confirm: null });
      return;
    }

    if (masterKey !== confirmMasterKey) {
      setError({ key: null, confirm: 'Master keys do not match' });
      return;
    }

    try {
      const salt = QuickCrypto.randomBytes(16);
      const saltHex = salt.toString('hex');

      const derivedKey = await deriveKey(masterKey, salt);
      console.log('Derived Key:', derivedKey?.toString('hex'));

      const keyHash = QuickCrypto.createHash('sha256').update(derivedKey).digest('hex'); // String

      set({
        key: 'derived_key_hex',
        value: derivedKey.toString('hex'),
        withBiometrics: true,
      });

      set({
        key: 'namak',
        value: saltHex,
        withBiometrics: false,
      });

      set({
        key: 'master_key_hash',
        value: keyHash,
        withBiometrics: false,
      });

      db.transaction((tx) => {
        tx.execute('INSERT INTO LoginDetails (is_setup) VALUES (1)', []);
      });

      navigate('BottomTab', {
        screen: 'Home',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to set up master key', error);
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text style={styles.title}>Setup Your Master Key</Text>

      <View style={styles.educationContainer}>
        <Text style={styles.educationTitle}>About Your Master Key</Text>
        <Text style={styles.educationText}>
          Your master key is the single password that protects all your other passwords. It's never
          stored directly - only a secure hash is saved on your device.
        </Text>
        <Text style={styles.educationText}>
          • You'll need this key to access your passwords
          {isBiometricAvailable ? ' or use biometric authentication' : ''}
        </Text>
        <Text style={styles.educationText}>
          • Make it strong and memorable - you won't be able to recover it if forgotten
        </Text>
        <Text style={styles.educationText}>
          • The master key never leaves your device and isn't shared with anyone
        </Text>
      </View>

      <UserInput
        value={masterKey}
        onChangeText={setMasterKey}
        error={error.key}
        inputMode="text"
        label="Create Master Key"
        placeholder="Minimum 8 characters"
        maxLength={32}
        TextInputContainerStyle={styles.inputContainer}
        TextInputStyle={styles.input}
        isPassword
        secureTextEntry
      />

      <UserInput
        value={confirmMasterKey}
        onChangeText={setConfirmMasterKey}
        error={error.confirm}
        inputMode="text"
        label="Confirm Master Key"
        placeholder="Re-enter your master key"
        maxLength={32}
        TextInputContainerStyle={styles.inputContainer}
        TextInputStyle={styles.input}
        isPassword
        secureTextEntry
      />

      {isBiometricAvailable && (
        <View style={styles.biometricInfo}>
          <Text style={styles.biometricText}>
            {Platform.OS === 'ios' ? 'Face ID' : 'Fingerprint'} will be available as an alternative
            authentication method.
          </Text>
        </View>
      )}

      <Button title="Proceed" onPress={handleDBSetup} style={styles.button} />

      <View style={styles.securityInfo}>
        <Text style={styles.securityText}>
          Security: Master key hashed with SHA-256. Database encrypted with AES-256.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: wp(4),
    paddingBottom: rt.insets.bottom,
    alignItems: 'center',
  },
  title: {
    fontSize: wp(6),
    fontWeight: 'bold',
    marginBottom: wp(5),
    color: Colors.matrixGreen,
    textAlign: 'center',
  },
  educationContainer: {
    backgroundColor: '#e3f2fd',
    padding: wp(4),
    borderRadius: wp(2),
    marginBottom: wp(5),
    width: wp(92),
  },
  educationTitle: {
    fontSize: wp(4.5),
    fontWeight: '600',
    marginBottom: wp(2),
    color: Colors.darkGray,
  },
  educationText: {
    fontSize: wp(3.8),
    marginBottom: wp(2),
    color: Colors.darkGray,
  },
  inputContainer: {
    width: wp(92),
    borderRadius: wp(2),
    marginBottom: wp(4),
  },
  input: {
    width: wp(78),
  },
  button: {
    marginTop: wp(2),
    backgroundColor: Colors.matrixGreen,
    width: wp(92),
  },
  biometricInfo: {
    marginTop: wp(2),
    marginBottom: wp(5),
    padding: wp(3),
    backgroundColor: '#e8f5e9',
    borderRadius: wp(2),
    width: wp(92),
  },
  biometricText: {
    fontSize: wp(3.5),
    color: Colors.matrixGreen,
    textAlign: 'center',
  },
  securityInfo: {
    marginTop: wp(6),
    padding: wp(3),
    backgroundColor: '#fff3e0',
    borderRadius: wp(2),
    width: wp(92),
  },
  securityText: {
    fontSize: wp(3.2),
    color: Colors.darkGray,
    textAlign: 'center',
  },
}));

export default MasterKeySetup;
