import { Image, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { db } from 'App';
import { Brand, Password } from 'db/schema';
import { eq } from 'drizzle-orm';
import { wp } from '~/utils/ResponsiveSize';
import { FlashList } from '@shopify/flash-list';
import { RectButton } from 'react-native-gesture-handler';
import { Colors } from '~/constants/color';
import { navigate } from '~/utils/Navigation';

const Passwords = () => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    getPasswords();
  }, []);
  const getPasswords = async () => {
    const data = await db
      .select({
        id: Password.id,
        username: Password.username,
        note: Password.note,
        created_at: Password.created_at,
        updated_at: Password.updated_at,
        brand_id: Password.brand_id,
        encrypted_password: Password.encrypted_password,
        iv: Password.iv,
        brand_name: Brand.name,
        brand_domain: Brand.domain,
        brand_logo: Brand.logo_url,
      })
      .from(Password)
      .leftJoin(Brand, eq(Password.brand_id, Brand.brand_id));
    setPasswords([...data]);
    console.log(data);
    // debugger;
  };

  const onPress = (item) => {
    navigate('PasswordDetail', {
      passwordId: item.id,
      brand: item.brand_name,
      logo: item.brand_logo,
      key: item.username,
      encrypted_password: item.encrypted_password,
      note: item.note,
      iv_hex: item.iv,
      domain: item.brand_domain,
    });
  };
  return (
    <View style={styles.container}>
      <FlashList
        data={passwords}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.iv}
        renderItem={({ item }) => (
          <RectButton style={styles.card} onPress={() => onPress?.(item)}>
            <View style={styles.header}>
              <Image
                source={{
                  uri:
                    `data:image/png;base64,${item.brand_logo}` ||
                    `https://logo.clearbit.com/${item.brand_domain}`,
                }}
                style={styles.logo}
              />
              <View style={styles.headerText}>
                <Text style={styles.brand}>{item.brand_name}</Text>
                <Text style={styles.domain}>{item.brand_domain}</Text>
              </View>
            </View>

            <View style={styles.content}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.value}>{item.username}</Text>
            </View>

            <Text style={styles.note} numberOfLines={2}>
              {item.note}
            </Text>
          </RectButton>
        )}
      />
    </View>
  );
};

export default Passwords;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: wp(4),
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: wp(2),
    padding: wp(4),
    marginBottom: wp(3),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(2),
  },
  logo: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2),
    backgroundColor: '#e0e0e0',
  },
  headerText: {
    marginLeft: wp(3),
  },
  brand: {
    fontSize: wp(4),
    fontWeight: '600',
    color: theme.colors.typography,
  },
  domain: {
    fontSize: wp(3.2),
    color: '#687076',
  },
  content: {
    marginTop: wp(2),
  },
  label: {
    fontSize: wp(3.2),
    color: Colors.darkGray,
    marginBottom: wp(0.5),
  },
  value: {
    fontSize: wp(4),
    fontWeight: '500',
    color: theme.colors.typography,
  },
  note: {
    marginTop: wp(2),
    fontSize: wp(3.2),
    color: '#687076',
  },
}));
