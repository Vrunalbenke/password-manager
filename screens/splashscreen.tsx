import { get } from '@op-engineering/op-s2';
import { DB, open } from '@op-engineering/op-sqlite';
import { Colors } from 'constants/color';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { navigate } from 'utils/Navigation';
import { wp } from 'utils/ResponsiveSize';

export let db: DB;

const Splashscreen = () => {
  useEffect(() => {
    setTimeout(() => {
      const key = get({
        key: 'db_encrptionkey',
        withBiometrics: true,
      });
      console.log(key, '🦋🦋🦋🦋🦋🦋');
      if (key.error) {
        navigate('Setup');
      } else {
        db = open({
          name: 'db_encryption',
          encryptionKey: key.value,
        });
        db.executeSync(
          `CREATE TABLE IF NOT EXISTS Password ( 
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              url TEXT, 
              key TEXT, 
              secureKey Text)`
        );

        const password = db.executeSync(`SELECT * FROM Password`);
        console.log(password.rows, '👄👄👄👄👄👄👄');

        const data = [];

        password.rows.forEach((element) => {
          if (data?.some((item) => item.url === element.url)) {
          }
        });

        navigate('BottomTab', {
          screen: 'Home',
          params: {
            StorageList: password.rows.length > 0 ? ['Password', ...password.rows] : [],
          },
        });
      }
    }, 1000);
  });

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Splashscreen</Text>
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: wp(5),
    color: Colors.matrixGreen,
  },
}));
