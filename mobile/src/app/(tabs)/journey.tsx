import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Body, Card, Eyebrow, Heading, PrimaryButton, ProgressBar, Screen, SectionTitle } from '@/components/revolve-ui';
import { colors, typography } from '@/constants/revolve-theme';
import { useDemo } from '@/context/demo-context';
import { journeyStages } from '@/data/demo';

export default function JourneyScreen() {
  const { state } = useDemo();
  const { carePlan } = state;

  return (
    <Screen>
      <View style={styles.intro}>
        <Eyebrow>Your pathway</Eyebrow>
        <Heading>My Journey</Heading>
        <Body muted>A professional clears every stage. Completing activities never advances your stage automatically.</Body>
      </View>

      <Card style={styles.progressCard}>
        <View style={styles.progressTop}>
          <View style={styles.progressCopy}><Text style={styles.stage}>{carePlan.currentStage}</Text><Text style={styles.caption}>CURRENT STAGE</Text></View>
          <Text style={styles.bigPercent}>{carePlan.programmeCompletion}%</Text>
        </View>
        <ProgressBar value={carePlan.programmeCompletion} />
        <Text style={styles.disclaimer}>Programme completion — not clinical recovery</Text>
      </Card>

      <SectionTitle title="Recovery pathway" />
      <View style={styles.timeline}>
        {journeyStages.map((stage, index) => {
          const isPast = index === 0;
          const isCurrent = stage === carePlan.currentStage;
          const isFuture = index > 1;
          return (
            <View key={stage} style={styles.timelineRow}>
              <View style={styles.rail}>
                <View style={[styles.node, isPast && styles.nodeDone, isCurrent && styles.nodeCurrent]}>
                  {isPast ? <MaterialIcons name="check" size={15} color="#FFFFFF" /> : isFuture ? <MaterialIcons name="lock-outline" size={14} color={colors.muted} /> : null}
                </View>
                {index < journeyStages.length - 1 ? <View style={[styles.line, isPast && styles.lineDone]} /> : null}
              </View>
              <View style={styles.timelineCopy}>
                <Text style={[styles.timelineTitle, isFuture && styles.futureText]}>{stage}</Text>
                <Text style={styles.timelineStatus}>{isPast ? 'Clinical phase completed' : isCurrent ? 'In progress · professional review required' : 'Locked until professional clearance'}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <Card style={styles.milestoneCard}>
        <View style={styles.milestoneIcon}><MaterialIcons name="flag" size={21} color={colors.green} /></View>
        <View style={styles.milestoneCopy}><Text style={styles.caption}>NEXT MILESTONE</Text><Text style={styles.milestone}>{carePlan.nextMilestone}</Text><Text style={styles.milestoneMeta}>Review with Dr. Maya · 5 Nov</Text></View>
      </Card>

      <PrimaryButton label="Open integrated care plan" icon="assignment" onPress={() => router.push('/care-plan')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { gap: 8 },
  progressCard: { gap: 12 },
  progressTop: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  progressCopy: { gap: 4 },
  stage: { color: colors.text, fontFamily: typography.serif, fontSize: 24 },
  caption: { color: colors.green, fontFamily: typography.medium, fontSize: 9, letterSpacing: 1.3 },
  bigPercent: { color: colors.green, fontFamily: typography.medium, fontSize: 27 },
  disclaimer: { color: colors.muted, fontFamily: typography.regular, fontSize: 11 },
  timeline: { gap: 0 },
  timelineRow: { flexDirection: 'row', minHeight: 82, gap: 15 },
  rail: { width: 28, alignItems: 'center' },
  node: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.greenSoft, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  nodeDone: { backgroundColor: colors.green, borderColor: colors.green },
  nodeCurrent: { backgroundColor: '#FFFFFF', borderWidth: 6, borderColor: colors.green },
  line: { flex: 1, width: 1, backgroundColor: colors.line },
  lineDone: { backgroundColor: colors.green },
  timelineCopy: { flex: 1, paddingTop: 3, gap: 5 },
  timelineTitle: { color: colors.text, fontFamily: typography.medium, fontSize: 16 },
  futureText: { color: colors.muted },
  timelineStatus: { color: colors.muted, fontFamily: typography.regular, fontSize: 12, lineHeight: 18 },
  milestoneCard: { flexDirection: 'row', gap: 14, alignItems: 'center', backgroundColor: colors.greenSoft },
  milestoneIcon: { width: 43, height: 43, borderRadius: 14, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  milestoneCopy: { flex: 1, gap: 4 },
  milestone: { color: colors.text, fontFamily: typography.medium, fontSize: 16 },
  milestoneMeta: { color: colors.muted, fontFamily: typography.regular, fontSize: 11 },
});
