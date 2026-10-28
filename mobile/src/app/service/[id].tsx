import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { BackHeader } from '@/components/back-header';
import { Body, Card, Eyebrow, Heading, PrimaryButton, Screen, SectionTitle } from '@/components/revolve-ui';
import { colors, typography } from '@/constants/revolve-theme';
import { services } from '@/data/demo';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = services.find((item) => item.id === id) ?? services[0];

  return (
    <Screen>
      <BackHeader title="Service details" />
      <View style={styles.hero}>
        <View style={styles.icon}><MaterialIcons name="moving" size={34} color={colors.green} /></View>
        <Eyebrow>{service.eyebrow}</Eyebrow>
        <Heading>{service.name}</Heading>
        <Body muted>{service.description}</Body>
        <View style={styles.pills}>
          <View style={styles.pill}><MaterialIcons name="schedule" size={15} color={colors.green} /><Text style={styles.pillText}>{service.duration}</Text></View>
          <View style={styles.pill}><MaterialIcons name="payments" size={15} color={colors.green} /><Text style={styles.pillText}>{service.price}</Text></View>
        </View>
      </View>

      <SectionTitle title="What’s included" />
      <Card style={styles.listCard}>
        {service.includes.map((item) => (
          <View key={item} style={styles.listRow}><View style={styles.check}><MaterialIcons name="check" size={14} color="#FFFFFF" /></View><Text style={styles.listText}>{item}</Text></View>
        ))}
      </Card>

      <SectionTitle title="Who it’s for" />
      <Body muted>{service.forWhom}</Body>

      <SectionTitle title="Your professional" />
      <Card style={styles.professional}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{service.professional.split(' ').map((word) => word[0]).slice(0, 2).join('')}</Text></View>
        <View style={styles.professionalCopy}><Text style={styles.professionalName}>{service.professional}</Text><Text style={styles.professionalRole}>{service.professionalRole}</Text></View>
        <MaterialIcons name="verified" size={21} color={colors.green} />
      </Card>

      <PrimaryButton label="Book this service" icon="calendar-month" onPress={() => router.push({ pathname: '/booking', params: { serviceId: service.id } })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'flex-start', gap: 10, paddingVertical: 8 },
  icon: { width: 66, height: 66, borderRadius: 23, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  pills: { flexDirection: 'row', gap: 9, marginTop: 5, flexWrap: 'wrap' },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, backgroundColor: '#FFFFFF' },
  pillText: { color: colors.text, fontFamily: typography.medium, fontSize: 11 },
  listCard: { gap: 15 },
  listRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  check: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  listText: { flex: 1, color: colors.text, fontFamily: typography.regular, fontSize: 14 },
  professional: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.greenDark, fontFamily: typography.medium, fontSize: 13 },
  professionalCopy: { flex: 1, gap: 3 },
  professionalName: { color: colors.text, fontFamily: typography.medium, fontSize: 14 },
  professionalRole: { color: colors.muted, fontFamily: typography.regular, fontSize: 11 },
});
