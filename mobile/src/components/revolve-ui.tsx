import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PropsWithChildren, ReactNode } from 'react';
import {
  ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleProp,
  StyleSheet, Text, View, ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, shadows, typography } from '@/constants/revolve-theme';

export function Screen({ children, scroll = true, keyboard = false, contentStyle }: PropsWithChildren<{
  scroll?: boolean;
  keyboard?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}>) {
  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.screenContent, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : <View style={[styles.screenContent, styles.flex, contentStyle]}>{children}</View>;

  return (
    <SafeAreaView style={styles.safe} edges={Platform.OS === 'web' ? [] : ['top', 'left', 'right']}>
      {keyboard ? (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {content}
        </KeyboardAvoidingView>
      ) : content}
    </SafeAreaView>
  );
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <View style={styles.wordmarkRow}>
      <View style={[styles.mark, light && styles.markLight]}><View style={[styles.markInner, light && styles.markInnerLight]} /></View>
      <Text style={[styles.wordmark, light && styles.lightText]}>REVOLVE</Text>
    </View>
  );
}

export function Eyebrow({ children, light = false }: PropsWithChildren<{ light?: boolean }>) {
  return <Text style={[styles.eyebrow, light && styles.eyebrowLight]}>{children}</Text>;
}

export function Heading({ children, size = 'large', light = false }: PropsWithChildren<{ size?: 'large' | 'medium'; light?: boolean }>) {
  return <Text style={[styles.heading, size === 'medium' && styles.headingMedium, light && styles.lightText]}>{children}</Text>;
}

export function Body({ children, muted = false, light = false, style }: PropsWithChildren<{ muted?: boolean; light?: boolean; style?: StyleProp<ViewStyle> }>) {
  return <Text style={[styles.body, muted && styles.mutedText, light && styles.bodyLight, style as never]}>{children}</Text>;
}

export function Card({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PrimaryButton({ label, onPress, icon, disabled = false, tone = 'green' }: {
  label: string;
  onPress: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  disabled?: boolean;
  tone?: 'green' | 'light' | 'danger';
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        tone === 'light' && styles.buttonLight,
        tone === 'danger' && styles.buttonDanger,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.buttonText, tone === 'light' && styles.buttonLightText]}>{label}</Text>
      {icon ? <MaterialIcons name={icon} size={19} color={tone === 'light' ? colors.greenDark : '#FFFFFF'} /> : null}
    </Pressable>
  );
}

export function TextButton({ label, onPress, danger = false, icon }: {
  label: string;
  onPress: () => void;
  danger?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.textButton, pressed && styles.pressed]}>
      <Text style={[styles.textButtonLabel, danger && styles.dangerText]}>{label}</Text>
      {icon ? <MaterialIcons name={icon} size={18} color={danger ? colors.danger : colors.green} /> : null}
    </Pressable>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return <View style={styles.sectionRow}><Text style={styles.sectionTitle}>{title}</Text>{action}</View>;
}

export function ProgressBar({ value, color = colors.green }: { value: number; color?: string }) {
  return <View style={styles.track}><View style={[styles.fill, { width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }]} /></View>;
}

export function Metric({ label, value, suffix = '', start }: { label: string; value: number; suffix?: string; start?: number }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <View style={styles.metricValueRow}>
        {start !== undefined ? <Text style={styles.metricStart}>{start}</Text> : null}
        {start !== undefined ? <MaterialIcons name="arrow-forward" size={14} color={colors.muted} /> : null}
        <Text style={styles.metricValue}>{value}{suffix}</Text>
      </View>
    </View>
  );
}

export function LoadingScreen() {
  return <View style={styles.loading}><ActivityIndicator color={colors.green} /></View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  screenContent: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 36, gap: 18 },
  wordmarkRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mark: { width: 25, height: 25, borderRadius: 13, borderWidth: 2, borderColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  markLight: { borderColor: '#FFFFFF' },
  markInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.green },
  markInnerLight: { backgroundColor: '#FFFFFF' },
  wordmark: { color: colors.text, fontFamily: typography.medium, fontSize: 14, letterSpacing: 3.1 },
  lightText: { color: '#FFFFFF' },
  eyebrow: { color: colors.green, fontFamily: typography.medium, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase' },
  eyebrowLight: { color: '#CFE0D7' },
  heading: { color: colors.text, fontFamily: typography.serif, fontSize: 36, lineHeight: 43, letterSpacing: -0.7 },
  headingMedium: { fontSize: 27, lineHeight: 33, letterSpacing: -0.35 },
  body: { color: colors.text, fontFamily: typography.regular, fontSize: 15, lineHeight: 23 },
  mutedText: { color: colors.muted },
  bodyLight: { color: '#E8F0EC' },
  card: { backgroundColor: colors.surface, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#E9ECE9', ...shadows.card },
  button: { minHeight: 54, borderRadius: 16, paddingHorizontal: 20, backgroundColor: colors.green, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  buttonLight: { backgroundColor: '#FFFFFF' },
  buttonDanger: { backgroundColor: colors.danger },
  buttonText: { color: '#FFFFFF', fontFamily: typography.medium, fontSize: 15 },
  buttonLightText: { color: colors.greenDark },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.45 },
  textButton: { minHeight: 42, flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'center', paddingHorizontal: 8 },
  textButtonLabel: { color: colors.green, fontFamily: typography.medium, fontSize: 14 },
  dangerText: { color: colors.danger },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 4 },
  sectionTitle: { color: colors.text, fontFamily: typography.medium, fontSize: 18, letterSpacing: -0.2 },
  track: { height: 8, borderRadius: 4, backgroundColor: colors.greenSoft, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
  metric: { flex: 1, gap: 7 },
  metricLabel: { color: colors.muted, fontFamily: typography.regular, fontSize: 12 },
  metricValueRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metricStart: { color: colors.muted, fontSize: 13, textDecorationLine: 'line-through' },
  metricValue: { color: colors.text, fontFamily: typography.medium, fontSize: 18 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
});
