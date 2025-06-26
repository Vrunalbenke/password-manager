import { get } from '@op-engineering/op-s2';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Buffer } from 'buffer'; // Ensure you’ve polyfilled it in App.tsx
import * as Clipboard from 'expo-clipboard';
import { ChevronLeft, Copy } from 'lucide-react-native';
import { Alert, Image, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import QuickCrypto from 'react-native-quick-crypto';
import { StyleSheet } from 'react-native-unistyles';

import { Colors } from '~/constants/color';
import { RootStackParamList } from '~/navigation/nativestack';
import { goBack } from '~/utils/Navigation';
import { wp } from '~/utils/ResponsiveSize';

const PasswordDetail = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'PasswordDetail'>) => {
  const { domain, title, entry } = route.params;

  const url = domain ? domain.split('//')[1] : 'unknown';
  console.log(url);

  const decryptPasswordandCopy = () => {
    try {
      // 1. Authenticate User
      const { value, error } = get({
        key: 'derived_key_hex',
        withBiometrics: true,
      });

      if (error) {
        return Alert.alert('Error from Secure Storage', JSON.stringify(error));
      }
      // 3. Convert hex to Buffer
      const key = Buffer.from(value!, 'hex');
      const iv = Buffer.from(entry.iv!, 'hex');

      // 4. Decrypt
      const decipher = QuickCrypto.createDecipheriv('aes-256-cbc', key, iv);

      let decrypted = decipher.update(entry.encrypted_password, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      console.log(decrypted, 'Decrypted Password');
      Clipboard.setStringAsync(decrypted);
    } catch (err) {
      console.error('Decryption failed:', err);
      return null;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <RectButton style={styles.backBTN} onPress={goBack}>
          <ChevronLeft size={wp(9)} color={Colors.white} />
        </RectButton>
        <Image
          source={{
            uri: `https://cdn.brandfetch.io/${url}/w/400/h/400?c=1idNjzrZkUhcVFjOJMt`,
          }}
          style={styles.logo}
        />
        <Text style={{ color: Colors.white, fontSize: wp(5.5), fontWeight: 'bold' }}>{title}</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.keyValueContainer}>
          <Text style={styles.key}>Username/Email/Phone number</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{entry.username}</Text>
            <RectButton onPress={() => Clipboard.setStringAsync(entry.username)}>
              <Copy size={wp(6)} color={Colors.white} />
            </RectButton>
          </View>
        </View>

        <View style={styles.keyValueContainer}>
          <Text style={styles.key}>Password</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>••••••••</Text>
            <View style={styles.passwordIconContainer}>
              <RectButton onPress={decryptPasswordandCopy}>
                <Copy size={wp(6)} color={Colors.white} />
              </RectButton>
            </View>
          </View>
        </View>

        {entry.note.length > 0 ? (
          <View style={styles.keyValueContainer}>
            <View style={styles.valueContainer}>
              <Text style={styles.key}>Note</Text>
              <RectButton onPress={() => Clipboard.setStringAsync(entry.note)}>
                <Copy size={wp(6)} color={Colors.white} />
              </RectButton>
            </View>
            <Text style={styles.value}>{entry.note}</Text>
          </View>
        ) : (
          <Text style={styles.notExist}>No notes added</Text>
        )}
      </View>
    </View>
  );
};

export default PasswordDetail;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: wp(2),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    gap: wp(4),
    // backgroundColor: 'lightblue',
    height: wp(9),
  },
  backBTN: {
    position: 'absolute',
    left: wp(0),
    top: wp(0),
  },
  logo: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    // marginBottom: wp(4),
  },
  mainContainer: {
    flex: 1,
    padding: wp(4),
    gap: wp(4),
  },
  keyValueContainer: {
    borderRadius: wp(2),
    backgroundColor: Colors.darkGray,
    padding: wp(2),
  },
  key: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: Colors.matrixGreen,
    // marginBottom: wp(2),
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: wp(4),
    // padding: wp(2),
  },
  value: {
    fontSize: wp(4.5),
    color: theme.colors.typography,
  },
  passwordIconContainer: {},
  notExist: {
    fontSize: wp(4.5),
    color: Colors.mediumGray,
    textAlign: 'center',
    marginTop: wp(4),
  },
}));
