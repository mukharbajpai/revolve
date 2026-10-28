import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '@/constants/revolve-theme';

export function BackHeader({ title }: { title: string }) {
  return (
    <View style={styles.row}>
      <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
        <MaterialIcons name="arrow-back" size={21} color={colors.text} />
      </Pressable>
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  back: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.line },
  title: { flex: 1, textAlign: 'center', color: colors.text, fontFamily: typography.medium, fontSize: 15 },
  spacer: { width: 42 },
  pressed: { opacity: 0.65 },
});
