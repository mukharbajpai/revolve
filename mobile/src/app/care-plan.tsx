import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from 'react-native';

import { BackHeader } from '@/components/back-header';
import { Body, Card, Eyebrow, Heading, PrimaryButton, ProgressBar, Screen, SectionTitle } from '@/components/revolve-ui';
import { colors, typography } from '@/constants/revolve-theme';
import { useDemo } from '@/context/demo-context';

export default function CarePlanScreen() {
  const { state, applyDemoCareUpdate } = useDemo();
  const plan = state.carePlan;

  return (
    <Screen>
      <BackHeader title="Integrated Care Plan" />
      <View style={styles.intro}><Eyebrow>One coordinated plan</Eyebrow><Heading size="medium">Return to running</Heading><Body muted>Shared guidance for Aarav’s recovery-to-performance journey.</Body></View>

      <Card style={styles.hero}>
        <View style={styles.heroTop}><View><Text style={styles.heroLabel}>CURRENT STAGE</Text><Text style={styles.heroStage}>{plan.currentStage}</Text></View><Text style={styles.heroPercent}>{plan.programmeCompletion}%</Text></View>
        <ProgressBar value={plan.programmeCompletion} color="#D9E7E0" />
        <Text style={styles.heroNote}>Programme completion · not a measure of clinical recovery</Text>
      </Card>

      <PlanField icon="flag" label="Goal" value={plan.goal} />
      <PlanField icon="medical-services" label="Physio recommendation" value={plan.physioRecommendation} />
      <PlanField icon="fitness-center" label="Trainer recommendation" value={plan.trainerRecommendation} />
      <PlanField icon="do-not-disturb-on" label="Current restrictions" value={plan.restrictions} warning />
      <PlanField icon="outlined-flag" label="Next milestone" value={plan.nextMilestone} />

      <Card style={styles.demoCard}>
        <View style={styles.demoHeader}><View style={styles.demoBadge}><Text style={styles.demoBadgeText}>DEMO SCENARIO</Text></View><MaterialIcons name="science" size={20} color={colors.warning} /></View>
        <Text style={styles.demoTitle}>Preview a care-team update</Text>
        <Body muted>This applies illustrative guidance locally on this device. It does not imply an update from the staff dashboard or another device.</Body>
        <PrimaryButton label={plan.demoUpdateApplied ? 'Scenario applied' : 'Apply sample update'} icon={plan.demoUpdateApplied ? 'check' : 'auto-fix-high'} disabled={plan.demoUpdateApplied} onPress={applyDemoCareUpdate} />
      </Card>

      <SectionTitle title="Update history" />
      <View style={styles.history}>
        {plan.updates.map((update, index) => (
          <View key={update.id} style={styles.historyRow}>
            <View style={styles.historyRail}><View style={[styles.historyDot, update.isDemo && styles.historyDotDemo]} />{index < plan.updates.length - 1 ? <View style={styles.historyLine} /> : null}</View>
            <View style={styles.historyCopy}>
              <Text style={[styles.historyDate, update.isDemo && styles.demoHistoryText]}>{update.date}</Text>
              <Text style={styles.historyAuthor}>{update.author}</Text>
              <Text style={styles.historySummary}>{update.summary}</Text>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

function PlanField({ icon, label, value, warning = false }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string; warning?: boolean }) {
  return (
    <Card style={[styles.field, warning && styles.warningField]}>
      <View style={[styles.fieldIcon, warning && styles.warningIcon]}><MaterialIcons name={icon} size={19} color={warning ? colors.warning : colors.green} /></View>
      <View style={styles.fieldCopy}><Text style={styles.fieldLabel}>{label}</Text><Text style={styles.fieldValue}>{value}</Text></View>
    </Card>
  );
}

const styles = StyleSheet.create({
  intro: { gap: 8 },
  hero: { backgroundColor: colors.greenDark, borderColor: colors.greenDark, gap: 12 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  heroLabel: { color: '#BFD3C8', fontFamily: typography.medium, fontSize: 9, letterSpacing: 1.2 },
  heroStage: { color: '#FFFFFF', fontFamily: typography.serif, fontSize: 24, marginTop: 5 },
  heroPercent: { color: '#FFFFFF', fontFamily: typography.medium, fontSize: 25 },
  heroNote: { color: '#CFDED6', fontFamily: typography.regular, fontSize: 10 },
  field: { flexDirection: 'row', gap: 13, alignItems: 'flex-start', paddingVertical: 16 },
  warningField: { backgroundColor: colors.warningSoft, borderColor: '#EAD7BE' },
  fieldIcon: { width: 39, height: 39, borderRadius: 13, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  warningIcon: { backgroundColor: '#FFFFFF' },
  fieldCopy: { flex: 1, gap: 5 },
  fieldLabel: { color: colors.green, fontFamily: typography.medium, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 },
  fieldValue: { color: colors.text, fontFamily: typography.regular, fontSize: 14, lineHeight: 21 },
  demoCard: { gap: 12, borderStyle: 'dashed', borderColor: '#D7B98F' },
  demoHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  demoBadge: { backgroundColor: colors.warningSoft, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  demoBadgeText: { color: colors.warning, fontFamily: typography.medium, fontSize: 9, letterSpacing: 1 },
  demoTitle: { color: colors.text, fontFamily: typography.medium, fontSize: 16 },
  history: { gap: 0 },
  historyRow: { flexDirection: 'row', gap: 13, minHeight: 105 },
  historyRail: { width: 15, alignItems: 'center' },
  historyDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: colors.green, marginTop: 4 },
  historyDotDemo: { backgroundColor: colors.warning },
  historyLine: { flex: 1, width: 1, backgroundColor: colors.line },
  historyCopy: { flex: 1, gap: 4, paddingBottom: 18 },
  historyDate: { color: colors.green, fontFamily: typography.medium, fontSize: 10, letterSpacing: 0.5 },
  demoHistoryText: { color: colors.warning },
  historyAuthor: { color: colors.text, fontFamily: typography.medium, fontSize: 13 },
  historySummary: { color: colors.muted, fontFamily: typography.regular, fontSize: 12, lineHeight: 18 },
});
