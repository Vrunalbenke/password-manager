import { Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import Icon from './Icon';

import { Colors } from '~/constants/color';
import { navigate } from '~/utils/Navigation';
import { wp } from '~/utils/ResponsiveSize';

const TRANSLATEY_VALUE = -80;
const data = [
  { title: 'Password', icon: 'RectangleEllipsis' },
  { title: 'Crypto Key', icon: 'Wallet' },
  { title: 'Credit Card', icon: 'CreditCard' },
  { title: 'ATM Pin', icon: 'WalletCards' },
  //   { title: 'Note', icon: 'NotepadTextDashed' },
];

const FAB = () => {
  const [isFABOpen, setIsFABOpen] = useState(false);
  const AnimatedPlus = Animated.createAnimatedComponent(Plus);
  const rotate = useSharedValue(false);

  const handleAdd = () => {
    rotate.value = !rotate.value;
    setIsFABOpen((prev) => !prev);
  };

  const PassAnimatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      { translateY: !rotate.value ? withTiming(0) : withTiming(TRANSLATEY_VALUE) },
      { translateY: 0 },
    ],
    opacity: !rotate.value ? withTiming(0) : withTiming(1),
  }));
  const CryptoAnimatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      { translateY: !rotate.value ? withTiming(0) : withTiming(TRANSLATEY_VALUE * 2) },
      { translateY: 0 },
    ],
    opacity: !rotate.value ? withTiming(0) : withTiming(1),
  }));
  const CCAnimatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      { translateY: !rotate.value ? withTiming(0) : withTiming(TRANSLATEY_VALUE * 3) },
      { translateY: 0 },
    ],
    opacity: !rotate.value ? withTiming(0) : withTiming(1),
  }));
  const ATMAnimatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      { translateY: !rotate.value ? withTiming(0) : withTiming(TRANSLATEY_VALUE * 4) },
      { translateY: 0 },
    ],
    opacity: !rotate.value ? withTiming(0) : withTiming(1),
  }));

  const AddAnimatedStyle = useAnimatedStyle(() => {
    const isExpanded = rotate.value ? '45deg' : '0deg';
    return {
      transform: [{ rotate: withTiming(isExpanded) }],
    };
  });
  return (
    <View style={styles.flexBG(isFABOpen)}>
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
        <Animated.View style={[styles.optioncontainer, CCAnimatedStyle]}>
          <RectButton style={styles.optionbtn}>
            <Icon name={data[2].icon} size={wp(8)} color={Colors.white} />
          </RectButton>
          <Text style={styles.optiontext}>{data[2].title}</Text>
        </Animated.View>
        <Animated.View style={[styles.optioncontainer, ATMAnimatedStyle]}>
          <RectButton style={styles.optionbtn}>
            <Icon name={data[3].icon} size={wp(8)} color={Colors.white} />
          </RectButton>
          <Text style={styles.optiontext}>{data[3].title}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default FAB;

const styles = StyleSheet.create((theme) => ({
  flexBG: (isOpen) => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
  }),
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
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
}));
