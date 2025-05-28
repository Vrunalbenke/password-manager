import { FlashList } from '@shopify/flash-list';
import Icon from 'components/Icon';
import { Colors } from 'constants/color';
import { Plus } from 'lucide-react-native';
import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { navigate } from 'utils/Navigation';
import { wp } from 'utils/ResponsiveSize';

const data = [
  { title: 'Password', icon: 'RectangleEllipsis' },
  { title: 'Crypto Key', icon: 'Wallet' },
  { title: 'Note', icon: 'NotepadTextDashed' },
];

const Home = ({ route }) => {
  const { StorageList } = route.params;
  console.log(StorageList, '❌❌❌❌❌❌');
  const AnimatedPlus = Animated.createAnimatedComponent(Plus);
  const rotate = useSharedValue(false);
  const opacity = useSharedValue(0);
  const passTransY = useSharedValue(0);
  const cryptoTransY = useSharedValue(0);
  const notesTransY = useSharedValue(0);

  const handleAdd = () => {
    rotate.value = !rotate.value;
    if (!rotate.value) {
      opacity.value = withTiming(1);
      passTransY.value = withTiming(-100);
      cryptoTransY.value = withTiming(-200);
      notesTransY.value = withTiming(-300);
    } else {
      opacity.value = withTiming(0);
      passTransY.value = withTiming(0);
      cryptoTransY.value = withTiming(0);
      notesTransY.value = withTiming(0);
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

  const renderItem = ({ item }) => {
    if (typeof item === 'string') {
      return <Text style={styles.sectionheader}>{item}</Text>;
    }

    return (
      <View style={styles.sectionitemcontainer}>
        <Image
          source={{
            uri: `https://www.google.com/s2/favicons?domain=${item?.url?.replace(/(https?:\/\/)?(www\.)?/, '').split('/')[0]}&sz=128`,
          }}
          style={styles.logo}
        />
        <Text style={styles.url}>
          {item?.url?.replace(/(https?:\/\/)?(www\.)?/, '').split('/')[0]}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <Text>Home</Text>

      <View style={styles.storagelist}>
        <FlashList
          data={StorageList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
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
          <RectButton style={styles.optionbtn} onPress={() => navigate('Password')}>
            <Icon name={data[0].icon} size={wp(8)} color={Colors.white} />
          </RectButton>
          <Text>{data[0].title}</Text>
        </Animated.View>
        <Animated.View style={[styles.optioncontainer, CryptoAnimatedStyle]}>
          <RectButton style={styles.optionbtn}>
            <Icon name={data[1].icon} size={wp(8)} color={Colors.white} />
          </RectButton>
          <Text>{data[1].title}</Text>
        </Animated.View>
        <Animated.View style={[styles.optioncontainer, NoteAnimatedStyle]}>
          <RectButton style={styles.optionbtn}>
            <Icon name={data[2].icon} size={wp(8)} color={Colors.white} />
          </RectButton>
          <Text>{data[2].title}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: theme.colors.background,
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
  },
  optionscontainer: {
    position: 'absolute',
    bottom: wp(4),
    right: wp(4),
    zIndex: 2,
  },
  optioncontainer: {
    gap: wp(2),
    width: wp(15),
    // bottom: wp(4),
    // right: wp(4),
  },
  optionbtn: {
    backgroundColor: Colors.matrixGreen,
    borderRadius: wp(6),
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
