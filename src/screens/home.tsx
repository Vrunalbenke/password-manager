import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { db } from 'App';
import { AppMeta, AtmPin, CreditCard, CryptoKey, Password } from 'db/schema';
import { count } from 'drizzle-orm';
import { ArrowRight, Search } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Image, Switch, Text, TextInput, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';

import CategoryBox from '~/components/CategoryBox';
import DropDown from '~/components/DropDown';
import FAB from '~/components/FAB';
import { Colors } from '~/constants/color';
import { navigate } from '~/utils/Navigation';
import { wp } from '~/utils/ResponsiveSize';

const Home = ({}) => {
  const [name, setName] = useState('');
  const [list, setList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('dark');
  const [totalCount, setTotalCount] = useState({
    password: 0,
    cryptokey: 0,
    creditcard: 0,
    atmpin: 0,
  });

  const getName = async () => {
    const username = await db.select({ user: AppMeta.username }).from(AppMeta);
    console.log('username', username);
    setName(username[0].user);
  };
  useEffect(() => {
    getName();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        console.log('💿💿💿💿');
        setSearch('');
        const totalPasswords = await db.select({ count: count() }).from(Password);
        const totalCreditCards = await db.select({ count: count() }).from(CreditCard);
        const totalATMPins = await db.select({ count: count() }).from(AtmPin);
        const totalCrytoKeys = await db.select({ count: count() }).from(CryptoKey); // Assuming you have a table for crypto keys

        console.log(totalPasswords[0].count, ' is total number of passwords');
        setTotalCount({
          password: totalPasswords[0].count,
          cryptokey: totalCrytoKeys[0].count,
          creditcard: totalCreditCards[0].count,
          atmpin: totalATMPins[0].count,
        });

        // const resp = db.execute('SELECT * FROM PasswordGroup');
        // const newList = resp.rows?._array.map((element) => {
        //   const idPass = db.execute('SELECT * FROM PasswordEntry WHERE group_id = ?', [
        //     element.brandId,
        //   ]);
        //   return { title: element.brand, domain: element.domain, data: idPass.rows?._array };
        // });
        // setList(newList);
      };

      fetchData();
    }, [])
  );

  const handleSearch = useCallback(
    (text) => {
      setSearch(text);
      const filtered = list
        .map((item) => ({
          ...item,
          data: item.data.filter((entry) =>
            [entry.username, item.title, item.domain].some(
              (field) => field && field.toLowerCase().includes(text.toLowerCase())
            )
          ),
        }))
        .filter((item) => item.data.length > 0);
      setList(filtered);
    },
    [list]
  );

  const renderItem = ({ item }) => {
    const domain = item.domain ? item.domain.split('//')[1] : 'unknown';

    console.log(domain, 'domain', item);
    return (
      <View
        style={[
          styles.sectionitemcontainer,
          { flexDirection: 'column', alignItems: 'flex-start' },
        ]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2) }}>
          <Image
            source={{
              uri: `https://cdn.brandfetch.io/${domain}/w/400/h/400?c=1idNjzrZkUhcVFjOJMt`,
            }}
            style={styles.logo}
          />
          <Text style={styles.sectionheader}>{item.title}</Text>
        </View>
        {item.data.map((entry) => (
          <RectButton
            key={entry.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 4,
              backgroundColor: '#222',
              borderRadius: 8,
              padding: 8,
              width: '100%',
            }}
            onPress={() => {
              console.log(item, ' item.title');
              navigate('PasswordDetail', {
                entry,
                title: item.title,
                domain: item.domain,
              });
            }}>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.url}>{entry.username}</Text>
              <Text style={{ color: '#aaa', fontSize: 12 }}>{entry.created_at}</Text>
            </View>
            <ArrowRight size={wp(7)} color={Colors.white} />
          </RectButton>
        ))}
      </View>
    );
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return `Good Morning, ${name}`;
    } else if (hour < 18) {
      return `Good Afternoon, ${name}`;
    } else {
      return `Good Evening, ${name}`;
    }
  };

  const handleNavigate = (screen) => {
    navigate(screen);
  };
  return (
    <View style={styles.root}>
      <Text style={styles.greeting}>{getGreeting()}</Text>
      <View style={styles.categoryContainer}>
        <CategoryBox
          bgColor={1}
          title="Passwords"
          totalCount={totalCount.password}
          onPress={() => handleNavigate('Passwords')}
        />
        <CategoryBox
          bgColor={2}
          title="Crypto Keys"
          totalCount={totalCount.cryptokey}
          onPress={() => handleNavigate('Passwords')}
        />
        <CategoryBox
          bgColor={3}
          title="Credit Cards"
          totalCount={totalCount.creditcard}
          onPress={() => handleNavigate('Passwords')}
        />
        <CategoryBox
          bgColor={4}
          title="ATM Pin"
          totalCount={totalCount.atmpin}
          onPress={() => handleNavigate('Passwords')}
        />
      </View>

      <View>
        <DropDown
          title="Recently Used"
          data={[
            {
              username: 'benkevrunal456@gmail.com',
              img: 'https://static.vecteezy.com/system/resources/previews/016/716/465/non_2x/gmail-icon-free-png.png',
            },
            {
              username: 'vrunalbenke',
              img: 'https://cdn.iconscout.com/icon/free/png-256/free-sbi-logo-icon-download-in-svg-png-gif-file-formats--state-bank-of-india-pack-logos-icons-225865.png',
            },
            {
              username: 'Flipkart Axis Card',
              img: 'https://www.axisbank.com/images/default-source/progress-with-us_new/credit-card-800x500.jpg',
            },
          ]}
        />
      </View>

      <Text style={styles.greeting}>{theme}</Text>

      <Switch
        value={theme === 'dark'}
        onValueChange={() => {
          const currentTheme = UnistylesRuntime.themeName;
          const newTheme = currentTheme === 'light' ? 'dark' : 'light';
          // setTheme(newTheme);
          UnistylesRuntime.setTheme(newTheme);
        }}
      />
      {/* <View style={styles.searchContainer}>
        <Search size={wp(7)} color={Colors.mediumGray} />
        <TextInput
          value={search}
          placeholder="Search"
          style={styles.searchInput}
          onChangeText={handleSearch}
        />
      </View> */}
      {/* <View style={styles.storagelist}>
        <FlashList
          data={list}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View> */}

      <FAB />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: theme.colors.background,
  },
  greeting: {
    color: Colors.matrixGreen,
    fontSize: wp(6),
    fontWeight: '600',
    marginTop: wp(4),
    marginBottom: wp(2),
    marginLeft: wp(4),
    alignSelf: 'flex-start',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(100),
    padding: wp(2),
    rowGap: wp(4),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(92),
    paddingLeft: wp(6),
    paddingVertical: wp(1),
    borderRadius: wp(10),
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    gap: wp(2),
  },
  searchInput: {
    width: wp(80),
    // padding: wp(2),
    borderRadius: 8,
  },
  storagelist: {
    flex: 1,
    width: wp(100),
    padding: wp(4),
  },
  sectionheader: {
    fontSize: wp(5),
    fontWeight: '500',
    color: Colors.matrixGreen,
  },
  sectionitemcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: wp(4),
    width: wp(92),
    padding: wp(2),
    backgroundColor: Colors.darkGray,
    marginVertical: wp(2),
  },
  logo: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
  },
  url: {
    fontSize: wp(4),
    fontWeight: '400',
    color: theme.colors.typography,
  },
}));
