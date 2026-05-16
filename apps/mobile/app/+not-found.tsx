import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, FontFamily, FontSize, Spacing } from '../constants/tokens';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Screen not found</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['2xl'],
  },
  title: {
    fontFamily: FontFamily.display,
    fontSize: FontSize.xl,
    color: Colors.espresso,
    marginBottom: Spacing.base,
  },
  link: {
    marginTop: Spacing.md,
  },
  linkText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.crema,
  },
});
