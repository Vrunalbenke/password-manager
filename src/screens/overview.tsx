import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenContent } from '~/components/ScreenContent';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '../components/Button';
import { RootStackParamList } from '../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return <View style={styles.container}></View>;
}

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: theme.colors.background,
    // paddingBottom: rt.insets.bottom,
  },
}));
