import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Body, Card, Eyebrow, Heading, Metric, PrimaryButton, ProgressBar, Screen, SectionTitle } from '@/components/revolve-ui';
import { colors, typography } from '@/constants/revolve-theme';
import { useDemo } from '@/context/demo-context';

export default function ProgressScreen() {
  const { state, toggleActivity } = useDemo();
  const latest = state.checkIns[0];
  const completed = state.activities.filter((activity) => activity.completed).length;

  return (
    <Screen>
      <View style={styles.intro}>
        <Eyebrow>Small steps, measured</Eyebrow>
        <Heading>Your progress</Heading>
        <Body muted>Track how you feel and keep your assigned work visible.</Body>
      </View>

      <Card style={styles.snapshot}>
        <View style={styles.snapshotHeader}><Text style={styles.cardTitle}>Latest check-in</Text><Text style={styles.date}>{latest.date}</Text></View>
        <View style={styles.metrics}>
          <Metric label="Pain" value={latest.pain} suffix="/10" />
          <Metric label="Mobility" value={latest.mobility} suffix="%" />
          <Metric label="Strength" value={latest.strength} suffix="%" />
        </View>
        <View style={styles.note}><MaterialIcons name="format-quote" size={18} color={colors.green} /><Text style={styles.noteText}>{latest.note || 'No note added.'}</Text></View>
      </Card>

      <PrimaryButton label="Add a check-in" icon="add-chart" onPress={() => router.push('/check-in')} />

      <SectionTitle title="Assigned activities" />
      <Card style={styles.activitiesCard}>
        <View style={styles.activitySummary}>
          <Text style={styles.summaryText}>{completed} of {state.activities.length} complete</Text>
          <View style={styles.summaryBar}><ProgressBar value={(completed / state.activities.length) * 100} /></View>
        </View>
        {state.activities.map((activity) => (
          <Pressable
            key={activity.id}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: activity.completed }}
            onPress={() => toggleActivity(activity.id)}
            style={({ pressed }) => [styles.activity, pressed && styles.pressed]}
          >
            <View style={[styles.checkbox, activity.completed && styles.checkboxDone]}>
              {activity.completed ? <MaterialIcons name="check" size={17} color="#FFFFFF" /> : null}
            </View>
            <View style={styles.activityCopy}>
              <Text style={[styles.activityTitle, activity.completed && styles.completedText]}>{activity.title}</Text>
              <Text style={styles.activityDetail}>{activity.detail}</Text>
            </View>
          </Pressable>
        ))}
        <View style={styles.clearanceNote}><MaterialIcons name="verified-user" size={17} color={colors.green} /><Text style={styles.clearanceText}>Activity completion does not change your stage. Only your care team can clear progression.</Text></View>
      </Card>

      <SectionTitle title="Recent check-ins" />
      {state.checkIns.slice(0, 4).map((checkIn) => (
        <Card key={checkIn.id} style={styles.historyRow}>
          <View><Text style={styles.historyDate}>{checkIn.date}</Text><Text style={styles.historyNote} numberOfLines={1}>{checkIn.note || 'No note'}</Text></View>
          <Text style={styles.historyMetric}>Pain {checkIn.pain}/10</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { gap: 8 },
  snapshot: { gap: 17 },
  snapshotHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { color: colors.text, fontFamily: typography.medium, fontSize: 17 },
  date: { color: colors.muted, fontFamily: typography.medium, fontSize: 11 },
  metrics: { flexDirection: 'row', gap: 15 },
  note: { flexDirection: 'row', gap: 8, backgroundColor: colors.background, padding: 12, borderRadius: 12 },
  noteText: { flex: 1, color: colors.muted, fontFamily: typography.regular, fontSize: 12, lineHeight: 18 },
  activitiesCard: { paddingVertical: 8 },
  activitySummary: { flexDirection: 'row', alignItems: 'center', padding: 10, gap: 15 },
  summaryText: { color: colors.text, fontFamily: typography.medium, fontSize: 12 },
  summaryBar: { flex: 1 },
  activity: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 14, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: colors.line },
  checkbox: { width: 25, height: 25, borderRadius: 8, borderWidth: 1.5, borderColor: colors.sage, alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { backgroundColor: colors.green, borderColor: colors.green },
  activityCopy: { flex: 1, gap: 3 },
  activityTitle: { color: colors.text, fontFamily: typography.medium, fontSize: 14 },
  activityDetail: { color: colors.muted, fontFamily: typography.regular, fontSize: 11 },
  completedText: { color: colors.muted, textDecorationLine: 'line-through' },
  pressed: { opacity: 0.65 },
  clearanceNote: { flexDirection: 'row', gap: 9, margin: 8, padding: 12, backgroundColor: colors.greenSoft, borderRadius: 12 },
  clearanceText: { flex: 1, color: colors.greenDark, fontFamily: typography.regular, fontSize: 11, lineHeight: 17 },
  historyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  historyDate: { color: colors.text, fontFamily: typography.medium, fontSize: 13 },
  historyNote: { color: colors.muted, fontFamily: typography.regular, fontSize: 11, marginTop: 3, maxWidth: 210 },
  historyMetric: { color: colors.green, fontFamily: typography.medium, fontSize: 12 },
});
