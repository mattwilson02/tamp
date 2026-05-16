import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontFamily, FontSize, Spacing } from '../../constants/tokens';

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>tamp</Text>
      </View>
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Your feed will appear here</Text>
        <Text style={styles.emptySubtext}>Follow other baristas to see their attempts</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.milk,
  },
  wordmark: {
    fontFamily: FontFamily.display,
    fontSize: FontSize['2xl'],
    color: Colors.espresso,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['2xl'],
  },
  emptyText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
