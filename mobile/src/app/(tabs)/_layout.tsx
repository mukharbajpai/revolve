import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

import { colors, typography } from '@/constants/revolve-theme';

const iconMap = {
  index: 'home-filled',
  services: 'grid-view',
  journey: 'route',
  progress: 'monitor-heart',
} as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: '#7F8984',
        tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: colors.line, height: 68, paddingTop: 7, paddingBottom: 8 },
        tabBarLabelStyle: { fontFamily: typography.medium, fontSize: 10 },
        tabBarIcon: ({ color, size }) => <MaterialIcons name={iconMap[route.name as keyof typeof iconMap]} color={String(color)} size={size - 1} />,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="services" options={{ title: 'Services' }} />
      <Tabs.Screen name="journey" options={{ title: 'My Journey' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
    </Tabs>
  );
}
