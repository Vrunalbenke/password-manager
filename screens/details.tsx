import { RouteProp, useRoute } from '@react-navigation/native';
import { ScreenContent } from 'components/ScreenContent';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { RootStackParamList } from '../navigation';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function Details() {
  const router = useRoute<DetailsScreenRouteProp>();

  return (
    <View style={styles.container}>
      <ScreenContent
        path="screens/details.tsx"
        title={`Showing details for user ${router.params.name}`}
      />
    </View>
  );
}

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: theme.colors.background,
    paddingBottom: rt.insets.bottom,
  },
}));
