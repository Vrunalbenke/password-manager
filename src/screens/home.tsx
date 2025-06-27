import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ArrowRight, Plus, Search } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { Image, Switch, Text, TextInput, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';

import { db } from 'App';

import CategoryBox from '~/components/CategoryBox';
import DropDown from '~/components/DropDown';
import Icon from '~/components/Icon';
import { Colors } from '~/constants/color';
import { navigate } from '~/utils/Navigation';
import { wp } from '~/utils/ResponsiveSize';
import { count } from 'drizzle-orm';
import { AtmPin, CreditCard, CryptoKey, Password } from 'db/schema';
import { set } from 'react-hook-form';

const data = [
  { title: 'Password', icon: 'RectangleEllipsis' },
  { title: 'Crypto Key', icon: 'Wallet' },
  { title: 'Note', icon: 'NotepadTextDashed' },
];

const Home = ({}) => {
  const [list, setList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('dark');
  const [totalCount, setTotalCount] = useState({
    password: 0,
    cryptokey: 0,
    creditcard: 0,
    atmpin: 0,
  });
  const AnimatedPlus = Animated.createAnimatedComponent(Plus);
  const rotate = useSharedValue(false);
  const opacity = useSharedValue(0);
  const passTransY = useSharedValue(0);
  const cryptoTransY = useSharedValue(0);
  const notesTransY = useSharedValue(0);

  useEffect(() => {
    // const resp = db.execute('SELECT * FROM PasswordGroup');
    // resp.rows?._array.forEach((element) => {
    //   const idPass = db.execute('SELECT * FROM PasswordEntry WHERE group_id = ?', [
    //     element.brandId,
    //   ]);
    //   console.log(idPass.rows?._array, 'idPass');
    //   setList((prev) => [
    //     ...prev,
    //     { title: element.brand, domain: element.domain, data: idPass.rows?._array },
    //   ]);
    // });
    // console.log(resp.rows, 'Database initialized successfully');
  }, []);

  const handleAdd = () => {
    rotate.value = !rotate.value;
    if (!rotate.value) {
      opacity.value = withTiming(1);
      passTransY.value = withTiming(-90);
      cryptoTransY.value = withTiming(-180);
      notesTransY.value = withTiming(-270);
    } else {
      opacity.value = withTiming(0);
      passTransY.value = withTiming(10);
      cryptoTransY.value = withTiming(10);
      notesTransY.value = withTiming(10);
    }
  };

  const PassAnimatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [{ translateY: passTransY.value }, { translateY: 0 }],
    opacity: opacity.value,
  }));
  const CryptoAnimatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [{ translateY: cryptoTransY.value }, { translateY: 0 }],
    opacity: opacity.value,
  }));
  const NoteAnimatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [{ translateY: notesTransY.value }, { translateY: 0 }],
    opacity: opacity.value,
  }));

  const AddAnimatedStyle = useAnimatedStyle(() => {
    const isExpanded = rotate.value ? '45deg' : '0deg';
    return {
      transform: [{ rotate: withTiming(isExpanded) }],
    };
  });

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
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
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
      <View style={styles.optionscontainer}>
        <RectButton style={[styles.addbtn]} onPress={handleAdd}>
          <AnimatedPlus
            size={wp(12)}
            fill={Colors.matrixGreen}
            color={Colors.white}
            style={AddAnimatedStyle}
          />
        </RectButton>

        <Animated.View style={[styles.optioncontainer, PassAnimatedStyle]}>
          <RectButton style={styles.optionbtn} onPress={() => navigate('AddPassword')}>
            <Icon name={data[0].icon} size={wp(8)} color={Colors.white} />
          </RectButton>
          <Text style={styles.optiontext}>{data[0].title}</Text>
        </Animated.View>
        <Animated.View style={[styles.optioncontainer, CryptoAnimatedStyle]}>
          <RectButton style={styles.optionbtn}>
            <Icon name={data[1].icon} size={wp(8)} color={Colors.white} />
          </RectButton>
          <Text style={styles.optiontext}>{data[1].title}</Text>
        </Animated.View>
        <Animated.View style={[styles.optioncontainer, NoteAnimatedStyle]}>
          <RectButton style={styles.optionbtn}>
            <Icon name={data[2].icon} size={wp(8)} color={Colors.white} />
          </RectButton>
          <Text style={styles.optiontext}>{data[2].title}</Text>
        </Animated.View>
      </View>
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
  addbtn: {
    // position: 'absolute',
    // bottom: wp(4),
    // right: wp(4),
    backgroundColor: Colors.matrixGreen,
    borderRadius: wp(6),
    zIndex: 10,
    width: wp(12),
  },
  optionscontainer: {
    position: 'absolute',
    bottom: wp(4),
    right: wp(5),
    zIndex: 2,
    width: wp(15),
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  optioncontainer: {
    gap: wp(2),
    width: wp(15),
    // bottom: wp(4),
    // right: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  optionbtn: {
    width: wp(12),
    backgroundColor: Colors.matrixGreen,
    borderRadius: wp(6),
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  optiontext: {
    fontSize: wp(3),
    fontWeight: '400',
    color: theme.colors.typography,
    textAlign: 'center',
  },
}));
