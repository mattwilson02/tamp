import { Ionicons } from '@expo/vector-icons';
import type { Drink, DrinkCategory } from '@tamp/types';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DifficultyBadge } from '../../components/ui/Badge';
import { Text } from '../../components/ui/Text';
import { Colors, FontFamily, FontSize, Radius, Shadow, Spacing } from '../../constants/tokens';
import { useDrinks } from '../../lib/queries/drinks';

// ─── Category config ──────────────────────────────────────────────────────────

type FilterCategory = 'all' | DrinkCategory;

const FILTERS: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'espresso', label: 'Espresso' },
  { key: 'milk', label: 'Milk' },
  { key: 'cold', label: 'Cold' },
  { key: 'filter', label: 'Filter' },
];

const CATEGORY_CONFIG: Record<
  DrinkCategory,
  { bg: string; iconColor: string; icon: React.ComponentProps<typeof Ionicons>['name'] }
> = {
  espresso: { bg: '#2C1508', iconColor: '#C8956C', icon: 'cafe' },
  milk: { bg: '#4A2E18', iconColor: '#EDE0C8', icon: 'cafe-outline' },
  filter: { bg: '#3D2810', iconColor: '#D4A96A', icon: 'water-outline' },
  cold: { bg: '#1A2E35', iconColor: '#7BBFCF', icon: 'snow-outline' },
};

const CARD_GAP = Spacing.sm;
const CARD_PADDING = Spacing.base;

// ─── Drink card ───────────────────────────────────────────────────────────────

function DrinkCard({ drink, width }: { drink: Drink; width: number }) {
  const router = useRouter();
  const config = CATEGORY_CONFIG[drink.category as DrinkCategory] ?? CATEGORY_CONFIG.espresso;

  return (
    <Pressable style={[styles.card, { width }]} onPress={() => router.push(`/drink/${drink.slug}`)}>
      <View style={[styles.cardHeader, { backgroundColor: config.bg }]}>
        <Ionicons name={config.icon} size={36} color={config.iconColor} />
        {drink.hasInteractiveWorkflow && (
          <View style={styles.interactivePip}>
            <Text style={styles.interactivePipText}>✦</Text>
          </View>
        )}
      </View>
      <View style={styles.cardBody}>
        <Text variant="title" style={styles.cardName} numberOfLines={1}>
          {drink.name}
        </Text>
        <Text variant="caption" color="secondary" style={styles.cardDesc} numberOfLines={2}>
          {drink.description}
        </Text>
        <View style={styles.cardFooter}>
          <DifficultyBadge rank={drink.difficultyRank} />
        </View>
      </View>
    </Pressable>
  );
}

// ─── Filter chip ──────────────────────────────────────────────────────────────

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, { color: active ? Colors.background : Colors.textSecondary }]}>
        {label}
      </Text>
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ExploreScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const category = activeFilter === 'all' ? undefined : activeFilter;
  const { data: drinks, isLoading, isError } = useDrinks(category);

  const cardWidth = (width - CARD_PADDING * 2 - CARD_GAP) / 2;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text variant="heading">The Craft</Text>
        <Text variant="caption" color="secondary">
          {drinks ? `${drinks.length} drinks to master` : 'Loading…'}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContent}
        style={styles.filters}
      >
        {FILTERS.map((f) => (
          <FilterChip
            key={f.key}
            label={f.label}
            active={activeFilter === f.key}
            onPress={() => setActiveFilter(f.key)}
          />
        ))}
      </ScrollView>

      {isLoading && (
        <View style={styles.centered}>
          <ActivityIndicator color={Colors.crema} />
        </View>
      )}

      {isError && (
        <View style={styles.centered}>
          <Text variant="caption" color="secondary">
            Could not load drinks. Is the API running?
          </Text>
        </View>
      )}

      {!isLoading && !isError && (
        <FlatList
          data={drinks ?? []}
          keyExtractor={(item) => item.slug}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + 100 }]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <DrinkCard drink={item} width={cardWidth} />}
        />
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: CARD_PADDING,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: 2,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filters: {
    flexGrow: 0,
    marginBottom: Spacing.base,
  },
  filtersContent: {
    paddingHorizontal: CARD_PADDING,
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.milk,
  },
  chipActive: {
    backgroundColor: Colors.espresso,
    borderColor: Colors.espresso,
  },
  chipText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
  },
  row: {
    gap: CARD_GAP,
    paddingHorizontal: CARD_PADDING,
  },
  grid: {
    gap: CARD_GAP,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  cardHeader: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interactivePip: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.crema,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interactivePipText: {
    fontSize: 9,
    color: Colors.espresso,
    fontFamily: FontFamily.monoMedium,
  },
  cardBody: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  cardName: {
    fontSize: FontSize.base,
  },
  cardDesc: {
    lineHeight: FontSize.sm * 1.4,
  },
  cardFooter: {
    marginTop: Spacing.xs,
  },
});
