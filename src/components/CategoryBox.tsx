import { ArrowRight } from 'lucide-react-native';
import { memo } from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';

import { wp } from '~/utils/ResponsiveSize';

type CardColorKey = `card${1 | 2 | 3 | 4}`;

type CategoryBoxProps = {
  bgColor: 1 | 2 | 3 | 4; // Assuming these are the card colors
  title: string;
  totalCount: number;
  onPress: () => void;
};

const CategoryBox = ({ bgColor, title, totalCount, onPress }: CategoryBoxProps) => {
  return (
    <View style={styles.container(bgColor)}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.count}>{totalCount}</Text>
          <Text style={styles.label}>Items</Text>
        </View>

        <RectButton style={styles.iconButton} onPress={onPress}>
          <ArrowRight style={styles.arrowIcon} size={wp(5.5)} />
        </RectButton>
      </View>
    </View>
  );
};

export default memo(CategoryBox);

const styles = StyleSheet.create((theme) => ({
  container: (bg) => ({
    width: wp(44),
    height: wp(38),
    backgroundColor: theme.colors[`card${bg}` as CardColorKey],
    borderRadius: wp(4),
    padding: wp(4),
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  }),
  title: {
    color: theme.colors.typography,
    fontSize: wp(4.2),
    fontWeight: '600',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  count: {
    color: theme.colors.typography,
    fontSize: wp(7),
    fontWeight: '700',
  },
  label: {
    color: theme.colors.secondary,
    fontSize: wp(3.2),
    marginTop: -wp(1),
  },
  iconButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: wp(2),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    color: theme.colors.secondary,
  },
}));
