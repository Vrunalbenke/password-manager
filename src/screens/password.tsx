import { Buffer } from '@craftzdog/react-native-buffer';
import { zodResolver } from '@hookform/resolvers/zod';
import { get, set } from '@op-engineering/op-s2';
import { FlashList } from '@shopify/flash-list';
import { ChevronLeft } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, Text, ToastAndroid, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import QuickCrypto from 'react-native-quick-crypto';
import { StyleSheet } from 'react-native-unistyles';
import { z } from 'zod';

import { db } from 'App';

import { Button } from '~/components/Button';
import FormInput from '~/components/FormInput';
import { Colors } from '~/constants/color';
import { PasswordSchema } from '~/utils/FormSchema';
import { goBack } from '~/utils/Navigation';
import { hp, wp } from '~/utils/ResponsiveSize';

export type PasswordFields = z.infer<typeof PasswordSchema>;
const Password = () => {
  const { control, handleSubmit, watch, setValue } = useForm<PasswordFields>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      note: '',
    },
  });

  const [brandID, setBrandID] = useState<string | null>(null);
  const [brandSuggestions, setBrandSuggestions] = useState<any[]>([]);
  const [brandLoading, setBrandLoading] = useState(false);
  const brandValue = watch('brand');

  useEffect(() => {
    const fetchBrands = async () => {
      if (!brandValue || brandValue.length < 2 || brandID) {
        setBrandSuggestions([]);
        return;
      }
      setBrandLoading(true);
      try {
        const res = await fetch(
          `https://api.brandfetch.io/v2/search/${encodeURIComponent(brandValue)}?c=1idNjzrZkUhcVFjOJMt`,
          {
            headers: {
              Authorization: 'Bearer 1idNjzrZkUhcVFjOJMt',
            },
          }
        );
        const data = await res.json();
        console.log(data, '💿💿💿💿💿💿', res);
        if (data.length === 0) {
          setBrandSuggestions([
            {
              icon: 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
              name: brandValue,
              brandId: Math.random().toString(36).substring(2, 15),
              domain: '',
            },
          ]);
        } else {
          setBrandSuggestions(data || []);
        }
      } catch (e) {
        setBrandSuggestions([]);
      }
      setBrandLoading(false);
    };
    const timeout = setTimeout(fetchBrands, 400);
    return () => clearTimeout(timeout);
  }, [brandValue]);

  const encryptPassword = async (password: string, derivedKeyHex: string) => {
    const derivedKey = Buffer.from(derivedKeyHex, 'hex');
    const iv = QuickCrypto.randomBytes(16); // 128-bit IV

    const cipher = QuickCrypto.createCipheriv('aes-256-cbc', derivedKey, iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encrypted, iv: iv.toString('hex') };
  };

  const handleSave = async (data: PasswordFields) => {
    const { brand, key, password, url, note } = data;
    console.log('QWERTYUIO', data);
    const { value, error } = get({
      key: 'derived_key_hex',
      withBiometrics: true,
    });

    console.log(value, 'value from secure storage');
    if (error) {
      Alert.alert('Error from Secure Storage', JSON.stringify(error));
      ToastAndroid.showWithGravity('Something went wrong', ToastAndroid.LONG, ToastAndroid.TOP);
    } else if (value) {
      const { encrypted, iv } = await encryptPassword(password, value);
      console.log(encrypted, iv, 'encrypted password and iv');

      db.transaction((tx) => {
        tx.execute(
          `
          INSERT INTO PasswordEntry (group_id, username, encrypted_password, note, iv, created_at)
          VALUES (?, ?, ?, ?, ?, datetime('now'))
          `,
          [brandID, key, encrypted, note, iv]
        );
      })
        .then(() => {
          const isBrandExists = db.execute(
            'SELECT COUNT(*) as count FROM PasswordGroup WHERE brandId = ?',
            [brandID]
          );
          console.log(isBrandExists, 'isBrandExists');
          // .then((result) => result.rows.item(0).count > 0);
          if (!isBrandExists.rows.item(0).count > 0) {
            db.transaction((tx) => {
              tx.execute(
                "INSERT INTO PasswordGroup (brandId, brand, domain, created_at) VALUES (?, ?, ?, datetime('now'))",
                [brandID, brand, url]
              );
            });
          }
        })
        .catch((error) => {
          console.error('Error saving password:', error);
          ToastAndroid.showWithGravity(
            'Failed to save password',
            ToastAndroid.LONG,
            ToastAndroid.TOP
          );
        });
      ToastAndroid.showWithGravity(
        'Password add to Secure Storage',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
      goBack();
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <RectButton onPress={goBack}>
          <ChevronLeft size={wp(8)} color={Colors.white} />
        </RectButton>
        <Text style={styles.title}>Password</Text>
      </View>
      <View style={styles.inputcontainer}>
        <FormInput
          control={control}
          name="brand"
          label="Website / App"
          placeholder="SBI"
          inputMode="text"
          maxLength={100}
          TextInputContainerStyle={styles.TextInputContainerStyle}
          TextInputStyle={styles.TextInputStyle}
          disabled={brandID !== null}
          isClear={brandID !== null}
          onClear={() => {
            setValue('brand', '');
            setValue('url', '');
            setValue('key', '');
            setValue('password', '');
            setBrandID(null);
            setBrandSuggestions([]);
          }}
        />
        {brandLoading && <Text style={{ color: Colors.matrixGreen }}>Searching...</Text>}
        {brandSuggestions.length > 0 && (
          <View style={{ flex: 1 }}>
            <FlashList
              data={brandSuggestions}
              keyExtractor={(item) => item.brandId}
              renderItem={({ item }) => (
                <RectButton
                  onPress={() => {
                    setValue('brand', item.name);
                    setValue('url', `https://${item.domain}`);
                    setBrandID(item.brandId);
                    setBrandSuggestions([]);
                  }}
                  style={styles.brandSuggestion}>
                  <View style={styles.brandImageContainer}>
                    <Image source={{ uri: item.icon }} style={styles.brandImage} />
                  </View>
                  <Text style={styles.brandName}>{item.name}</Text>
                </RectButton>
              )}
            />
          </View>
        )}
        {brandID ? (
          <>
            <FormInput
              control={control}
              name="url"
              label="website link"
              placeholder="google.com"
              inputMode="text"
              maxLength={30}
              TextInputContainerStyle={styles.TextInputContainerStyle}
              TextInputStyle={styles.TextInputStyle}
            />
            <FormInput
              control={control}
              name="key"
              label="Username/Mobile no/Email"
              placeholder="type here"
              inputMode="text"
              maxLength={30}
              TextInputContainerStyle={styles.TextInputContainerStyle}
              TextInputStyle={styles.TextInputStyle}
            />
            <FormInput
              control={control}
              name="password"
              label="Password"
              placeholder="********"
              inputMode="text"
              maxLength={30}
              secureTextEntry
              isPassword
              TextInputContainerStyle={styles.TextInputContainerStyle}
              TextInputStyle={styles.TextInputStyle}
            />
            <FormInput
              control={control}
              name="note"
              label="Note (optional)"
              placeholder="Type here"
              inputMode="text"
              multiline
              TextInputContainerStyle={[
                styles.TextInputContainerStyle,
                { height: hp(15.5), justifyContent: 'flex-start', alignItems: 'flex-start' },
              ]}
              TextInputStyle={styles.TextInputStyle}
            />
          </>
        ) : null}
      </View>
      <View style={styles.savebtn}>
        <Button
          title="Save"
          onPress={handleSubmit(handleSave)}
          style={{ backgroundColor: Colors.matrixGreen }}
        />
      </View>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    width: wp(100),
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
    gap: wp(2),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(5),
    color: Colors.matrixGreen,
    fontWeight: '700',
    textAlign: 'center',
  },
  inputcontainer: {
    flex: 1,
    padding: wp(4),
    gap: wp(4),
  },
  TextInputContainerStyle: {
    width: wp(92),
    borderRadius: 12,
  },
  TextInputStyle: {
    width: wp(78),
  },
  savebtn: {
    padding: wp(4),
  },
  brandSuggestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(2),
  },
  brandImageContainer: {
    padding: wp(1),
    borderRadius: wp(6),
    width: wp(12),
    height: wp(12),
    backgroundColor: Colors.white,
  },
  brandImage: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
  },
  brandName: {
    fontSize: wp(4),
    color: Colors.matrixGreen,
    flex: 1,
    marginLeft: wp(2),
  },
}));
