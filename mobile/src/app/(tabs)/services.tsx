import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Body, Card, Eyebrow, Heading, Screen } from '@/components/revolve-ui';
import { colors, typography } from '@/constants/revolve-theme';
import { services } from '@/data/demo';

const icons = ['healing', 'accessibility-new', 'fitness-center', 'sports-gymnastics', 'groups', 'assessment'] as const;

export default function ServicesScreen() {
  return (
    <Screen>
      <View style={styles.intro}>
        <Eyebrow>Recovery to performance</Eyebrow>
        <Heading>Find the right{`\n`}next step.</Heading>
        <Body muted>Every service can connect into one coordinated plan.</Body>
      </View>
      <View style={styles.list}>
        {services.map((service, index) => (
          <Pressable key={service.id} accessibilityRole="button" onPress={() => router.push(`/service/${service.id}`)}>
            {({ pressed }) => (
              <Card style={[styles.card, pressed && styles.pressed]}>
                <View style={styles.icon}><MaterialIcons name={icons[index]} size={22} color={colors.green} /></View>
                <View style={styles.copy}>
                  <Text style={styles.eyebrow}>{service.eyebrow}</Text>
                  <Text style={styles.title}>{service.name}</Text>
                  <Text style={styles.description}>{service.description}</Text>
                  <Text style={styles.meta}>{service.duration}  ·  {service.price}</Text>
                </View>
                <MaterialIcons name="arrow-forward" size={20} color={colors.green} />
              </Card>
            )}
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { gap: 8, marginBottom: 4 },
  list: { gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  icon: { width: 45, height: 45, borderRadius: 15, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, gap: 5 },
  eyebrow: { color: colors.green, fontFamily: typography.medium, fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' },
  title: { color: colors.text, fontFamily: typography.medium, fontSize: 16 },
  description: { color: colors.muted, fontFamily: typography.regular, fontSize: 12, lineHeight: 18 },
  meta: { color: colors.charcoalSoft, fontFamily: typography.medium, fontSize: 11, marginTop: 2 },
  pressed: { opacity: 0.7 },
});
