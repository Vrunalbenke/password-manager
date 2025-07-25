import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';

const UniFeather = withUnistyles(Feather, (theme) => ({
  color: theme.colors.azureRadiance,
}));

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.backButton}>
      <UniFeather name="chevron-left" size={16} />
      <Text style={styles.backButtonText} onPress={onPress}>
        Back
      </Text>
    </View>
  );
};
const styles = StyleSheet.create((theme) => ({
  backButton: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  backButtonText: {
    color: theme.colors.azureRadiance,
    marginLeft: 4,
  },
}));
