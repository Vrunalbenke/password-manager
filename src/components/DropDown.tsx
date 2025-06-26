import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Image, LayoutAnimation, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';

import { wp } from '~/utils/ResponsiveSize';

const DropDown = ({ title, data }) => {
  const [toggle, setToggle] = React.useState(false);

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  return (
    <View style={styles.container}>
      <View style={styles.ddTop}>
        <Text style={styles.ddTitle}>{title}</Text>
        <RectButton onPress={() => setToggle(!toggle)}>
          <ChevronRight color={UnistylesRuntime.getTheme().colors.secondary} size={wp(6)} />
        </RectButton>
      </View>
      {toggle && (
        <View style={styles.ddBody}>
          {data.map((item, index) => (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: wp(2) }}
              key={item.username + index.toString()}>
              <Image
                source={{
                  uri: item.img,
                }}
                style={{
                  width: wp(8),
                  height: wp(8),
                  borderRadius: wp(1),
                  backgroundColor: 'black',
                }}
                resizeMode="contain"
              />
              <Text
                style={{ fontSize: wp(4), color: UnistylesRuntime.getTheme().colors.typography }}>
                {item.username}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: wp(2),
    borderRadius: wp(2),
    width: wp(90),
  },
  ddTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ddTitle: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: theme.colors.typography,
  },
  ddBody: {
    gap: wp(3),
    paddingHorizontal: wp(2),
    paddingVertical: wp(4),
  },
}));
