import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Colors, Spacing } from '../../constants/tokens';

export default function DrinkDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: insets.top + Spacing.lg,
        paddingHorizontal: Spacing.base,
      }}
    >
      <Text variant="heading">{slug}</Text>
      <Text variant="body" color="secondary">
        Drink detail coming soon.
      </Text>
    </View>
  );
}
