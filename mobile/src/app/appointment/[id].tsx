import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { BackHeader } from '@/components/back-header';
import { Body, Card, Eyebrow, Heading, PrimaryButton, Screen, TextButton } from '@/components/revolve-ui';
import { colors, typography } from '@/constants/revolve-theme';
import { useDemo } from '@/context/demo-context';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, cancelAppointment } = useDemo();
  const appointment = state.appointments.find((item) => item.id === id);

  if (!appointment) {
    return <Screen><BackHeader title="Appointment" /><Card><Body muted>This appointment could not be found.</Body></Card></Screen>;
  }

  const cancel = () => Alert.alert('Cancel this session?', 'The appointment will remain visible as cancelled in this demo.', [
    { text: 'Keep session', style: 'cancel' },
    { text: 'Cancel session', style: 'destructive', onPress: () => cancelAppointment(appointment.id) },
  ]);

  return (
    <Screen>
      <BackHeader title="Appointment details" />
      <View style={styles.intro}>
        <View style={[styles.status, appointment.status === 'Cancelled' && styles.cancelledStatus]}><View style={[styles.statusDot, appointment.status === 'Cancelled' && styles.cancelledDot]} /><Text style={[styles.statusText, appointment.status === 'Cancelled' && styles.cancelledText]}>{appointment.status}</Text></View>
        <Eyebrow>Upcoming session</Eyebrow>
        <Heading size="medium">{appointment.serviceName}</Heading>
      </View>

      <Card style={styles.details}>
        <Detail icon="calendar-today" label="Date" value={appointment.dateLabel} />
        <Detail icon="schedule" label="Time" value={appointment.time} />
        <Detail icon="person-outline" label="Professional" value={appointment.professional} />
        <Detail icon="location-on" label="Location" value="Revolve Indiranagar · Studio 2" last />
      </Card>

      <Card style={styles.prep}>
        <MaterialIcons name="lightbulb-outline" size={21} color={colors.green} />
        <View style={styles.prepCopy}><Text style={styles.prepTitle}>Before your session</Text><Body muted>Wear comfortable clothing and bring any questions about your current home programme.</Body></View>
      </Card>

      {appointment.status === 'Confirmed' ? (
        <>
          <PrimaryButton label="Reschedule" icon="edit-calendar" onPress={() => router.push({ pathname: '/booking', params: { rescheduleId: appointment.id } })} />
          <TextButton label="Cancel appointment" danger onPress={cancel} />
        </>
      ) : (
        <PrimaryButton label="Book another session" icon="calendar-month" onPress={() => router.push({ pathname: '/booking', params: { serviceId: appointment.serviceId } })} />
      )}
    </Screen>
  );
}

function Detail({ icon, label, value, last = false }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.detailRow, last && styles.lastRow]}>
      <View style={styles.detailIcon}><MaterialIcons name={icon} size={19} color={colors.green} /></View>
      <View style={styles.detailCopy}><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue}>{value}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { gap: 9 },
  status: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 15, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: colors.greenSoft },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.green },
  statusText: { color: colors.greenDark, fontFamily: typography.medium, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
  cancelledStatus: { backgroundColor: colors.dangerSoft },
  cancelledDot: { backgroundColor: colors.danger },
  cancelledText: { color: colors.danger },
  details: { paddingVertical: 4 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.line },
  lastRow: { borderBottomWidth: 0 },
  detailIcon: { width: 37, height: 37, borderRadius: 12, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  detailCopy: { flex: 1, gap: 3 },
  detailLabel: { color: colors.muted, fontFamily: typography.regular, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.7 },
  detailValue: { color: colors.text, fontFamily: typography.medium, fontSize: 14 },
  prep: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: colors.greenSoft },
  prepCopy: { flex: 1, gap: 5 },
  prepTitle: { color: colors.text, fontFamily: typography.medium, fontSize: 14 },
});
