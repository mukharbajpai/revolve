import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Appointment, DemoState, initialDemoState } from '@/data/demo';

const STORAGE_KEY = '@revolve/mobile-demo/v1';

type BookingInput = Omit<Appointment, 'id' | 'status'>;

type DemoContextValue = {
  state: DemoState;
  isReady: boolean;
  enterDemo: () => void;
  addBooking: (booking: BookingInput) => string;
  rescheduleAppointment: (id: string, date: string, dateLabel: string, time: string) => void;
  cancelAppointment: (id: string) => void;
  toggleActivity: (id: string) => void;
  addCheckIn: (pain: number, mobility: number, strength: number, note: string) => void;
  applyDemoCareUpdate: () => void;
  resetDemo: () => Promise<void>;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<DemoState>(initialDemoState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => value && setState(JSON.parse(value) as DemoState))
      .catch(() => undefined)
      .finally(() => setIsReady(true));
  }, []);

  useEffect(() => {
    if (isReady) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => undefined);
  }, [isReady, state]);

  const enterDemo = useCallback(() => setState((current) => ({ ...current, hasEntered: true })), []);

  const addBooking = useCallback((booking: BookingInput) => {
    const id = `appt-${Date.now()}`;
    setState((current) => ({ ...current, appointments: [{ ...booking, id, status: 'Confirmed' }, ...current.appointments] }));
    return id;
  }, []);

  const rescheduleAppointment = useCallback((id: string, date: string, dateLabel: string, time: string) => {
    setState((current) => ({
      ...current,
      appointments: current.appointments.map((appointment) => appointment.id === id ? { ...appointment, date, dateLabel, time, status: 'Confirmed' } : appointment),
    }));
  }, []);

  const cancelAppointment = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      appointments: current.appointments.map((appointment) => appointment.id === id ? { ...appointment, status: 'Cancelled' } : appointment),
    }));
  }, []);

  const toggleActivity = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      activities: current.activities.map((activity) => activity.id === id ? { ...activity, completed: !activity.completed } : activity),
    }));
  }, []);

  const addCheckIn = useCallback((pain: number, mobility: number, strength: number, note: string) => {
    const now = new Date();
    const date = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    setState((current) => ({
      ...current,
      checkIns: [{ id: `check-${Date.now()}`, date, pain, mobility, strength, note }, ...current.checkIns],
    }));
  }, []);

  const applyDemoCareUpdate = useCallback(() => {
    setState((current) => current.carePlan.demoUpdateApplied ? current : ({
      ...current,
      carePlan: {
        ...current.carePlan,
        physioRecommendation: 'Continue progressive knee loading. Squats are now permitted within a comfortable range.',
        trainerRecommendation: 'Add supported squats and maintain low-impact conditioning. Await professional clearance before running.',
        restrictions: 'Running and jumping remain paused until the next professional review.',
        demoUpdateApplied: true,
        updates: [{
          id: `update-${Date.now()}`, date: 'Demo scenario · 27 Oct 2026', author: 'Care-team update preview', isDemo: true,
          summary: 'Illustrative update applied on this device: squats permitted; running remains paused. This does not represent live synchronisation.',
        }, ...current.carePlan.updates],
      },
    }));
  }, []);

  const resetDemo = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setState(initialDemoState);
  }, []);

  const value = useMemo(() => ({
    state, isReady, enterDemo, addBooking, rescheduleAppointment, cancelAppointment,
    toggleActivity, addCheckIn, applyDemoCareUpdate, resetDemo,
  }), [state, isReady, enterDemo, addBooking, rescheduleAppointment, cancelAppointment, toggleActivity, addCheckIn, applyDemoCareUpdate, resetDemo]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error('useDemo must be used inside DemoProvider');
  return value;
}
