import { get } from '@op-engineering/op-s2';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Buffer } from 'buffer';
import * as Clipboard from 'expo-clipboard';
import { ChevronLeft, Copy, Eye, EyeOff } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, Image, Text, ToastAndroid, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import QuickCrypto from 'react-native-quick-crypto';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { eq } from 'drizzle-orm';

import { Colors } from '~/constants/color';
import { RootStackParamList } from '~/navigation/nativestack';
import { goBack } from '~/utils/Navigation';
import { wp } from '~/utils/ResponsiveSize';
import { PasswordTag, Tag } from 'db/schema';
import { db } from 'App';

type Props = NativeStackScreenProps<RootStackParamList, 'PasswordDetail'>;

const PasswordDetail = ({ route }: Props) => {
  const { passwordId, domain, brand, logo, key, encrypted_password, note, iv_hex } = route.params;
  const [tags, setTags] = useState<string[]>([]);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [decryptedPassword, setDecryptedPassword] = useState<string>('');
  const url = domain ? domain.split('//')[1] : 'unknown';

  const decryptPassword = () => {
    try {
      const { value, error } = get({
        key: 'derived_key_hex',
        withBiometrics: !__DEV__,
      });

      if (error) {
        return Alert.alert('Secure Storage Error', JSON.stringify(error));
      }

      const derivedKey = Buffer.from(value!, 'hex');
      const iv = Buffer.from(iv_hex!, 'hex');

      const decipher = QuickCrypto.createDecipheriv('aes-256-cbc', derivedKey, iv);
      let decrypted = decipher.update(encrypted_password, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      setDecryptedPassword(decrypted);
      // Clipboard.setStringAsync(decrypted);
      setVisiblePassword(true);

      ToastAndroid.show('Password revealed!', ToastAndroid.SHORT);
    } catch (err) {
      console.error('Decryption failed:', err);
      return null;
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagList = await db
          .select({
            tag: Tag.name,
          })
          .from(Tag)
          .innerJoin(PasswordTag, eq(PasswordTag.tag_id, Tag.id))
          .where(eq(PasswordTag.password_id, passwordId));

        setTags(tagList);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };

    fetchTags();
  }, [passwordId]);
  const handleCopy = (value: string, label: string) => {
    Clipboard.setStringAsync(value);
    ToastAndroid.show(`${label} copied!`, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <RectButton style={styles.backBtn} onPress={goBack}>
          <ChevronLeft size={wp(8)} color={UnistylesRuntime.getTheme().colors.typography} />
        </RectButton>
        <Image
          source={{
            uri: logo ? `data:image/png;base64,${logo}` : `https://logo.clearbit.com/${domain}`,
          }}
          style={styles.logo}
        />
        <Text style={styles.brand}>{brand}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.label}>Username / Email / Phone</Text>
          <View style={styles.row}>
            <Text style={styles.value}>{key}</Text>
            <RectButton onPress={() => handleCopy(key, '')}>
              <Copy size={wp(6)} color={Colors.white} />
            </RectButton>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.row}>
            <Text style={styles.value}>{visiblePassword ? decryptedPassword : '••••••••'}</Text>
            <View style={styles.row}>
              <RectButton
                onPress={() => {
                  if (visiblePassword) {
                    setVisiblePassword(false);
                  } else {
                    decryptPassword();
                  }
                }}>
                {visiblePassword ? (
                  <EyeOff size={wp(6)} color="#FF6347" />
                ) : (
                  <Eye size={wp(6)} color="#FF6347" />
                )}
              </RectButton>
              <RectButton
                onPress={() => decryptedPassword && handleCopy(decryptedPassword, 'Password')}>
                <Copy size={wp(6)} color="#FFD700" />
              </RectButton>
            </View>
          </View>
        </View>

        {note.length > 0 ? (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Note</Text>
              <RectButton onPress={() => handleCopy(note, 'Note')}>
                <Copy size={wp(6)} color={Colors.white} />
              </RectButton>
            </View>
            <Text style={styles.noteValue}>{note}</Text>
          </View>
        ) : (
          <Text style={styles.notExist}>No notes added</Text>
        )}

        {tags.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.label}>Tags</Text>
            <View style={styles.tagsContainer}>
              {tags.map(({ tag }) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
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
    paddingHorizontal: wp(4),
    paddingTop: wp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginBottom: wp(6),
    justifyContent: 'center',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
  },
  logo: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    backgroundColor: Colors.mediumGray,
  },
  brand: {
    color: theme.colors.typography,
    fontSize: wp(6),
    fontWeight: '600',
  },
  section: {
    gap: wp(4),
  },
  card: {
    backgroundColor: '#e6e3e3',
    borderRadius: wp(3),
    padding: wp(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: wp(4.2),
    color: Colors.matrixGreen,
    fontWeight: 'bold',
    marginBottom: wp(2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: wp(4.5),
    color: theme.colors.typography,
    flex: 1,
    marginRight: wp(2),
  },
  noteValue: {
    fontSize: wp(4.5),
    color: theme.colors.typography,
    marginTop: wp(2),
  },
  notExist: {
    fontSize: wp(4.5),
    color: Colors.mediumGray,
    textAlign: 'center',
    marginTop: wp(4),
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(2),
    marginTop: wp(2),
  },
  tag: {
    backgroundColor: '#444',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    borderRadius: wp(4),
  },
  tagText: {
    color: Colors.white,
    fontSize: wp(4),
  },
}));
