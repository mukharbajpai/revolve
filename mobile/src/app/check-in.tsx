import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { BackHeader } from '@/components/back-header';
import { Body, Eyebrow, Heading, PrimaryButton, Screen } from '@/components/revolve-ui';
import { colors, typography } from '@/constants/revolve-theme';
import { useDemo } from '@/context/demo-context';

export default function CheckInScreen() {
  const { addCheckIn } = useDemo();
  const [pain, setPain] = useState(2);
  const [mobility, setMobility] = useState(80);
  const [strength, setStrength] = useState(65);
  const [note, setNote] = useState('');

  const save = () => {
    addCheckIn(pain, mobility, strength, note.trim());
    router.back();
  };

  return (
    <Screen keyboard>
      <BackHeader title="Progress check-in" />
      <View style={styles.intro}><Eyebrow>How are you today?</Eyebrow><Heading size="medium">A quick check-in</Heading><Body muted>Use your own best estimate. This demo is not a clinical assessment.</Body></View>
      <Stepper label="Pain" helper="0 = none · 10 = severe" value={pain} min={0} max={10} step={1} suffix="/10" onChange={setPain} />
      <Stepper label="Mobility" helper="How free does movement feel?" value={mobility} min={0} max={100} step={5} suffix="%" onChange={setMobility} />
      <Stepper label="Strength" helper="How capable do you feel?" value={strength} min={0} max={100} step={5} suffix="%" onChange={setStrength} />
      <View style={styles.noteBlock}>
        <Text style={styles.label}>OPTIONAL NOTE</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="What felt different today?"
          placeholderTextColor="#8C9691"
          multiline
          maxLength={180}
          textAlignVertical="top"
          style={styles.input}
        />
      </View>
      <PrimaryButton label="Save check-in" icon="check" onPress={save} />
    </Screen>
  );
}

function Stepper({ label, helper, value, min, max, step, suffix, onChange }: { label: string; helper: string; value: number; min: number; max: number; step: number; suffix: string; onChange: (value: number) => void }) {
  return (
    <View style={styles.stepper}>
      <View><Text style={styles.stepperLabel}>{label}</Text><Text style={styles.helper}>{helper}</Text></View>
      <View style={styles.controls}>
        <Text onPress={() => onChange(Math.max(min, value - step))} accessibilityRole="button" style={styles.control}>−</Text>
        <Text style={styles.value}>{value}{suffix}</Text>
        <Text onPress={() => onChange(Math.min(max, value + step))} accessibilityRole="button" style={styles.control}>+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { gap: 8 },
  stepper: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.line, borderRadius: 18, padding: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  stepperLabel: { color: colors.text, fontFamily: typography.medium, fontSize: 15 },
  helper: { color: colors.muted, fontFamily: typography.regular, fontSize: 10, marginTop: 4 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  control: { width: 34, height: 34, borderRadius: 11, backgroundColor: colors.greenSoft, color: colors.greenDark, textAlign: 'center', textAlignVertical: 'center', fontFamily: typography.medium, fontSize: 21, lineHeight: 32 },
  value: { minWidth: 46, textAlign: 'center', color: colors.text, fontFamily: typography.medium, fontSize: 17 },
  noteBlock: { gap: 9 },
  label: { color: colors.green, fontFamily: typography.medium, fontSize: 10, letterSpacing: 1.4 },
  input: { minHeight: 110, borderRadius: 17, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.line, padding: 15, color: colors.text, fontFamily: typography.regular, fontSize: 14, lineHeight: 21 },
});
