import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Button, RankBadge, Text, XpBar } from '../../components/ui';
import { Colors, Spacing } from '../../constants/tokens';

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="heading" color="espresso">
          tamp
        </Text>
      </View>

      <View style={styles.empty}>
        <Avatar displayName="Matt" rank={1} size="xl" />
        <View style={styles.rankRow}>
          <RankBadge rank={1} />
        </View>
        <XpBar xp={340} rank={1} />
        <Text variant="caption" color="secondary" style={styles.xpLabel}>
          340 / 600 XP
        </Text>
        <View style={styles.buttonRow}>
          <Button label="Log attempt" size="lg" />
          <Button label="Explore drinks" variant="secondary" size="lg" />
        </View>
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
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['2xl'],
    gap: Spacing.base,
  },
  rankRow: {
    marginTop: Spacing.sm,
  },
  xpLabel: {
    marginTop: -Spacing.xs,
  },
  buttonRow: {
    width: '100%',
    gap: Spacing.sm,
    marginTop: Spacing.base,
  },
});
