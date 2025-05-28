import Icon from 'components/Icon';
import { Colors } from 'constants/color';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';
import { wp } from 'utils/ResponsiveSize';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
const data = [
  { title: 'Password', icon: 'RectangleEllipsis' },
  { title: 'Crypto Key', icon: 'Wallet' },
  { title: 'Note', icon: 'NotepadTextDashed' },
];

const AddOptions = () => {
  return (
    <View style={styles.root}>
      <View style={styles.optionscontainer}>
        {data.map((option, index) => {
          const AnimatedStyle = useAnimatedStyle(() => ({
            position: 'absolute',
            transform: [{ translateY: 0 }],
          }));
          return (
            <Animated.View style={[styles.optioncontainer, AnimatedStyle]} key={option.title}>
              <RectButton style={styles.optionbtn}>
                <Icon name={option.icon} size={wp(8)} color={Colors.white} />
              </RectButton>
              <Text>{option.title}</Text>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

export default AddOptions;

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  optionscontainer: {
    position: 'absolute',
    bottom: wp(32),
    right: wp(17),
  },
  optioncontainer: {
    gap: wp(2),
    width: wp(15),
  },
  optionbtn: {
    backgroundColor: Colors.matrixGreen,
    borderRadius: wp(2),
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
