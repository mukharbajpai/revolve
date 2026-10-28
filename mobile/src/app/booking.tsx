import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BackHeader } from '@/components/back-header';
import { Body, Card, Eyebrow, Heading, PrimaryButton, Screen } from '@/components/revolve-ui';
import { colors, typography } from '@/constants/revolve-theme';
import { useDemo } from '@/context/demo-context';
import { services } from '@/data/demo';

const dates = [
  { date: '2026-10-29', label: 'Thu, 29 Oct', day: '29', weekday: 'THU' },
  { date: '2026-10-30', label: 'Fri, 30 Oct', day: '30', weekday: 'FRI' },
  { date: '2026-10-31', label: 'Sat, 31 Oct', day: '31', weekday: 'SAT' },
  { date: '2026-11-02', label: 'Mon, 2 Nov', day: '02', weekday: 'MON' },
];
const times = ['8:30 AM', '10:30 AM', '1:00 PM', '4:30 PM', '6:00 PM'];

export default function BookingScreen() {
  const params = useLocalSearchParams<{ serviceId?: string; rescheduleId?: string }>();
  const { state, addBooking, rescheduleAppointment } = useDemo();
  const existing = state.appointments.find((appointment) => appointment.id === params.rescheduleId);
  const initialService = services.find((service) => service.id === (params.serviceId ?? existing?.serviceId)) ?? services[0];
  const [serviceId, setServiceId] = React.useState(initialService.id);
  const [date, setDate] = React.useState(dates.find((item) => item.date === existing?.date) ?? dates[0]);
  const [time, setTime] = React.useState(existing?.time ?? '10:30 AM');
  const [confirmed, setConfirmed] = React.useState(false);
  const service = services.find((item) => item.id === serviceId) ?? services[0];

  const confirm = () => {
    let appointmentId = existing?.id;
    if (existing) {
      rescheduleAppointment(existing.id, date.date, date.label, time);
    } else {
      appointmentId = addBooking({
        serviceId: service.id, serviceName: service.name, professional: service.professional,
        date: date.date, dateLabel: date.label, time,
      });
    }
    setConfirmed(true);
    setTimeout(() => router.replace(`/appointment/${appointmentId}`), 650);
  };

  if (confirmed) {
    return (
      <Screen scroll={false} contentStyle={styles.successScreen}>
        <View style={styles.successIcon}><MaterialIcons name="check" size={38} color="#FFFFFF" /></View>
        <Heading size="medium">{existing ? 'Session moved' : 'You’re booked'}</Heading>
        <Body muted>{service.name} · {date.label} at {time}</Body>
      </Screen>
    );
  }

  return (
    <Screen>
      <BackHeader title={existing ? 'Reschedule' : 'Book a session'} />
      <View style={styles.intro}><Eyebrow>{existing ? 'Choose a new time' : 'Your next step'}</Eyebrow><Heading size="medium">{existing ? 'Move your session' : 'Make a booking'}</Heading></View>

      {!existing ? (
        <View style={styles.section}>
          <Text style={styles.label}>1 · SERVICE</Text>
          <View style={styles.serviceList}>
            {services.map((item) => (
              <Pressable key={item.id} onPress={() => setServiceId(item.id)} style={[styles.option, item.id === serviceId && styles.optionSelected]}>
                <View style={[styles.radio, item.id === serviceId && styles.radioSelected]} />
                <View style={styles.optionCopy}><Text style={styles.optionTitle}>{item.name}</Text><Text style={styles.optionMeta}>{item.duration} · {item.professional}</Text></View>
              </Pressable>
            ))}
          </View>
        </View>
      ) : <Card><Text style={styles.optionTitle}>{service.name}</Text><Text style={styles.optionMeta}>{service.professional}</Text></Card>}

      <View style={styles.section}>
        <Text style={styles.label}>{existing ? '1' : '2'} · DATE</Text>
        <View style={styles.dateRow}>
          {dates.map((item) => (
            <Pressable key={item.date} onPress={() => setDate(item)} style={[styles.dateOption, item.date === date.date && styles.dateSelected]}>
              <Text style={[styles.weekday, item.date === date.date && styles.selectedText]}>{item.weekday}</Text>
              <Text style={[styles.day, item.date === date.date && styles.selectedText]}>{item.day}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{existing ? '2' : '3'} · TIME</Text>
        <View style={styles.timeGrid}>
          {times.map((item) => (
            <Pressable key={item} onPress={() => setTime(item)} style={[styles.timeOption, item === time && styles.timeSelected]}>
              <Text style={[styles.timeText, item === time && styles.selectedText]}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Card style={styles.summary}>
        <View style={styles.summaryIcon}><MaterialIcons name="event-available" size={23} color={colors.green} /></View>
        <View style={styles.summaryCopy}><Text style={styles.summaryTitle}>{service.name}</Text><Text style={styles.summaryMeta}>{date.label} · {time}</Text><Text style={styles.summaryMeta}>{service.professional}</Text></View>
      </Card>
      <PrimaryButton label={existing ? 'Confirm new time' : 'Confirm booking'} icon="check" onPress={confirm} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  successScreen: { alignItems: 'center', justifyContent: 'center', gap: 15 },
  successIcon: { width: 74, height: 74, borderRadius: 37, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  intro: { gap: 8 },
  section: { gap: 11 },
  label: { color: colors.green, fontFamily: typography.medium, fontSize: 10, letterSpacing: 1.4 },
  serviceList: { gap: 8 },
  option: { minHeight: 62, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 11, backgroundColor: '#FFFFFF', borderRadius: 15, borderWidth: 1, borderColor: colors.line },
  optionSelected: { borderColor: colors.green, backgroundColor: colors.greenSoft },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: colors.sage },
  radioSelected: { borderWidth: 5, borderColor: colors.green, backgroundColor: '#FFFFFF' },
  optionCopy: { flex: 1, gap: 3 },
  optionTitle: { color: colors.text, fontFamily: typography.medium, fontSize: 14 },
  optionMeta: { color: colors.muted, fontFamily: typography.regular, fontSize: 10 },
  dateRow: { flexDirection: 'row', gap: 8 },
  dateOption: { flex: 1, height: 67, borderRadius: 15, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center', gap: 3 },
  dateSelected: { backgroundColor: colors.green, borderColor: colors.green },
  weekday: { color: colors.muted, fontFamily: typography.medium, fontSize: 9, letterSpacing: 0.8 },
  day: { color: colors.text, fontFamily: typography.medium, fontSize: 19 },
  selectedText: { color: '#FFFFFF' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeOption: { width: '31%', paddingVertical: 12, borderRadius: 13, alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.line },
  timeSelected: { backgroundColor: colors.green, borderColor: colors.green },
  timeText: { color: colors.text, fontFamily: typography.medium, fontSize: 11 },
  summary: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  summaryIcon: { width: 45, height: 45, borderRadius: 15, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  summaryCopy: { flex: 1, gap: 3 },
  summaryTitle: { color: colors.text, fontFamily: typography.medium, fontSize: 14 },
  summaryMeta: { color: colors.muted, fontFamily: typography.regular, fontSize: 11 },
});
