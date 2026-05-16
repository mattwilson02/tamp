import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, Pressable, type PressableProps, StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '../../constants/tokens';

type TabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
};

function TabIcon({ name, focused }: TabIconProps) {
  return <Ionicons name={name} size={24} color={focused ? Colors.crema : Colors.textSecondary} />;
}

function LogTabButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: PressableProps['onPress'];
}) {
  return (
    <Pressable onPress={onPress} style={styles.logButton}>
      <View style={styles.logButtonInner}>{children}</View>
    </Pressable>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.crema,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'grid' : 'grid-outline'} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="camera" size={26} color={Colors.background} />
          ),
          tabBarButton: (props) => <LogTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background,
    borderTopColor: Colors.milk,
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 88 : 64,
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  logButton: {
    top: -16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.espresso,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.espresso,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
