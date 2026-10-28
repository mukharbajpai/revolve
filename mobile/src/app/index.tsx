import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Redirect, router } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, typography } from '@/constants/revolve-theme';
import { useDemo } from '@/context/demo-context';
import { LoadingScreen, PrimaryButton, Wordmark } from '@/components/revolve-ui';

const stages = ['PHYSIO', 'REHAB', 'FUNCTION', 'PERFORM'];

export default function WelcomeScreen() {
  const { state, isReady, enterDemo } = useDemo();
  if (!isReady) return <LoadingScreen />;
  if (state.hasEntered) return <Redirect href="/(tabs)" />;

  const continueDemo = () => {
    enterDemo();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView
      style={styles.safe}
      edges={Platform.OS === 'web' ? [] : ['top', 'right', 'bottom', 'left']}>
      <View style={styles.top}>
        <Wordmark />
        <Pressable onPress={continueDemo} accessibilityRole="button" style={styles.demoPill}>
          <Text style={styles.demoText}>DEMO</Text>
        </Pressable>
      </View>

      <View style={styles.visual}>
        <View style={styles.orbitOuter}>
          <View style={styles.orbitMiddle}>
            <View style={styles.orbitInner}>
              <MaterialIcons name="directions-run" size={42} color={colors.green} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.copy}>
        <Text style={styles.title}>Recover. Train.{`\n`}Perform.</Text>
        <Text style={styles.subtitle}>One coordinated journey from injury to confident movement.</Text>
        <View style={styles.stageRow}>
          {stages.map((stage, index) => (
            <View key={stage} style={styles.stageItem}>
              <View style={[styles.stageDot, index === 1 && styles.stageDotActive]} />
              <Text style={[styles.stageText, index === 1 && styles.stageTextActive]}>{stage}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton label="Continue as Aarav" icon="arrow-forward" onPress={continueDemo} />
        <Text style={styles.note}>Local demonstration · no account or payment required</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, paddingHorizontal: 22, paddingVertical: 14, backgroundColor: colors.background },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  demoPill: { paddingHorizontal: 12, paddingVertical: 7, backgroundColor: colors.greenSoft, borderRadius: 20 },
  demoText: { color: colors.greenDark, fontFamily: typography.medium, fontSize: 10, letterSpacing: 1.4 },
  visual: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 245 },
  orbitOuter: { width: 230, height: 230, borderRadius: 115, borderWidth: 1, borderColor: colors.sage, alignItems: 'center', justifyContent: 'center' },
  orbitMiddle: { width: 166, height: 166, borderRadius: 83, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  orbitInner: { width: 94, height: 94, borderRadius: 47, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-8deg' }] },
  copy: { gap: 15 },
  title: { color: colors.text, fontFamily: typography.serif, fontSize: 42, lineHeight: 47, letterSpacing: -1.1 },
  subtitle: { maxWidth: 330, color: colors.muted, fontFamily: typography.regular, fontSize: 16, lineHeight: 24 },
  stageRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  stageItem: { flex: 1, alignItems: 'center', gap: 7 },
  stageDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.line },
  stageDotActive: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.green },
  stageText: { color: colors.muted, fontFamily: typography.medium, fontSize: 8, letterSpacing: 0.8 },
  stageTextActive: { color: colors.green },
  footer: { gap: 12, marginTop: 12 },
  note: { textAlign: 'center', color: colors.muted, fontFamily: typography.regular, fontSize: 11 },
});
