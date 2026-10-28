import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/revolve-theme';
import { DemoProvider } from '@/context/demo-context';

export default function RootLayout() {
  return (
    <DemoProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background }, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="booking" />
        <Stack.Screen name="appointment/[id]" />
        <Stack.Screen name="service/[id]" />
        <Stack.Screen name="care-plan" />
        <Stack.Screen name="check-in" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      </Stack>
    </DemoProvider>
  );
}
