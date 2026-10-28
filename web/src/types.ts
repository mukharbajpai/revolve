export type Role = 'Physiotherapist' | 'Trainer' | 'Admin';
export type Stage = 'Physiotherapy' | 'Rehabilitation' | 'Functional Training' | 'Performance';
export type Page = 'dashboard' | 'clients' | 'appointments' | 'handovers';

export type CareUpdate = { id: string; date: string; author: string; summary: string };

export type Client = {
  id: string;
  name: string;
  initials: string;
  age: number;
  phone: string;
  goal: string;
  history: string;
  assessment: string;
  stage: Stage;
  assignedProfessional: string;
  nextAppointment: string;
  membership: 'Active' | 'Trial' | 'Paused';
  completion: number;
  pain: number;
  mobility: number;
  strength: number;
  physioRecommendation: string;
  trainerRecommendation: string;
  restrictions: string;
  nextMilestone: string;
  updates: CareUpdate[];
};

export type Appointment = {
  id: string;
  clientId: string;
  client: string;
  type: string;
  professional: string;
  date: string;
  day: string;
  time: string;
  duration: number;
  status: 'Confirmed' | 'Checked in' | 'Completed';
};

export type Handover = {
  id: string;
  clientId: string;
  client: string;
  from: string;
  to: string;
  sentAt: string;
  summary: string;
  restrictions: string;
  status: 'Draft' | 'Awaiting acknowledgement' | 'Acknowledged';
  acknowledgedAt?: string;
};

export type WebDemoState = {
  clients: Client[];
  appointments: Appointment[];
  handovers: Handover[];
};
