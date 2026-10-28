import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { Body, Card, Eyebrow, Heading, Metric, PrimaryButton, ProgressBar, Screen, SectionTitle, TextButton, Wordmark } from '@/components/revolve-ui';
import { colors, typography } from '@/constants/revolve-theme';
import { useDemo } from '@/context/demo-context';

export default function HomeScreen() {
  const { state, resetDemo } = useDemo();
  const nextAppointment = state.appointments.find((appointment) => appointment.status === 'Confirmed');
  const { carePlan } = state;

  const confirmReset = () => Alert.alert('Reset demo?', 'This restores all mobile demo bookings, activities and check-ins.', [
    { text: 'Keep demo', style: 'cancel' },
    { text: 'Reset', style: 'destructive', onPress: async () => { await resetDemo(); router.replace('/'); } },
  ]);

  return (
    <Screen>
      <View style={styles.header}>
        <Wordmark />
        <Pressable accessibilityRole="button" accessibilityLabel="Reset demo" onPress={confirmReset} style={styles.profile}>
          <Text style={styles.initials}>AM</Text>
        </Pressable>
      </View>

      <View style={styles.greeting}>
        <Eyebrow>Tuesday · 27 October</Eyebrow>
        <Heading>Good morning,{`\n`}Aarav.</Heading>
        <Body muted>Your plan is moving steadily.</Body>
      </View>

      <Card style={styles.stageCard}>
        <View style={styles.stageTop}>
          <View style={styles.stageCopy}>
            <Eyebrow light>Current stage</Eyebrow>
            <Text style={styles.stageTitle}>{carePlan.currentStage}</Text>
          </View>
          <View style={styles.percentCircle}><Text style={styles.percent}>{carePlan.programmeCompletion}%</Text></View>
        </View>
        <Body light>Programme completion · not a clinical recovery score</Body>
        <ProgressBar value={carePlan.programmeCompletion} color="#D6E5DD" />
        <Pressable onPress={() => router.push('/care-plan')} style={styles.careLink} accessibilityRole="button">
          <Text style={styles.careLinkText}>View integrated care plan</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>
      </Card>

      <SectionTitle title="Next session" action={<TextButton label="Book" icon="add" onPress={() => router.push('/booking')} />} />
      {nextAppointment ? (
        <Pressable onPress={() => router.push(`/appointment/${nextAppointment.id}`)} accessibilityRole="button">
          <Card style={styles.appointment}>
            <View style={styles.dateBlock}><Text style={styles.dateDay}>{nextAppointment.dateLabel.split(', ')[1]?.split(' ')[0]}</Text><Text style={styles.dateMonth}>OCT</Text></View>
            <View style={styles.appointmentCopy}>
              <Text style={styles.appointmentTitle}>{nextAppointment.serviceName}</Text>
              <Text style={styles.appointmentMeta}>{nextAppointment.time} · {nextAppointment.professional}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={colors.green} />
          </Card>
        </Pressable>
      ) : <Card><Body muted>No confirmed sessions. Choose a service when you are ready.</Body></Card>}

      <SectionTitle title="Your progress" action={<TextButton label="Details" onPress={() => router.push('/(tabs)/progress')} />} />
      <Card>
        <View style={styles.metrics}>
          <Metric label="Pain" start={6} value={2} suffix="/10" />
          <Metric label="Mobility" start={58} value={81} suffix="%" />
          <Metric label="Strength" start={42} value={68} suffix="%" />
        </View>
      </Card>

      <PrimaryButton label="Book a session" icon="calendar-month" onPress={() => router.push('/booking')} />
      {Platform.OS === 'web' ? (
        <Card style={styles.installCard}>
          <View style={styles.installIcon}><MaterialIcons name="phone-iphone" size={20} color={colors.green} /></View>
          <View style={styles.installCopy}>
            <Text style={styles.installTitle}>Install on iPhone</Text>
            <Text style={styles.installText}>Open this customer site in Safari, tap Share, then choose Add to Home Screen.</Text>
          </View>
        </Card>
      ) : null}
      <TextButton label="Reset Demo" onPress={confirmReset} danger />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  profile: { width: 39, height: 39, borderRadius: 20, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  initials: { color: colors.greenDark, fontFamily: typography.medium, fontSize: 12 },
  greeting: { gap: 7, marginBottom: 2 },
  stageCard: { backgroundColor: colors.greenDark, borderColor: colors.greenDark, gap: 13, padding: 20 },
  stageTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stageCopy: { gap: 5 },
  stageTitle: { color: '#FFFFFF', fontFamily: typography.serif, fontSize: 27 },
  percentCircle: { width: 64, height: 64, borderRadius: 32, borderWidth: 5, borderColor: '#7FA28F', alignItems: 'center', justifyContent: 'center' },
  percent: { color: '#FFFFFF', fontFamily: typography.medium, fontSize: 15 },
  careLink: { minHeight: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 },
  careLinkText: { color: '#FFFFFF', fontFamily: typography.medium, fontSize: 14 },
  appointment: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  dateBlock: { width: 49, height: 55, borderRadius: 14, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  dateDay: { color: colors.greenDark, fontFamily: typography.medium, fontSize: 19 },
  dateMonth: { color: colors.green, fontFamily: typography.medium, fontSize: 9, letterSpacing: 1 },
  appointmentCopy: { flex: 1, gap: 5 },
  appointmentTitle: { color: colors.text, fontFamily: typography.medium, fontSize: 15 },
  appointmentMeta: { color: colors.muted, fontFamily: typography.regular, fontSize: 12 },
  metrics: { flexDirection: 'row', gap: 15 },
  installCard: { flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: colors.greenSoft, borderColor: colors.sage },
  installIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  installCopy: { flex: 1, gap: 3 },
  installTitle: { color: colors.text, fontFamily: typography.medium, fontSize: 13 },
  installText: { color: colors.muted, fontFamily: typography.regular, fontSize: 11, lineHeight: 16 },
});
